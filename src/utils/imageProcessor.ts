import { ImageFile } from "../types";

export const loadImage = async (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        id: crypto.randomUUID(),
        file,
        url,
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};

export type ImageFormat = "png" | "jpg" | "webp";

export const generateCollage = async (
  images: ImageFile[],
  targetWidth: number,
  padding: number,
  format: ImageFormat = "png"
): Promise<Blob> => {
  if (images.length === 0) {
    throw new Error("No images to process");
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const scaledImages = await Promise.all(
    images.map(imageFile => {
      return new Promise<{ img: HTMLImageElement; height: number }>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          const scale = targetWidth / img.width;
          const scaledHeight = img.height * scale;
          resolve({ img, height: scaledHeight });
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageFile.url;
      });
    })
  );

  const totalHeight = scaledImages.reduce((sum, { height }) => sum + height, 0) +
    (padding * (images.length - 1));

  canvas.width = targetWidth;
  canvas.height = totalHeight;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let currentY = 0;

  for (const { img, height } of scaledImages) {
    ctx.drawImage(img, 0, currentY, targetWidth, height);
    currentY += height + padding;
  }

  const mimeType = {
    png: "image/png",
    jpg: "image/jpeg",
    webp: "image/webp",
  }[format];

  const quality = format === "jpg" ? 0.95 : 0.9;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to generate image blob"));
        }
      },
      mimeType,
      quality
    );
  });
};

export const getFileExtension = (format: ImageFormat): string => {
  return format;
};

export const downloadImage = (blob: Blob, filename: string = "collage.png") => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const createPreviewUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

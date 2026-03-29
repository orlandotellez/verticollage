'use client';

import { useState } from 'react';
import { Download, ImagePlus, Sparkles } from "lucide-react";
import styles from "./page.module.css"
import { ImageUploader } from "@/src/components/index/ImageUploader";
import { ImagePreview } from "@/src/components/index/ImagePreview";
import { CollageConfig } from "@/src/components/index/CollageConfig";
import { FormatSelector } from "@/src/components/index/FormatSelector";
import { createPreviewUrl, downloadImage, generateCollage, getFileExtension, ImageFormat, loadImage } from '@/src/utils/imageProcessor';
import { ImageFile } from '@/src/types';
import { IconTheme } from '@/src/components/common/IconTheme';
import githubDark from "@/src/assets/githubDark.svg"
import githubLight from "@/src/assets/githubLight.svg"
import { useTheme } from '@/src/context/ThemeContext';

export default function Home() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [collageBlob, setCollageBlob] = useState<Blob | null>(null);
  const [collageUrl, setCollageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [width, setWidth] = useState(1200);
  const [padding, setPadding] = useState(20);
  const [format, setFormat] = useState<ImageFormat>('png');

  const { theme } = useTheme()

  const handleImagesSelected = async (files: File[]) => {
    try {
      const loadedImages = await Promise.all(files.map(loadImage));
      setImages((prev) => [...prev, ...loadedImages]);
    } catch (error) {
      console.error(error);
      alert('Error al cargar imágenes');
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (images.length === 1) setCollageUrl('');
  };

  const handleReorder = (from: number, to: number) => {
    setImages((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const handleGenerate = async () => {
    if (!images.length) return alert('Sube al menos una imagen');

    setIsGenerating(true);
    try {
      const blob = await generateCollage(images, width, padding, format);
      setCollageBlob(blob);
      setCollageUrl(createPreviewUrl(blob));
    } catch (e) {
      console.error(e);
      alert('Error al generar collage');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!collageBlob) return;
    const ext = getFileExtension(format);
    downloadImage(collageBlob, `collage.${ext}`);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <article>
            <div className={styles.titleRow}>
              <ImagePlus className={styles.icon} size={40} />
              <h1>VertiCollage</h1>
            </div>
            <p>Sube imágenes y crea un collage vertical</p>
          </article>
          <nav className={styles.icons}>
            <a href="https://github.com/orlandotellez/verticollage">
              {
                theme == "dark" ? (
                  <img src={githubLight.src} />
                ) : (
                  <img src={githubDark.src} />
                )
              }
            </a>
            <IconTheme />
          </nav>
        </header>

        <div className={styles.grid}>
          <div className={styles.main}>
            <ImageUploader onImagesSelected={handleImagesSelected} />

            {images.length > 0 && (
              <ImagePreview
                images={images}
                onRemove={handleRemoveImage}
                onReorder={handleReorder}
              />
            )}

            {images.length > 0 && (
              <div className={styles.actions}>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={styles.primaryBtn}
                >
                  <Sparkles size={18} />
                  {isGenerating ? 'Generando...' : 'Generar'}
                </button>

                {collageUrl && (
                  <button
                    onClick={handleDownload}
                    className={styles.secondaryBtn}
                  >
                    <Download size={18} />
                    Descargar
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
            <CollageConfig
              width={width}
              padding={padding}
              onWidthChange={setWidth}
              onPaddingChange={setPadding}
            />

            <FormatSelector
              format={format}
              onFormatChange={setFormat}
            />

            {collageUrl && (
              <div className={styles.previewBox}>
                <h3>Vista previa</h3>
                <div className={styles.preview}>
                  <img src={collageUrl} alt="preview" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

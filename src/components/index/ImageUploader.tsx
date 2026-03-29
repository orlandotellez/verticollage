import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
}

export const ImageUploader = ({ onImagesSelected }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      onImagesSelected(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImagesSelected(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className={styles.fileInput}
      />
      <Upload className={styles.icon} size={48} />
      <p className={styles.title}>
        Arrastra imágenes aquí o haz clic para seleccionar
      </p>
      <p className={styles.description}>
        Puedes subir múltiples imágenes a la vez
      </p>
    </div>
  );
};

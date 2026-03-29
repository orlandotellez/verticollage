import { X, GripVertical, MoveUp, MoveDown } from 'lucide-react';
import { ImageFile } from '@/src/types';
import styles from './ImagePreview.module.css';

interface ImagePreviewProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const ImagePreview = ({ images, onRemove, onReorder }: ImagePreviewProps) => {
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      onReorder(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < images.length - 1) {
      onReorder(index, index + 1);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Imágenes cargadas ({images.length})
      </h3>
      <div className={styles.list}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={styles.item}
          >
            <GripVertical className={styles.dragHandle} size={20} />

            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className={styles.thumbnail}
            />

            <div className={styles.info}>
              <p className={styles.fileName}>
                {image.file.name}
              </p>
              <p className={styles.dimensions}>
                {image.width} × {image.height}
              </p>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={styles.actionButton}
                title="Mover arriba"
              >
                <MoveUp size={18} />
              </button>

              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === images.length - 1}
                className={styles.actionButton}
                title="Mover abajo"
              >
                <MoveDown size={18} />
              </button>

              <button
                onClick={() => onRemove(image.id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title="Eliminar"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Settings } from 'lucide-react';
import styles from './CollageConfig.module.css';

interface CollageConfigProps {
  width: number;
  padding: number;
  onWidthChange: (width: number) => void;
  onPaddingChange: (padding: number) => void;
}

export const CollageConfig = ({
  width,
  padding,
  onWidthChange,
  onPaddingChange,
}: CollageConfigProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Settings color="var(--font-color-title)" size={20} />
        <h3 className={styles.title}>Configuración</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>
            Ancho del collage (px)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            min="100"
            max="4000"
            step="50"
            className={styles.input}
          />
          <p className={styles.helperText}>
            Todas las imágenes se escalarán a este ancho
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Espacio entre imágenes (px)
          </label>
          <input
            type="number"
            value={padding}
            onChange={(e) => onPaddingChange(Number(e.target.value))}
            min="0"
            max="200"
            step="5"
            className={styles.input}
          />
          <p className={styles.helperText}>
            Espacio vertical entre cada imagen
          </p>
        </div>
      </div>
    </div>
  );
};

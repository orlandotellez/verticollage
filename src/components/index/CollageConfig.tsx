import { Settings } from 'lucide-react';
import styles from './CollageConfig.module.css';

interface CollageConfigProps {
  width: number;
  padding: number;
  backgroundColor: string;
  transparent: boolean;
  format: "png" | "jpg" | "webp";
  onWidthChange: (width: number) => void;
  onPaddingChange: (padding: number) => void;
  onBackgroundColorChange: (color: string) => void;
  onTransparentChange: (transparent: boolean) => void;
}

export const CollageConfig = ({
  width,
  padding,
  backgroundColor,
  transparent,
  format,
  onWidthChange,
  onPaddingChange,
  onBackgroundColorChange,
  onTransparentChange,
}: CollageConfigProps) => {
  const isJpg = format === "jpg";
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

        <div className={styles.field}>
          <label className={styles.label}>
            Color de fondo
          </label>
          <div className={styles.colorRow}>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              disabled={transparent}
              className={styles.colorInput}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              disabled={transparent}
              className={styles.colorText}
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
          <p className={styles.helperText}>
            {transparent ? 'Se usará transparencia' : 'Color de fondo del collage'}
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={transparent}
              onChange={(e) => onTransparentChange(e.target.checked)}
              disabled={isJpg}
              className={styles.checkbox}
            />
            <span>Fondo transparente</span>
          </label>
          {isJpg && (
            <p className={styles.helperText}>
              JPG no soporta transparencia. Usá PNG o WebP.
            </p>
          )}
          {!isJpg && (
            <p className={styles.helperText}>
              Solo funciona con PNG o WebP
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

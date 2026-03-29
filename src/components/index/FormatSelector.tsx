import { ImageFormat } from '@/src/utils/imageProcessor';
import styles from './FormatSelector.module.css';

interface FormatSelectorProps {
  format: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
}

export const FormatSelector = ({ format, onFormatChange }: FormatSelectorProps) => {
  const formats: { value: ImageFormat; label: string; description: string }[] = [
    { value: 'png', label: 'PNG', description: 'Sin pérdida, mejor calidad' },
    { value: 'jpg', label: 'JPG', description: 'Comprimido, archivo más pequeño' },
    { value: 'webp', label: 'WebP', description: 'Moderno, mejor compresión' },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Formato de Descarga</h3>
      <div className={styles.options}>
        {formats.map((fmt) => (
          <label key={fmt.value} className={styles.option}>
            <input
              type="radio"
              name="format"
              value={fmt.value}
              checked={format === fmt.value}
              onChange={(e) => onFormatChange(e.target.value as ImageFormat)}
              className={styles.radio}
            />
            <div>
              <p className={styles.optionLabel}>{fmt.label}</p>
              <p className={styles.optionDescription}>{fmt.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

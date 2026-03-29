import styles from "./IconTheme.module.css";
import { useTheme } from "@/src/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const IconTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark"

  return (
    <button onClick={toggleTheme} className={styles.buttonTheme}>
      {isDark ? (
        <Sun color="var(--font-color-title)" />
      ) : (
        <Moon color="var(--font-color-title)" />
      )}
    </button>
  );
};

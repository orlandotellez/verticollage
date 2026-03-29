"use client";

import { ThemeProvider } from "@/src/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

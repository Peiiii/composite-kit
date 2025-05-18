export type Theme = 'light' | 'dark' | 'high-contrast';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  warning: string;
  success: string;
  border: string;
  hover: string;
  active: string;
  disabled: string;
}

export interface ThemeConfig {
  name: string;
  type: Theme;
  colors: ThemeColors;
}

export interface ThemeState {
  currentTheme: Theme;
  systemTheme: Theme;
  autoTheme: boolean;
} 
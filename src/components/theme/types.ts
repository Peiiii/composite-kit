export type Theme = 'light' | 'dark' | string

export interface ThemeSwitcherProps {
  className?: string
  themes?: Theme[]
  onThemeChange?: (theme: Theme) => void
} 
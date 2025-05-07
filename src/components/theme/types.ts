export type Theme =
  | "light"
  | "dark"
  | "material"
  | "nord"
  | "dracula"
  | "one-dark"
  | "tokyo-night"
  | "catppuccin"
  | "wechat"
  | "telegram"
  | "github"
  | "twitter"
  | "discord"
  | "notion"
  | "monokai-pro"
  | "gruvbox"
  | "solarized"
  | "aurora"
  | "forest"
  | "ocean"
  | "starlight"
  | "desert"
  | "neon"
  | "ink-wash"
  | "sakura"
  | "moonlight"
  | "bamboo"
  | "landscape"
  | "autumn"
  | string;

export interface ThemeSwitcherProps {
  className?: string;
  themes?: Theme[];
  onThemeChange?: (theme: Theme) => void;
}

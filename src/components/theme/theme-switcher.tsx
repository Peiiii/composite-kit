import { useTheme } from './theme-provider'
import type { ThemeSwitcherProps } from './types'

export function ThemeSwitcher({ 
  className,
  themes = ['light', 'dark'],
  onThemeChange
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => handleThemeChange(t)}
            className={`px-4 py-2 rounded transition-colors ${
              theme === t
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
} 
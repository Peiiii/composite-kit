import React from 'react'
import type { Theme } from './types'
import { initializeTheme, applyTheme } from './theme-initializer'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  onThemeChange?: (theme: Theme) => void
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
  onThemeChange,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => 
    initializeTheme(defaultTheme, storageKey)
  )

  React.useEffect(() => {
    applyTheme(theme, storageKey)
    onThemeChange?.(theme)
  }, [theme, storageKey, onThemeChange])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 
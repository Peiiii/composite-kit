import type { Theme } from './types'

export function initializeTheme(defaultTheme: Theme = 'light', storageKey: string = 'theme'): Theme {
  // 在 DOM 加载之前就执行主题初始化
  const theme = (() => {
    if (typeof window === 'undefined') return defaultTheme
    try {
      return localStorage.getItem(storageKey) || defaultTheme
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error)
      return defaultTheme
    }
  })()

  // 立即应用主题
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.classList.add(`theme-${theme}`)
  }

  return theme
}

export function applyTheme(theme: Theme, storageKey: string = 'theme'): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  
  // 移除所有 theme- 开头的类名
  const classList = Array.from(root.classList)
  classList.forEach(className => {
    if (className.startsWith('theme-')) {
      root.classList.remove(className)
    }
  })
  
  // 添加新的主题
  root.setAttribute('data-theme', theme)
  root.classList.add(`theme-${theme}`)
  
  try {
    localStorage.setItem(storageKey, theme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
} 
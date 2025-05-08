import { useTheme } from './theme-provider'
import type { Theme, ThemeSwitcherProps } from './types'
import { useCallback, useState, useMemo, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

// 定义主题分组类型
type ThemeGroupKey = 'system' | 'popular' | 'social' | 'nature' | 'creative' | 'professional'

type ThemeGroup = {
  [K in ThemeGroupKey]: readonly Theme[]
}

// 主题分组
const themeGroups: ThemeGroup = {
  system: ['light', 'dark'] as const,
  popular: ['material', 'nord', 'dracula', 'one-dark', 'tokyo-night', 'catppuccin'] as const,
  social: ['wechat', 'telegram', 'github', 'twitter', 'discord', 'notion'] as const,
  nature: ['aurora', 'forest', 'ocean', 'starlight', 'desert', 'bamboo', 'landscape', 'autumn'] as const,
  creative: ['neon', 'ink-wash', 'sakura', 'moonlight'] as const,
  professional: ['monokai-pro', 'gruvbox', 'solarized'] as const,
}

// 主题图标映射
const themeIcons: Record<Theme, string> = {
  light: '☀️',
  dark: '🌙',
  material: '🎨',
  nord: '❄️',
  dracula: '🧛',
  'one-dark': '🌑',
  'tokyo-night': '🌃',
  catppuccin: '🐱',
  wechat: '💬',
  telegram: '📱',
  github: '🐙',
  twitter: '🐦',
  discord: '🎮',
  notion: '📝',
  'monokai-pro': '🎯',
  gruvbox: '🎨',
  solarized: '☀️',
  aurora: '🌅',
  forest: '🌲',
  ocean: '🌊',
  starlight: '✨',
  desert: '🏜️',
  neon: '💡',
  'ink-wash': '🎨',
  sakura: '🌸',
  moonlight: '🌙',
  bamboo: '🎋',
  landscape: '🏞️',
  autumn: '🍂',
}

// 主题名称本地化
const themeNames: Record<Theme, string> = {
  light: '浅色',
  dark: '深色',
  material: 'Material',
  nord: 'Nord',
  dracula: 'Dracula',
  'one-dark': 'One Dark',
  'tokyo-night': 'Tokyo Night',
  catppuccin: 'Catppuccin',
  wechat: '微信',
  telegram: 'Telegram',
  github: 'GitHub',
  twitter: 'Twitter',
  discord: 'Discord',
  notion: 'Notion',
  'monokai-pro': 'Monokai Pro',
  gruvbox: 'Gruvbox',
  solarized: 'Solarized',
  aurora: '极光',
  forest: '森林',
  ocean: '海洋',
  starlight: '星光',
  desert: '沙漠',
  neon: '霓虹',
  'ink-wash': '水墨',
  sakura: '樱花',
  moonlight: '月光',
  bamboo: '竹林',
  landscape: '山水',
  autumn: '秋色',
}

// 分组名称本地化
const groupNames: Record<ThemeGroupKey, string> = {
  system: '系统',
  popular: '热门',
  social: '社交',
  nature: '自然',
  creative: '创意',
  professional: '专业',
}

// 创建上下文
interface ThemeSwitcherContextValue {
  theme: Theme
  themes: Theme[]
  onThemeChange: (theme: Theme) => void
  recentThemes: Theme[]
}

const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue | null>(null)

// 主题按钮组件
function ThemeButton({ 
  theme: themeValue, 
  className 
}: { 
  theme: Theme
  className?: string 
}) {
  const { theme, onThemeChange } = useContext(ThemeSwitcherContext)!
  
  return (
    <button
      onClick={() => onThemeChange(themeValue)}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded transition-colors",
        theme === themeValue
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80",
        className
      )}
    >
      <span className="text-lg" aria-hidden="true">
        {themeIcons[themeValue] || '🎨'}
      </span>
      <span className="truncate">{themeNames[themeValue] || themeValue}</span>
    </button>
  )
}

// 下拉菜单组件
function Dropdown({ className }: { className?: string }) {
  const { theme, themes, onThemeChange } = useContext(ThemeSwitcherContext)!
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recentThemes, setRecentThemes] = useState<Theme[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recent-themes') || '[]')
    } catch {
      return []
    }
  })

  const handleThemeChange = useCallback((newTheme: Theme) => {
    onThemeChange(newTheme)
    setIsOpen(false)
    
    setRecentThemes(prev => {
      const updated = [newTheme, ...prev.filter(t => t !== newTheme)].slice(0, 5)
      localStorage.setItem('recent-themes', JSON.stringify(updated))
      return updated
    })
  }, [onThemeChange])

  const filteredThemes = useMemo(() => {
    if (!searchQuery) return themes
    
    return themes.filter(t => 
      themeNames[t].toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [themes, searchQuery])

  const groupedThemes = useMemo(() => {
    const groups: Partial<Record<ThemeGroupKey, Theme[]>> = {}
    
    filteredThemes.forEach(t => {
      for (const [group, groupThemes] of Object.entries(themeGroups)) {
        if (groupThemes.includes(t)) {
          if (!groups[group as ThemeGroupKey]) {
            groups[group as ThemeGroupKey] = []
          }
          groups[group as ThemeGroupKey]?.push(t)
          break
        }
      }
    })
    
    return groups
  }, [filteredThemes])

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg" aria-hidden="true">
          {themeIcons[theme] || '🎨'}
        </span>
        <span>{themeNames[theme] || theme}</span>
        <span className="ml-2" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-lg border bg-background shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索主题..."
              className="w-full px-3 py-2 rounded border bg-background"
            />
          </div>

          {recentThemes.length > 0 && (
            <div className="p-2 border-b">
              <div className="text-sm text-muted-foreground mb-2">最近使用</div>
              <div className="flex flex-wrap gap-2">
                {recentThemes.map(t => (
                  <ThemeButton key={t} theme={t} className="text-sm" />
                ))}
              </div>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto">
            {Object.entries(groupedThemes).map(([group, groupThemes]) => (
              groupThemes?.length > 0 && (
                <div key={group} className="p-2 border-b last:border-b-0">
                  <div className="text-sm text-muted-foreground mb-2">
                    {groupNames[group as ThemeGroupKey]}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {groupThemes.map(t => (
                      <ThemeButton key={t} theme={t} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 网格布局组件
function Grid({ className }: { className?: string }) {
  const { themes } = useContext(ThemeSwitcherContext)!
  
  const groupedThemes = useMemo(() => {
    const groups: Partial<Record<ThemeGroupKey, Theme[]>> = {}
    
    themes.forEach(t => {
      for (const [group, groupThemes] of Object.entries(themeGroups)) {
        if (groupThemes.includes(t)) {
          if (!groups[group as ThemeGroupKey]) {
            groups[group as ThemeGroupKey] = []
          }
          groups[group as ThemeGroupKey]?.push(t)
          break
        }
      }
    })
    
    return groups
  }, [themes])

  return (
    <div className={cn('space-y-4', className)}>
      {Object.entries(groupedThemes).map(([group, groupThemes]) => (
        groupThemes?.length > 0 && (
          <div key={group}>
            <div className="text-sm text-muted-foreground mb-2">
              {groupNames[group as ThemeGroupKey]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {groupThemes.map(t => (
                <ThemeButton key={t} theme={t} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  )
}

// 主组件
export function ThemeSwitcher({ 
  className,
  themes = ['light', 'dark'],
  onThemeChange,
  children
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [recentThemes, setRecentThemes] = useState<Theme[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recent-themes') || '[]')
    } catch {
      return []
    }
  })

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    onThemeChange?.(newTheme)
    
    setRecentThemes(prev => {
      const updated = [newTheme, ...prev.filter(t => t !== newTheme)].slice(0, 5)
      localStorage.setItem('recent-themes', JSON.stringify(updated))
      return updated
    })
  }, [setTheme, onThemeChange])

  const contextValue = useMemo(() => ({
    theme,
    themes,
    onThemeChange: handleThemeChange,
    recentThemes
  }), [theme, themes, handleThemeChange, recentThemes])

  return (
    <ThemeSwitcherContext.Provider value={contextValue}>
      <div className={className}>
        {children}
      </div>
    </ThemeSwitcherContext.Provider>
  )
}

// 导出子组件
ThemeSwitcher.Dropdown = Dropdown
ThemeSwitcher.Grid = Grid 
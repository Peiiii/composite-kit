import { useState } from 'react'
import { ConfigurableActivityBar } from '@/components/activity-bar/configurable-activity-bar'
import { ThemeProvider } from '@/components/theme'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import { cn } from '@/lib/utils'

// 配置对象
const config = {
  header: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: '主题切换器',
    showSearch: true,
  },
  groups: [
    {
      title: '主题设置',
      items: [
        {
          id: 'theme-settings',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
          label: '主题设置',
        },
      ],
    },
  ],
  theme: {
    defaultTheme: 'light',
  },
}

// 所有可用主题
const allThemes = [
  "material",
  "light",
  "dark",
  "nord",
  "dracula",
  "one-dark",
  "tokyo-night",
  "catppuccin",
  "wechat",
  "telegram",
  "github",
  "twitter",
  "discord",
  "notion",
  "monokai-pro",
  "gruvbox",
  "solarized",
  "aurora",
  "forest",
  "ocean",
  "starlight",
  "desert",
  "neon",
  "ink-wash",
  "sakura",
  "moonlight",
  "bamboo",
  "landscape",
  "autumn"
];

// 示例组件
function ExampleComponent() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          主要按钮
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
          次要按钮
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded">
          中性按钮
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-background border rounded">
          <h3 className="text-lg font-medium">卡片标题</h3>
          <p className="text-muted-foreground">卡片内容描述</p>
        </div>
        <div className="p-4 bg-background border rounded">
          <h3 className="text-lg font-medium">卡片标题</h3>
          <p className="text-muted-foreground">卡片内容描述</p>
        </div>
        <div className="p-4 bg-background border rounded">
          <h3 className="text-lg font-medium">卡片标题</h3>
          <p className="text-muted-foreground">卡片内容描述</p>
        </div>
      </div>
    </div>
  )
}

export default function ThemeSwitcherDemo() {
  const [displayMode, setDisplayMode] = useState<'dropdown' | 'grid'>('grid')

  return (
    <ThemeProvider defaultTheme={config.theme.defaultTheme}>
      <div className="min-h-screen bg-background text-foreground">
        <ConfigurableActivityBar
          config={config}
          className="border-b"
        />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-8">
            {/* 主题切换器 */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">主题切换</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDisplayMode('dropdown')}
                    className={cn(
                      "px-3 py-1 rounded",
                      displayMode === 'dropdown'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    下拉菜单
                  </button>
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={cn(
                      "px-3 py-1 rounded",
                      displayMode === 'grid'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    网格布局
                  </button>
                </div>
              </div>
              
              <ThemeSwitcher themes={allThemes}>
                {displayMode === 'dropdown' ? (
                  <ThemeSwitcher.Dropdown />
                ) : (
                  <ThemeSwitcher.Grid />
                )}
              </ThemeSwitcher>
            </section>

            {/* 主题预览 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">主题预览</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-primary text-primary-foreground rounded">
                  主色调
                </div>
                <div className="p-4 bg-secondary text-secondary-foreground rounded">
                  次要色调
                </div>
                <div className="p-4 bg-muted text-muted-foreground rounded">
                  中性色调
                </div>
                <div className="p-4 bg-accent text-accent-foreground rounded">
                  强调色调
                </div>
              </div>
            </section>

            {/* 组件示例 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">组件示例</h2>
              <ExampleComponent />
            </section>

            {/* 使用说明 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">使用说明</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">基本用法</h3>
                  <pre className="p-4 bg-muted rounded">
                    {`<ThemeSwitcher themes={['light', 'dark']}>
  <ThemeSwitcher.Dropdown />
</ThemeSwitcher>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">网格布局</h3>
                  <pre className="p-4 bg-muted rounded">
                    {`<ThemeSwitcher themes={['light', 'dark']}>
  <ThemeSwitcher.Grid />
</ThemeSwitcher>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">自定义主题</h3>
                  <pre className="p-4 bg-muted rounded">
                    {`<ThemeSwitcher
  themes={['light', 'dark', 'custom-theme']}
  onThemeChange={(theme) => console.log('Theme changed:', theme)}
>
  <ThemeSwitcher.Dropdown />
</ThemeSwitcher>`}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

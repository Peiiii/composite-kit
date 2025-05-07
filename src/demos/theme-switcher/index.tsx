import { ConfigurableActivityBar } from "@/components/activity-bar/configurable-activity-bar"
import { ThemeProvider, ThemeSwitcher } from "@/components/theme"

// 示例配置
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
    title: "主题切换器演示",
    showSearch: true,
  },
  groups: [
    {
      title: "主题设置",
      items: [
        {
          id: "theme-settings",
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
          label: "主题设置",
        },
      ],
    },
  ],
}

export default function ThemeSwitcherDemo() {
  return (
    <ThemeProvider defaultTheme="material">
      <div className="flex min-h-0 w-full h-full">
        <ConfigurableActivityBar
          config={config}
          className="h-full"
        />
        <div className="flex-1 overflow-auto h-full">
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">主题切换器演示</h1>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">主题切换</h2>
                  <ThemeSwitcher 
                    className="w-64" 
                    themes={['material', 'light', 'dark', 'nord', 'dracula']} 
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">主题预览</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary text-primary-foreground">
                      主色调
                    </div>
                    <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
                      次要色调
                    </div>
                    <div className="p-4 rounded-lg bg-accent text-accent-foreground">
                      强调色
                    </div>
                    <div className="p-4 rounded-lg bg-muted text-muted-foreground">
                      中性色
                    </div>
                    <div className="p-4 rounded-lg bg-success text-success-foreground">
                      成功色
                    </div>
                    <div className="p-4 rounded-lg bg-warning text-warning-foreground">
                      警告色
                    </div>
                    <div className="p-4 rounded-lg bg-error text-error-foreground">
                      错误色
                    </div>
                    <div className="p-4 rounded-lg bg-background text-foreground border">
                      背景色
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
} 
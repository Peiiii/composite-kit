import * as React from 'react'
import { ConfigurableActivityBar, ThemeProvider, ThemeSwitcher } from 'composite-kit'
import { Home, Settings, User, FileText, HelpCircle } from 'lucide-react'
import type { Theme } from "composite-kit"

// Tailwind CSS 示例组件
const TailwindExamples = () => (
  <div className="space-y-4">
    {/* 按钮示例 */}
    <div className="space-x-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        主要按钮
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
        次要按钮
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
        危险按钮
      </button>
    </div>

    {/* 卡片示例 */}
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">卡片标题</h3>
      <p className="text-gray-600">这是一个使用 Tailwind CSS 样式的卡片示例。</p>
    </div>

    {/* 警告提示示例 */}
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            这是一个警告提示信息，用于测试 Tailwind CSS 是否正确加载。
          </p>
        </div>
      </div>
    </div>

    {/* 表单控件示例 */}
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          用户名
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入用户名"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          选择选项
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>选项一</option>
          <option>选项二</option>
          <option>选项三</option>
        </select>
      </div>
    </div>
  </div>
)

const themes: Theme[] = [
  "light",
  "dark",
  "material",
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
]

function App() {
  const config = {
    header: {
      icon: <Home />,
      title: "主页",
      showSearch: true
    },
    groups: [
      {
        title: "导航",
        items: [
          {
            id: "home",
            icon: <Home />,
            label: "首页",
            badge: 3
          },
          {
            id: "docs",
            icon: <FileText />,
            label: "文档"
          }
        ]
      },
      {
        title: "用户",
        items: [
          {
            id: "profile",
            icon: <User />,
            label: "个人信息"
          },
          {
            id: "settings",
            icon: <Settings />,
            label: "设置"
          }
        ]
      }
    ],
    footer: {
      items: [
        {
          id: "help",
          icon: <HelpCircle />,
          label: "帮助"
        }
      ]
    }
  }

  return (
    <ThemeProvider defaultTheme="material">
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">主题切换器演示</h1>
            <ThemeSwitcher themes={themes} />
          </div>

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
            <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">
              错误色
            </div>
            <div className="p-4 rounded-lg bg-background text-foreground border">
              背景色
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">文本示例</h2>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">标题 1</h1>
              <h2 className="text-3xl font-semibold">标题 2</h2>
              <h3 className="text-2xl font-medium">标题 3</h3>
              <p className="text-base">正文文本</p>
              <p className="text-sm text-muted-foreground">次要文本</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">按钮示例</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded bg-primary text-primary-foreground">
                主要按钮
              </button>
              <button className="px-4 py-2 rounded bg-secondary text-secondary-foreground">
                次要按钮
              </button>
              <button className="px-4 py-2 rounded bg-accent text-accent-foreground">
                强调按钮
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">卡片示例</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-card text-card-foreground shadow">
                <h3 className="text-xl font-semibold mb-2">卡片标题</h3>
                <p className="text-muted-foreground">
                  这是一个卡片示例，展示了主题中的卡片样式。
                </p>
              </div>
              <div className="p-6 rounded-lg bg-popover text-popover-foreground shadow">
                <h3 className="text-xl font-semibold mb-2">弹出框标题</h3>
                <p className="text-muted-foreground">
                  这是一个弹出框示例，展示了主题中的弹出框样式。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App 
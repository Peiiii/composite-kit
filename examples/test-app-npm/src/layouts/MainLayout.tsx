import * as React from 'react'
import { ConfigurableActivityBar } from 'composite-kit'
import { Home, Settings, User, FileText, HelpCircle, GitBranch, Search, Terminal } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const config = {
    header: {
      icon: <Home />,
      title: "开发工具",
      showSearch: true
    },
    groups: [
      {
        title: "导航",
        items: [
          {
            id: "explorer",
            icon: <FileText />,
            label: "文件浏览器",
            badge: 3
          },
          {
            id: "search",
            icon: <Search />,
            label: "搜索"
          },
          {
            id: "source-control",
            icon: <GitBranch />,
            label: "源代码管理"
          }
        ]
      },
      {
        title: "工具",
        items: [
          {
            id: "terminal",
            icon: <Terminal />,
            label: "终端"
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
    <div className="flex h-screen bg-gray-50">
      <ConfigurableActivityBar 
        config={config}
        defaultExpanded={true}
        onActiveChange={(id) => console.log('Active item:', id)}
      />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <footer className="h-8 bg-gray-100 border-t border-gray-200 flex items-center px-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>主分支</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>UTF-8</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>•</span>
            <span>Spaces: 2</span>
          </div>
        </footer>
      </div>
    </div>
  )
} 
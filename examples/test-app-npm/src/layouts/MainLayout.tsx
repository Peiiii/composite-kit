import * as React from 'react'
import { VSCodeLayout } from 'composite-kit'
import { Home, Settings, FileText, HelpCircle, GitBranch, Search, Terminal } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
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
    <VSCodeLayout
      activityBar={<div className="h-full bg-gray-800 text-white p-4">活动栏</div>}
      sideBar={<div className="h-full bg-gray-100 p-4">侧边栏</div>}
      editor={<div className="h-full bg-white p-4">{children}</div>}
      secondarySideBar={<div className="h-full bg-gray-100 p-4">次要侧边栏</div>}
    />
  )
} 
"use client"

import * as React from "react"
import {
  Home,
  Settings,
  Users,
  Mail,
  Calendar,
  LayoutDashboard,
  HelpCircle,
  Code,
  Database,
  Cloud,
  Server,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfigurableActivityBar, type ActivityBarConfig } from "@/components/activity-bar/configurable-activity-bar"

// 定义完整配置
const activityBarConfig: ActivityBarConfig = {
  header: {
    icon: <LayoutDashboard />,
    title: "工作空间",
    showSearch: true,
  },
  groups: [
    {
      title: "导航",
      items: [
        { id: "home", icon: <Home />, label: "首页" },
        { id: "users", icon: <Users />, label: "用户" },
        { id: "messages", icon: <Mail />, label: "消息", badge: 3 },
        { id: "calendar", icon: <Calendar />, label: "日历" },
      ],
    },
    {
      title: "开发",
      items: [
        { id: "code", icon: <Code />, label: "代码" },
        { id: "database", icon: <Database />, label: "数据库" },
        { id: "cloud", icon: <Cloud />, label: "云服务" },
        { id: "server", icon: <Server />, label: "服务器", disabled: true },
      ],
    },
  ],
  footer: {
    items: [
      { id: "settings", icon: <Settings />, label: "设置" },
      { id: "security", icon: <Shield />, label: "安全" },
      { id: "help", icon: <HelpCircle />, label: "帮助" },
    ],
  },
}

export default function ActivityBarConfigurable() {
  const [expanded, setExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState("home")

  const handleExpandedChange = React.useCallback((newExpanded: boolean) => {
    setExpanded(newExpanded)
  }, [])

  const handleActiveChange = React.useCallback((activeId: string) => {
    setActiveSection(activeId)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ConfigurableActivityBar
        config={activityBarConfig}
        expanded={expanded}
        defaultActiveId={activeSection}
        onExpandedChange={handleExpandedChange}
        onActiveChange={handleActiveChange}
        className="flex-shrink-0"
      />

      <div className="flex-1 overflow-auto border-l p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <Button onClick={() => setExpanded(!expanded)}>{expanded ? "折叠侧边栏" : "展开侧边栏"}</Button>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">完全配置化组件</h2>
          <p>这个示例展示了如何使用完全配置化的 ActivityBar 组件，只需提供一个配置对象即可创建完整的活动栏。</p>
          <p className="mt-4">配置对象包含：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>头部配置（图标、标题、是否显示搜索框）</li>
            <li>分组配置（标题、项目列表）</li>
            <li>底部配置（通常用于设置、帮助等）</li>
            <li>每个项目的配置（ID、图标、标签、徽章、禁用状态等）</li>
          </ul>
          <p className="mt-4">优点：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>简化使用方式，只需提供配置对象</li>
            <li>统一处理徽章、分隔符等元素</li>
            <li>支持禁用状态和其他高级功能</li>
            <li>更容易从 API 或配置文件生成菜单</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

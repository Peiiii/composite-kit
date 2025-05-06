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

export default function ActivityBarConfigurable() {
  const [expanded, setExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState("home")

  const handleExpandedChange = React.useCallback((newExpanded: boolean) => {
    setExpanded(newExpanded)
  }, [])

  const handleActiveChange = React.useCallback((activeId: string) => {
    setActiveSection(activeId)
  }, [])

  const config: ActivityBarConfig = {
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

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <ConfigurableActivityBar
        config={config}
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
          <h2 className="text-xl font-semibold mb-4">配置式组件模式</h2>
          <p>这个示例展示了如何使用配置式组件模式构建 ActivityBar，提供了更简洁和声明式的 API。</p>
          <p className="mt-4">主要特点：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>通过配置对象定义整个 ActivityBar 的结构</li>
            <li>支持动态配置和运行时更新</li>
            <li>更容易进行数据驱动的渲染</li>
            <li>更好的状态管理和控制</li>
          </ul>
          <p className="mt-4">适用场景：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>需要动态生成 ActivityBar 结构</li>
            <li>需要从后端获取配置数据</li>
            <li>需要频繁更新 ActivityBar 内容</li>
            <li>需要更细粒度的状态控制</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

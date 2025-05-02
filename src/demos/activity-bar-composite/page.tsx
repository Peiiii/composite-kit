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
import {
  ActivityBarRoot,
  ActivityBarHeader,
  ActivityBarGroup,
  ActivityBarItem,
  ActivityBarSeparator,
} from "@/components/activity-bar"

export default function ActivityBarComposite() {
  const [expanded, setExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState("home")

  const handleExpandedChange = React.useCallback((newExpanded: boolean) => {
    setExpanded(newExpanded)
  }, [])

  const handleActiveChange = React.useCallback((activeId: string) => {
    setActiveSection(activeId)
  }, [])

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <ActivityBarRoot
        expanded={expanded}
        defaultActiveId={activeSection}
        onExpandedChange={handleExpandedChange}
        onActiveChange={handleActiveChange}
        className="flex-shrink-0"
      >
        <ActivityBarHeader
          icon={<LayoutDashboard />}
          title="工作空间"
          showSearch={true}
        />

        <ActivityBarGroup title="导航">
          <ActivityBarItem id="home" icon={<Home />} label="首页" />
          <ActivityBarItem id="users" icon={<Users />} label="用户" />
          <ActivityBarItem id="messages" icon={<Mail />} label="消息" badge={3} />
          <ActivityBarItem id="calendar" icon={<Calendar />} label="日历" />
        </ActivityBarGroup>

        <ActivityBarSeparator />

        <ActivityBarGroup title="开发">
          <ActivityBarItem id="code" icon={<Code />} label="代码" />
          <ActivityBarItem id="database" icon={<Database />} label="数据库" />
          <ActivityBarItem id="cloud" icon={<Cloud />} label="云服务" />
          <ActivityBarItem id="server" icon={<Server />} label="服务器" disabled />
        </ActivityBarGroup>

        <div className="mt-auto">
          <ActivityBarSeparator />
          <ActivityBarGroup>
            <ActivityBarItem id="settings" icon={<Settings />} label="设置" />
            <ActivityBarItem id="security" icon={<Shield />} label="安全" />
            <ActivityBarItem id="help" icon={<HelpCircle />} label="帮助" />
          </ActivityBarGroup>
        </div>
      </ActivityBarRoot>

      <div className="flex-1 overflow-auto border-l p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <Button onClick={() => setExpanded(!expanded)}>{expanded ? "折叠侧边栏" : "展开侧边栏"}</Button>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">复合组件模式</h2>
          <p>这个示例展示了如何使用复合组件模式构建 ActivityBar，提供了更灵活和直观的 API。</p>
          <p className="mt-4">主要组件：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>ActivityBarRoot - 根容器</li>
            <li>ActivityBarHeader - 头部区域</li>
            <li>ActivityBarGroup - 分组容器</li>
            <li>ActivityBarItem - 活动项</li>
            <li>ActivityBarSeparator - 分隔线</li>
          </ul>
          <p className="mt-4">优点：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>更直观的 JSX 结构</li>
            <li>更好的类型提示和自动完成</li>
            <li>更灵活的样式定制</li>
            <li>更容易进行条件渲染</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
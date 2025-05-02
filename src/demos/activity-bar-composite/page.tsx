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
import { ActivityBar } from "@/components/activity-bar"

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
      <ActivityBar.Root
        expanded={expanded}
        defaultActiveId={activeSection}
        onExpandedChange={handleExpandedChange}
        onActiveChange={handleActiveChange}
        className="flex-shrink-0"
      >
        <ActivityBar.Header
          icon={<LayoutDashboard />}
          title="工作空间"
          showSearch={true}
        />

        <ActivityBar.Group title="导航">
          <ActivityBar.Item id="home" icon={<Home />} label="首页" />
          <ActivityBar.Item id="users" icon={<Users />} label="用户" />
          <ActivityBar.Item id="messages" icon={<Mail />} label="消息" badge={3} />
          <ActivityBar.Item id="calendar" icon={<Calendar />} label="日历" />
        </ActivityBar.Group>

        <ActivityBar.Separator />

        <ActivityBar.Group title="开发">
          <ActivityBar.Item id="code" icon={<Code />} label="代码" />
          <ActivityBar.Item id="database" icon={<Database />} label="数据库" />
          <ActivityBar.Item id="cloud" icon={<Cloud />} label="云服务" />
          <ActivityBar.Item id="server" icon={<Server />} label="服务器" disabled />
        </ActivityBar.Group>

        <div className="mt-auto">
          <ActivityBar.Separator />
          <ActivityBar.Group>
            <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
            <ActivityBar.Item id="security" icon={<Shield />} label="安全" />
            <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
          </ActivityBar.Group>
        </div>
      </ActivityBar.Root>

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
            <li>ActivityBar.Root - 根容器</li>
            <li>ActivityBar.Header - 头部区域</li>
            <li>ActivityBar.Group - 分组容器</li>
            <li>ActivityBar.Item - 活动项</li>
            <li>ActivityBar.Separator - 分隔线</li>
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
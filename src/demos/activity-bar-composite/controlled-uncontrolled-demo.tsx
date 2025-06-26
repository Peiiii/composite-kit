"use client"

import * as React from "react"
import { ActivityBar } from "@/components/activity-bar"
import { Button } from "@/components/ui/button"
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

export default function ControlledUncontrolledDemo() {
  // 受控模式状态
  const [controlledExpanded, setControlledExpanded] = React.useState(false)
  const [controlledActiveId, setControlledActiveId] = React.useState("home")

  // 不受控模式状态（用于显示）
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(false)
  const [uncontrolledActiveId, setUncontrolledActiveId] = React.useState("home")

  return (
    <div className="flex h-screen">
      {/* 受控模式演示 */}
      <div className="flex flex-col w-1/2 border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">受控模式 (Controlled)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            状态完全由父组件控制，通过 props 传递状态和回调函数
          </p>
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControlledExpanded(!controlledExpanded)}
            >
              {controlledExpanded ? "折叠" : "展开"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControlledActiveId("home")}
            >
              激活首页
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControlledActiveId("settings")}
            >
              激活设置
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>当前状态: 展开={controlledExpanded.toString()}, 激活项={controlledActiveId}</p>
          </div>
        </div>

        <ActivityBar.Root
          expanded={controlledExpanded}
          activeId={controlledActiveId}
          onExpandedChange={setControlledExpanded}
          onActiveChange={setControlledActiveId}
        >
          <ActivityBar.Header
            icon={<LayoutDashboard className="h-6 w-6" />}
            title="受控模式"
            showSearch={true}
          />

          <ActivityBar.GroupList>
            <ActivityBar.Group title="导航">
              <ActivityBar.Item id="home" icon={<Home />} label="首页" />
              <ActivityBar.Item id="users" icon={<Users />} label="用户" />
              <ActivityBar.Item id="messages" icon={<Mail />} label="消息" badge={3} />
              <ActivityBar.Item id="calendar" icon={<Calendar />} label="日历" />
            </ActivityBar.Group>
            <ActivityBar.Group title="开发">
              <ActivityBar.Item id="code" icon={<Code />} label="代码" />
              <ActivityBar.Item id="database" icon={<Database />} label="数据库" />
              <ActivityBar.Item id="cloud" icon={<Cloud />} label="云服务" />
              <ActivityBar.Item id="server" icon={<Server />} label="服务器" disabled />
            </ActivityBar.Group>
          </ActivityBar.GroupList>

          <ActivityBar.Footer>
            <ActivityBar.Separator />
            <ActivityBar.Group>
              <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
              <ActivityBar.Item id="security" icon={<Shield />} label="安全" />
              <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
            </ActivityBar.Group>
          </ActivityBar.Footer>
        </ActivityBar.Root>
      </div>

      {/* 不受控模式演示 */}
      <div className="flex flex-col w-1/2">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">不受控模式 (Uncontrolled)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            状态由组件内部管理，通过回调函数获取状态变化
          </p>
          <div className="text-xs text-muted-foreground">
            <p>当前状态: 展开={uncontrolledExpanded.toString()}, 激活项={uncontrolledActiveId}</p>
          </div>
        </div>

        <ActivityBar.Root
          defaultExpanded={false}
          defaultActiveId="home"
          onExpandedChange={setUncontrolledExpanded}
          onActiveChange={setUncontrolledActiveId}
        >
          <ActivityBar.Header
            icon={<LayoutDashboard className="h-6 w-6" />}
            title="不受控模式"
            showSearch={true}
          />

          <ActivityBar.GroupList>
            <ActivityBar.Group title="导航">
              <ActivityBar.Item id="home" icon={<Home />} label="首页" />
              <ActivityBar.Item id="users" icon={<Users />} label="用户" />
              <ActivityBar.Item id="messages" icon={<Mail />} label="消息" badge={3} />
              <ActivityBar.Item id="calendar" icon={<Calendar />} label="日历" />
            </ActivityBar.Group>
            <ActivityBar.Group title="开发">
              <ActivityBar.Item id="code" icon={<Code />} label="代码" />
              <ActivityBar.Item id="database" icon={<Database />} label="数据库" />
              <ActivityBar.Item id="cloud" icon={<Cloud />} label="云服务" />
              <ActivityBar.Item id="server" icon={<Server />} label="服务器" disabled />
            </ActivityBar.Group>
          </ActivityBar.GroupList>

          <ActivityBar.Footer>
            <ActivityBar.Separator />
            <ActivityBar.Group>
              <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
              <ActivityBar.Item id="security" icon={<Shield />} label="安全" />
              <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
            </ActivityBar.Group>
          </ActivityBar.Footer>
        </ActivityBar.Root>
      </div>
    </div>
  )
} 
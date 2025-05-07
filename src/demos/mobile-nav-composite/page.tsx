"use client"

import {
    Calendar,
    Home,
    Mail,
    RotateCcw,
    Settings,
    Users
} from "lucide-react"
import * as React from "react"

import { MobileDeviceContainer } from "@/components/mobile-device-container"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function MobileNavComposite() {
  const [expanded, setExpanded] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [device, setDevice] = React.useState<"iphone14" | "iphone14Pro" | "iphoneSE" | "pixel7" | "samsungS22">("iphone14")
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait")

  const handleExpandedChange = React.useCallback((newExpanded: boolean) => {
    setExpanded(newExpanded)
  }, [])

  const handleActiveChange = React.useCallback((activeId: string) => {
    setActiveSection(activeId)
  }, [])

  const toggleOrientation = React.useCallback(() => {
    setOrientation(prev => prev === "portrait" ? "landscape" : "portrait")
  }, [])

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          <div className="flex items-center gap-4">
            <Select value={device} onValueChange={(value: any) => setDevice(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择设备" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iphone14">iPhone 14</SelectItem>
                <SelectItem value="iphone14Pro">iPhone 14 Pro</SelectItem>
                <SelectItem value="iphoneSE">iPhone SE</SelectItem>
                <SelectItem value="pixel7">Pixel 7</SelectItem>
                <SelectItem value="samsungS22">Samsung S22</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={toggleOrientation}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? "折叠导航" : "展开导航"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">移动端导航</h2>
          <p>这个示例展示了如何使用复合组件模式构建移动端导航。</p>
          <p className="mt-4">主要组件：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>MobileNav.Root - 根容器</li>
            <li>MobileNav.Item - 导航项</li>
          </ul>
          <p className="mt-4">特点：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>支持底部和顶部导航</li>
            <li>支持展开/折叠</li>
            <li>支持徽章显示</li>
            <li>响应式设计</li>
          </ul>
        </div>
      </div>

      <div className="w-[500px] border-l bg-muted/50">
        <MobileDeviceContainer
          device={device}
          orientation={orientation}
          className="mx-auto"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div className="rounded-lg bg-card p-4">
                  <h3 className="font-medium">内容区域</h3>
                  <p className="text-sm text-muted-foreground">
                    这里可以放置页面主要内容
                  </p>
                </div>
                <div className="rounded-lg bg-card p-4">
                  <h3 className="font-medium">示例内容</h3>
                  <p className="text-sm text-muted-foreground">
                    可以添加更多的内容卡片
                  </p>
                </div>
              </div>
            </div>

            <MobileNav.Root
              expanded={expanded}
              defaultActiveId={activeSection}
              onExpandedChange={handleExpandedChange}
              onActiveChange={handleActiveChange}
              className="flex-shrink-0"
            >
              <div className="flex h-16 items-center justify-around border-t bg-background">
                <MobileNav.Item id="home" icon={<Home className="h-5 w-5" />} label="首页" />
                <MobileNav.Item id="users" icon={<Users className="h-5 w-5" />} label="用户" />
                <MobileNav.Item id="messages" icon={<Mail className="h-5 w-5" />} label="消息" badge={3} />
                <MobileNav.Item id="calendar" icon={<Calendar className="h-5 w-5" />} label="日历" />
                <MobileNav.Item id="settings" icon={<Settings className="h-5 w-5" />} label="设置" />
              </div>
            </MobileNav.Root>
          </div>
        </MobileDeviceContainer>
      </div>
    </div>
  )
} 
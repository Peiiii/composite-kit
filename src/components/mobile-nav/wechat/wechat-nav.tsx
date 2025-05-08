"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { WeChatNavItem } from "./wechat-nav-item"
import { MessageSquare, Users, Compass, User } from "lucide-react"

export interface WeChatNavItemConfig {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
  badge?: number
}

export interface WeChatNavConfig {
  items: WeChatNavItemConfig[]
  activeId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

export interface WeChatNavProps extends React.HTMLAttributes<HTMLDivElement> {
  config: WeChatNavConfig
}

export function WeChatNav({
  config,
  ...props
}: WeChatNavProps) {
  const {
    items,
    activeId,
    onActiveChange,
    className
  } = config

  const [active, setActive] = React.useState(activeId || "chat")

  const handleActiveChange = React.useCallback(
    (id: string) => {
      setActive(id)
      onActiveChange?.(id)
    },
    [onActiveChange]
  )

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t",
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => (
          <WeChatNavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            active={active === item.id}
            onClick={() => {
              handleActiveChange(item.id)
              item.onClick?.()
            }}
            className={item.className}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  )
}

// 默认配置
export const defaultWeChatNavConfig: WeChatNavConfig = {
  items: [
    {
      id: "chat",
      icon: <MessageSquare />,
      label: "微信"
    },
    {
      id: "contacts",
      icon: <Users />,
      label: "通讯录"
    },
    {
      id: "discover",
      icon: <Compass />,
      label: "发现"
    },
    {
      id: "me",
      icon: <User />,
      label: "我"
    }
  ]
}
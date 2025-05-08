"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TwitterNavItem } from "./twitter-nav-item"
import { Home, Search, Bell, Mail, User } from "lucide-react"

export interface TwitterNavItemConfig {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export interface TwitterNavConfig {
  items: TwitterNavItemConfig[]
  activeId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

export interface TwitterNavProps extends React.HTMLAttributes<HTMLDivElement> {
  config: TwitterNavConfig
}

export function TwitterNav({
  config,
  ...props
}: TwitterNavProps) {
  const {
    items,
    activeId,
    onActiveChange,
    className
  } = config

  const [active, setActive] = React.useState(activeId || "home")

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
        "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t",
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => (
          <TwitterNavItem
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
          />
        ))}
      </div>
    </div>
  )
}

// 默认配置
export const defaultTwitterNavConfig: TwitterNavConfig = {
  items: [
    {
      id: "home",
      icon: <Home />,
      label: "首页"
    },
    {
      id: "search",
      icon: <Search />,
      label: "探索"
    },
    {
      id: "notifications",
      icon: <Bell />,
      label: "通知"
    },
    {
      id: "messages",
      icon: <Mail />,
      label: "消息"
    }
  ]
} 
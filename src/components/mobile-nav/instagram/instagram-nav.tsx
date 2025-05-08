"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { InstagramNavItem } from "./instagram-nav-item"
import { Home, Search, Plus, Heart, User } from "lucide-react"

export interface InstagramNavItemConfig {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export interface InstagramNavConfig {
  items: InstagramNavItemConfig[]
  activeId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

export interface InstagramNavProps extends React.HTMLAttributes<HTMLDivElement> {
  config: InstagramNavConfig
}

export function InstagramNav({
  config,
  ...props
}: InstagramNavProps) {
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
        "fixed bottom-0 left-0 right-0 bg-background border-t",
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => (
          <InstagramNavItem
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
export const defaultInstagramNavConfig: InstagramNavConfig = {
  items: [
    {
      id: "home",
      icon: <Home />,
      label: "首页"
    },
    {
      id: "search",
      icon: <Search />,
      label: "搜索"
    },
    {
      id: "create",
      icon: <Plus />,
      label: "创建",
      className: "scale-110"
    },
    {
      id: "activity",
      icon: <Heart />,
      label: "活动"
    },
    {
      id: "profile",
      icon: <User />,
      label: "我的"
    }
  ]
} 
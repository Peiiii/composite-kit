"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { TikTokNavItem } from "./tiktok-nav-item"

export interface TikTokNavItemConfig {
  id: string
  icon: React.ReactNode
  label: string
  badge?: number
  className?: string
}

export interface TikTokNavConfig {
  items: TikTokNavItemConfig[]
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

export interface TikTokNavProps extends React.HTMLAttributes<HTMLDivElement> {
  config: TikTokNavConfig
}

export function TikTokNav({
  config,
  ...props
}: TikTokNavProps) {
  const {
    items,
    defaultActiveId = "home",
    onActiveChange,
    className,
  } = config

  const [active, setActive] = React.useState(defaultActiveId)

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
        "fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-t border-white/10",
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => (
          <TikTokNavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={active === item.id}
            className={item.className}
            onClick={() => handleActiveChange(item.id)}
          />
        ))}
      </div>
    </div>
  )
} 
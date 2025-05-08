"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { InstagramNavItem } from "./instagram-nav-item"

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
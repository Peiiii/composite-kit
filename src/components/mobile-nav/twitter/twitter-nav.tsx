"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TwitterNavItem } from "./twitter-nav-item"
import { Home, Search, Bell, Mail, User } from "lucide-react"

export interface TwitterNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeId?: string
  onActiveChange?: (id: string) => void
}

export function TwitterNav({
  className,
  activeId,
  onActiveChange,
  ...props
}: TwitterNavProps) {
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
        <TwitterNavItem
          id="home"
          icon={<Home />}
          label="首页"
          active={active === "home"}
          onClick={() => handleActiveChange("home")}
        />
        <TwitterNavItem
          id="search"
          icon={<Search />}
          label="探索"
          active={active === "search"}
          onClick={() => handleActiveChange("search")}
        />
        <TwitterNavItem
          id="notifications"
          icon={<Bell />}
          label="通知"
          active={active === "notifications"}
          onClick={() => handleActiveChange("notifications")}
        />
        <TwitterNavItem
          id="messages"
          icon={<Mail />}
          label="消息"
          active={active === "messages"}
          onClick={() => handleActiveChange("messages")}
        />
      </div>
    </div>
  )
} 
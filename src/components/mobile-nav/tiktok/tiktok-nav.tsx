"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TikTokNavItem } from "./tiktok-nav-item"
import { Home, Search, Plus, MessageSquare, User } from "lucide-react"

export interface TikTokNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeId?: string
  onActiveChange?: (id: string) => void
}

export function TikTokNav({
  className,
  activeId,
  onActiveChange,
  ...props
}: TikTokNavProps) {
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
        "fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-t border-white/10",
        className
      )}
      {...props}
    >
      <div className="flex justify-around items-center h-16 px-2">
        <TikTokNavItem
          id="home"
          icon={<Home />}
          label="首页"
          active={active === "home"}
          onClick={() => handleActiveChange("home")}
        />
        <TikTokNavItem
          id="discover"
          icon={<Search />}
          label="发现"
          active={active === "discover"}
          onClick={() => handleActiveChange("discover")}
        />
        <TikTokNavItem
          id="create"
          icon={<Plus />}
          label="创建"
          active={active === "create"}
          onClick={() => handleActiveChange("create")}
          className="scale-125"
        />
        <TikTokNavItem
          id="inbox"
          icon={<MessageSquare />}
          label="收件箱"
          active={active === "inbox"}
          onClick={() => handleActiveChange("inbox")}
        />
        <TikTokNavItem
          id="profile"
          icon={<User />}
          label="我的"
          active={active === "profile"}
          onClick={() => handleActiveChange("profile")}
        />
      </div>
    </div>
  )
} 
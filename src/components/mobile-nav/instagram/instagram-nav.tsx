"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { InstagramNavItem } from "./instagram-nav-item"
import { Home, Search, Plus, Heart, User } from "lucide-react"

export interface InstagramNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeId?: string
  onActiveChange?: (id: string) => void
}

export function InstagramNav({
  className,
  activeId,
  onActiveChange,
  ...props
}: InstagramNavProps) {
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
        <InstagramNavItem
          id="home"
          icon={<Home />}
          label="首页"
          active={active === "home"}
          onClick={() => handleActiveChange("home")}
        />
        <InstagramNavItem
          id="search"
          icon={<Search />}
          label="搜索"
          active={active === "search"}
          onClick={() => handleActiveChange("search")}
        />
        <InstagramNavItem
          id="create"
          icon={<Plus />}
          label="创建"
          active={active === "create"}
          onClick={() => handleActiveChange("create")}
          className="scale-110"
        />
        <InstagramNavItem
          id="activity"
          icon={<Heart />}
          label="活动"
          active={active === "activity"}
          onClick={() => handleActiveChange("activity")}
        />
        <InstagramNavItem
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
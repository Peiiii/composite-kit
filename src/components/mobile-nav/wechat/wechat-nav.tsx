"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { WeChatNavItem } from "./wechat-nav-item"
import { MessageSquare, Users, Compass, User } from "lucide-react"

export interface WeChatNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeId?: string
  onActiveChange?: (id: string) => void
}

export function WeChatNav({
  className,
  activeId,
  onActiveChange,
  ...props
}: WeChatNavProps) {
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
        <WeChatNavItem
          id="chat"
          icon={<MessageSquare />}
          label="微信"
          active={active === "chat"}
          onClick={() => handleActiveChange("chat")}
        />
        <WeChatNavItem
          id="contacts"
          icon={<Users />}
          label="通讯录"
          active={active === "contacts"}
          onClick={() => handleActiveChange("contacts")}
        />
        <WeChatNavItem
          id="discover"
          icon={<Compass />}
          label="发现"
          active={active === "discover"}
          onClick={() => handleActiveChange("discover")}
        />
        <WeChatNavItem
          id="me"
          icon={<User />}
          label="我"
          active={active === "me"}
          onClick={() => handleActiveChange("me")}
        />
      </div>
    </div>
  )
}
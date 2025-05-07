"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MobileNavContext } from "./mobile-nav-context"

export interface MobileNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string
  icon: React.ReactNode
  label: string
  badge?: number
  disabled?: boolean
}

export function MobileNavItem({
  id,
  icon,
  label,
  badge,
  disabled = false,
  className,
  ...props
}: MobileNavItemProps) {
  const { activeId, setActiveId } = React.useContext(MobileNavContext)
  const isActive = activeId === id

  return (
    <button
      type="button"
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "text-primary",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={() => !disabled && setActiveId(id)}
      disabled={disabled}
      {...props}
    >
      <div className="relative">
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  )
} 
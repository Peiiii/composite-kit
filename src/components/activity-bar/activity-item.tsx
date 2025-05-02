"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useActivityBar } from "./activity-bar-context"

const activityItemVariants = cva(
  "flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 ease-in-out cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
)

export interface ActivityItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityItemVariants> {
  id: string
  icon: React.ReactNode
  label: string
  badge?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export function ActivityItem({ className, id, icon, label, badge, active, disabled = false, onClick, ...props }: ActivityItemProps) {
  const { activeId, setActiveId, expanded } = useActivityBar()
  const isActive = active !== undefined ? active : activeId === id

  const handleClick = React.useCallback(() => {
    setActiveId(id)
    onClick?.()
  }, [id, onClick, setActiveId])

  return (
    <div
      className={cn(
        activityItemVariants({ active: isActive }),
        expanded ? "px-3 py-2 mx-2" : "p-2 mx-3",
        "group",
        className,
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-selected={isActive ? true : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      {...props}
    >
      <div className={cn("flex-shrink-0 transition-all duration-200 ease-in-out", expanded ? "" : "mx-auto")}>
        {React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
          className: cn(
            "h-5 w-5 transition-colors duration-150",
            isActive ? "text-current" : "text-muted-foreground group-hover:text-foreground",
          ),
        })}
      </div>
      <div
        className={cn(
          "flex flex-1 items-center justify-between min-w-0 transition-all duration-200 ease-in-out ml-3",
          expanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden ml-0",
        )}
      >
        <span className="text-sm font-medium truncate min-w-0">{label}</span>
        {badge && <div className="ml-auto pl-2 flex-shrink-0">{badge}</div>}
      </div>
    </div>
  )
}

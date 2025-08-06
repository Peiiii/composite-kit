"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
  collapsedLabel?: string // 新增：收起时显示的标签文本
}

export function ActivityItem({ className, id, icon, label, badge, active, disabled = false, onClick, collapsedLabel, ...props }: ActivityItemProps) {
  const { activeId, setActiveId, expanded } = useActivityBar()
  const isActive = active !== undefined ? active : activeId === id

  const handleClick = React.useCallback(() => {
    if (disabled) return
    setActiveId(id)
    onClick?.()
  }, [id, onClick, setActiveId, disabled])

  const renderBadge = React.useCallback(() => {
    if (!badge) return null
    if (React.isValidElement(badge)) {
      const element = badge as React.ReactElement<{ className?: string }>
      return React.cloneElement(element, {
        className: cn(defaultBadgeClassName, element.props.className),
      })
    }
    return <Badge className={defaultBadgeClassName}>{badge}</Badge>
  }, [badge])

  // 收起时是否显示标签
  const shouldShowCollapsedLabel = !expanded && collapsedLabel

  return (
    <div
      data-component="activity-item"
      className={cn(
        activityItemVariants({ active: isActive }),
        expanded ? "px-3 py-2 mx-2" : "p-2 mx-3",
        "group",
        disabled && "opacity-50 pointer-events-none",
        shouldShowCollapsedLabel && "flex-col",
        className,
      )}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-selected={isActive ? true : undefined}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      {...props}
    >
      {/* 图标容器 */}
      <div className={cn(
        "flex-shrink-0 transition-all duration-200 ease-in-out",
        expanded ? "" : "mx-auto",
        shouldShowCollapsedLabel ? "mb-1" : ""
      )}>
        {React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
          className: cn(
            "h-5 w-5 transition-colors duration-150",
            isActive ? "text-current" : "text-muted-foreground group-hover:text-foreground",
            (icon as React.ReactElement<React.SVGProps<SVGSVGElement>>).props.className,
          ),
        })}
      </div>

      {/* 收起时的标签 */}
      {shouldShowCollapsedLabel && (
        <div className="flex-shrink-0 w-full text-center">
          <span className="text-xs font-medium leading-tight truncate block text-muted-foreground group-hover:text-foreground transition-colors duration-150">
            {collapsedLabel}
          </span>
        </div>
      )}

      {/* 展开时的内容 */}
      <div
        className={cn(
          "flex flex-1 items-center justify-between min-w-0 transition-all duration-200 ease-in-out",
          expanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 overflow-hidden ml-0",
        )}
      >
        <span className="text-sm font-medium truncate min-w-0">{label}</span>
        {badge && <div className="ml-auto pl-2 flex-shrink-0">{renderBadge()}</div>}
      </div>
    </div>
  )
}

export interface ActivityBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  badge?: string | number
  active?: boolean
  disabled?: boolean
  collapsedLabel?: string
}

export const defaultBadgeClassName = "h-5 px-1.5 text-xs font-medium"


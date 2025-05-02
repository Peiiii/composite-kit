"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ActivityBarContext } from "./activity-bar-context"
import { ActivityHeaderOptimized } from "./activity-header-optimized"
import { ActivityGroup } from "./activity-group"
import { ActivityItem } from "./activity-item"

const activityBarVariants = cva("flex h-full bg-background border-r shadow-sm will-change-transform", {
  variants: {
    position: {
      left: "left-0 border-r",
      right: "right-0 border-l",
    },
    expanded: {
      true: "w-[240px]",
      false: "w-16", // 保持一致的宽度
    },
  },
  defaultVariants: {
    position: "left",
    expanded: false,
  },
})

export interface ActivityBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityBarVariants> {
  defaultExpanded?: boolean
  defaultActiveId?: string
  toggleable?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onActiveChange?: (activeId: string) => void
}

export function ActivityBar({
  className,
  position = "left",
  expanded: controlledExpanded,
  defaultExpanded = false,
  defaultActiveId,
  toggleable = true,
  onExpandedChange,
  onActiveChange,
  children,
  ...props
}: ActivityBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  const [activeId, setActiveId] = React.useState<string | undefined>(defaultActiveId)

  // Allow controlled expansion state
  const expanded = controlledExpanded !== undefined ? controlledExpanded : isExpanded

  const toggleExpanded = React.useCallback(() => {
    const newExpanded = !expanded
    setIsExpanded(newExpanded)
    onExpandedChange?.(newExpanded)
  }, [expanded, onExpandedChange])

  const contextValue = React.useMemo(
    () => ({
      expanded: expanded ?? false,
      activeId,
      setActiveId,
    }),
    [expanded, activeId],
  )

  return (
    <ActivityBarContext.Provider value={contextValue}>
      <div
        className={cn(
          activityBarVariants({ position, expanded }),
          "relative flex-col transition-all duration-200 ease-in-out",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">{React.Children.toArray(children)[0]}</div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide min-w-0">
            <div className="w-full">{React.Children.toArray(children).slice(1, -1)}</div>
          </div>
          <div className="flex-shrink-0">{React.Children.toArray(children).at(-1)}</div>
        </div>
        {toggleable && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-4 h-6 w-6",
              position === "left" ? "right-[-12px]" : "left-[-12px]",
              "rounded-full border bg-background shadow-sm z-10 hover:bg-accent hover:text-accent-foreground transition-all duration-200",
            )}
            onClick={toggleExpanded}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {position === "left" ? (
              expanded ? (
                <ChevronLeft className="h-3 w-3 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-3 w-3 transition-transform duration-200" />
              )
            ) : expanded ? (
              <ChevronRight className="h-3 w-3 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="h-3 w-3 transition-transform duration-200" />
            )}
          </Button>
        )}
      </div>
    </ActivityBarContext.Provider>
  )
}

// 复合组件模式
export const ActivityBarRoot = ActivityBar
export const ActivityBarHeader = ActivityHeaderOptimized
export const ActivityBarGroup = ActivityGroup
export const ActivityBarItem = ActivityItem
export const ActivityBarSeparator = ({ className }: { className?: string }) => (
  <div className="w-full px-2">
    <Separator className={cn("my-1", className)} />
  </div>
)

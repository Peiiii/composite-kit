"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { MobileNavContext } from "./mobile-nav-context"

// 样式定义
export const mobileNavVariants = cva(
  "fixed bottom-0 left-0 right-0 bg-background border-t transition-all duration-200 ease-in-out",
  {
    variants: {
      position: {
        bottom: "bottom-0",
        top: "top-0",
      },
      expanded: {
        true: "h-[calc(100vh-4rem)]",
        false: "h-16",
      },
    },
    defaultVariants: {
      position: "bottom",
      expanded: false,
    },
  },
)

// 类型定义
export interface MobileNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileNavVariants> {
  defaultExpanded?: boolean
  defaultActiveId?: string
  toggleable?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onActiveChange?: (activeId: string) => void
}

export interface MobileNavComponentProps extends MobileNavProps {}

export function MobileNavComponent({
  className,
  position = "bottom",
  expanded: controlledExpanded,
  defaultExpanded = false,
  defaultActiveId,
  toggleable = true,
  onExpandedChange,
  onActiveChange,
  children,
  ...props
}: MobileNavComponentProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  const [activeId, setActiveId] = React.useState<string | undefined>(defaultActiveId)

  // Allow controlled expansion state
  const expanded = controlledExpanded ?? isExpanded

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
    <MobileNavContext.Provider value={contextValue}>
      <div
        className={cn(
          mobileNavVariants({ position, expanded }),
          "relative flex-col transition-all duration-200 ease-in-out",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col h-full">
          {position === "top" && <div className="flex-shrink-0">{React.Children.toArray(children)[0]}</div>}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide min-w-0">
            <div className="w-full">{React.Children.toArray(children).slice(1, -1)}</div>
          </div>
          {position === "bottom" && <div className="flex-shrink-0">{React.Children.toArray(children).at(-1)}</div>}
        </div>
      </div>
    </MobileNavContext.Provider>
  )
} 
"use client"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

import { ActivityBarComponent } from "./activity-bar-component"
import { ActivityGroup } from "./activity-group"
import { ActivityHeaderOptimized } from "./activity-header-optimized"
import { ActivityItem } from "./activity-item"

// 样式定义
export const activityBarVariants = cva(
  "flex flex-col h-full bg-background border-r transition-[width] duration-200 ease-in-out",
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l",
      },
      expanded: {
        true: "w-[240px]",
        false: "w-16",
      },
    },
    defaultVariants: {
      position: "left",
      expanded: false,
    },
  },
)

// 类型定义
export interface ActivityBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityBarVariants> {
  defaultExpanded?: boolean
  defaultActiveId?: string
  toggleable?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onActiveChange?: (activeId: string) => void
}

// 复合组件命名空间
export const ActivityBar = {
  Root: ActivityBarComponent,
  Header: ActivityHeaderOptimized,
  Group: ActivityGroup,
  Item: ActivityItem,
  Separator: ({ className }: { className?: string }) => (
    <div className="w-full px-2">
      <Separator className={cn("my-1", className)} />
    </div>
  ),
}

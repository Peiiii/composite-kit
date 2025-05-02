"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { ActivityBarComponent } from "./activity-bar-component"
import { ActivityHeaderOptimized } from "./activity-header-optimized"
import { ActivityGroup } from "./activity-group"
import { ActivityItem } from "./activity-item"

// 样式定义
export const activityBarVariants = cva("flex h-full bg-background border-r shadow-sm will-change-transform", {
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

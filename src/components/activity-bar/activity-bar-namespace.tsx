"use client"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ActivityBarComponent } from "./activity-bar-component"
import { ActivityGroup } from "./activity-group"
import { ActivityHeaderOptimized } from "./activity-header-optimized"
import { ActivityItem } from "./activity-item"

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
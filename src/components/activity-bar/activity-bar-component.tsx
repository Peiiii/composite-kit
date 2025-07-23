"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { ActivityBarContext } from "./activity-bar-context"
import { ActivityBarToggleButton } from "./activity-bar-toggle-button"

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
  expanded?: boolean // 受控的展开状态
  activeId?: string // 受控的激活项状态
  toggleable?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onActiveChange?: (activeId: string) => void
  expandedWidth?: number | string // 新增，展开宽度
  collapsedWidth?: number | string // 新增，收起宽度
}

export type ActivityBarComponentProps = ActivityBarProps

export function ActivityBarComponent({
  className,
  position = "left",
  expanded: controlledExpanded,
  activeId: controlledActiveId,
  defaultExpanded = false,
  defaultActiveId,
  toggleable = true,
  onExpandedChange,
  onActiveChange,
  expandedWidth = 240, // 默认展开宽度
  collapsedWidth = 64, // 默认收起宽度
  children,
  ...props
}: ActivityBarComponentProps) {
  // 内部状态管理
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const [internalActiveId, setInternalActiveId] = React.useState<string | undefined>(defaultActiveId)

  // 判断是否为受控模式
  const isExpandedControlled = controlledExpanded !== undefined
  const isActiveIdControlled = controlledActiveId !== undefined

  // 确定当前状态值
  const expanded = isExpandedControlled ? controlledExpanded : internalExpanded
  const activeId = isActiveIdControlled ? controlledActiveId : internalActiveId

  // 展开状态切换处理
  const toggleExpanded = React.useCallback(() => {
    const newExpanded = !expanded
    
    // 如果是受控模式，只调用回调函数
    if (isExpandedControlled) {
      onExpandedChange?.(newExpanded)
    } else {
      // 非受控模式，更新内部状态并调用回调
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)
    }
  }, [expanded, isExpandedControlled, onExpandedChange])

  // 激活项设置处理
  const handleSetActiveId = React.useCallback((id: string) => {
    // 如果是受控模式，只调用回调函数
    if (isActiveIdControlled) {
      onActiveChange?.(id)
    } else {
      // 非受控模式，更新内部状态并调用回调
      setInternalActiveId(id)
      onActiveChange?.(id)
    }
  }, [isActiveIdControlled, onActiveChange])

  // 同步受控状态到内部状态（用于初始化）
  React.useEffect(() => {
    if (isExpandedControlled && controlledExpanded !== internalExpanded) {
      setInternalExpanded(controlledExpanded)
    }
  }, [isExpandedControlled, controlledExpanded, internalExpanded])

  React.useEffect(() => {
    if (isActiveIdControlled && controlledActiveId !== internalActiveId) {
      setInternalActiveId(controlledActiveId)
    }
  }, [isActiveIdControlled, controlledActiveId, internalActiveId])

  const contextValue = React.useMemo(
    () => ({
      expanded: expanded ?? false,
      activeId,
      setActiveId: handleSetActiveId,
    }),
    [expanded, activeId, handleSetActiveId],
  )

  // 计算宽度
  const width = expanded ? expandedWidth : collapsedWidth
  const widthStyle = typeof width === "number" ? `${width}px` : width

  return (
    <ActivityBarContext.Provider value={contextValue}>
      <div
        className={cn(
          activityBarVariants({ position, expanded }),
          "relative flex-col transition-all duration-200 ease-in-out",
          className,
        )}
        style={{ width: widthStyle, ...props.style }} // 新增，动态宽度
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
          <ActivityBarToggleButton
            position={position as "left" | "right"}
            expanded={expanded ?? false}
            onClick={toggleExpanded}
          />
        )}
      </div>
    </ActivityBarContext.Provider>
  )
}
 
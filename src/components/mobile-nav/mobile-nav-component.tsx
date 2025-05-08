"use client"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { MobileNavContext } from "./mobile-nav-context"

// 样式定义
export const mobileNavVariants = cva(
  "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t transition-all duration-300 ease-in-out",
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
      variant: {
        default: "",
        minimal: "h-14",
        floating: "mx-4 mb-4 rounded-2xl shadow-lg",
        glass: "bg-background/40 backdrop-blur-xl border-none",
        gradient: "bg-gradient-to-b from-background to-background/80 border-none",
        bordered: "border-2 border-primary/20",
      },
      animation: {
        default: "",
        slide: "",
        fade: "",
        scale: "",
        none: "",
      },
    },
    defaultVariants: {
      position: "bottom",
      expanded: false,
      variant: "default",
      animation: "default",
    },
  },
)

// 动画变体定义
const animationVariants = {
  slide: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2 },
  },
}

// 导航项配置接口
export interface MobileNavItemConfig {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

// 导航配置接口
export interface MobileNavConfig {
  items: MobileNavItemConfig[]
  position?: "bottom" | "top"
  variant?: "default" | "minimal" | "floating" | "glass" | "gradient" | "bordered"
  animation?: "default" | "slide" | "fade" | "scale" | "none"
  defaultExpanded?: boolean
  defaultActiveId?: string
  toggleable?: boolean
  dragToExpand?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onActiveChange?: (activeId: string) => void
  className?: string
}

export interface MobileNavComponentProps extends Omit<HTMLMotionProps<"div">, "onDragEnd"> {
  config: MobileNavConfig
}

export function MobileNavComponent({
  config,
  ...props
}: MobileNavComponentProps) {
  const {
    items,
    position = "bottom",
    variant = "default",
    animation = "default",
    defaultExpanded = false,
    defaultActiveId,
    toggleable = true,
    dragToExpand = true,
    onExpandedChange,
    onActiveChange,
    className,
  } = config

  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  const [activeId, setActiveId] = React.useState<string | undefined>(defaultActiveId)
  const [dragY, setDragY] = React.useState(0)

  const expanded = isExpanded

  const toggleExpanded = React.useCallback(() => {
    if (!toggleable) return
    const newExpanded = !expanded
    setIsExpanded(newExpanded)
    onExpandedChange?.(newExpanded)
  }, [expanded, onExpandedChange, toggleable])

  const handleDragEnd = React.useCallback(
    (_: any, info: { offset: { y: number } }) => {
      if (!dragToExpand) return
      const threshold = 50
      const shouldExpand = position === "bottom" 
        ? info.offset.y < -threshold 
        : info.offset.y > threshold

      if (shouldExpand !== expanded) {
        toggleExpanded()
      }
      setDragY(0)
    },
    [expanded, position, toggleExpanded, dragToExpand]
  )

  const handleDrag = React.useCallback(
    (_: any, info: { offset: { y: number } }) => {
      if (!dragToExpand) return
      setDragY(info.offset.y)
    },
    [dragToExpand]
  )

  const contextValue = React.useMemo(
    () => ({
      activeId: activeId ?? "",
      setActiveId: (id: string) => {
        setActiveId(id)
        onActiveChange?.(id)
      },
      isExpanded: expanded,
      setIsExpanded: toggleExpanded,
      expandOnHover: false,
    }),
    [expanded, activeId, onActiveChange, toggleExpanded],
  )

  const getAnimationProps = () => {
    if (animation === "none" || animation === "default") return {}
    return animationVariants[animation as keyof typeof animationVariants] || {}
  }

  return (
    <MobileNavContext.Provider value={contextValue}>
      <motion.div
        layout
        drag={dragToExpand ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ y: dragY }}
        className={cn(
          mobileNavVariants({ position, expanded, variant, animation }),
          "relative flex-col transition-all duration-300 ease-in-out",
          className,
        )}
        {...getAnimationProps()}
        {...props}
      >
        <div className="flex flex-col h-full">
          {position === "top" && (
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-between p-4">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveId(item.id)
                          onActiveChange?.(item.id)
                          item.onClick?.()
                        }}
                        disabled={item.disabled}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors",
                          activeId === item.id
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.icon}
                        <span className="text-xs">{item.label}</span>
                        {item.badge}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide min-w-0"
              >
                <div className="w-full">
                  {items.map((item) => (
                    <div key={item.id} className="p-4">
                      {item.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {position === "bottom" && (
            <motion.div
              layout
              className="flex-shrink-0"
            >
              <div className="flex items-center justify-between p-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveId(item.id)
                      onActiveChange?.(item.id)
                      item.onClick?.()
                    }}
                    disabled={item.disabled}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors",
                      activeId === item.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                    {item.badge}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </MobileNavContext.Provider>
  )
} 
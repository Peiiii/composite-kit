"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { MobileNavContext } from "./mobile-nav-context"
import { motion, HTMLMotionProps } from "framer-motion"

// 样式定义
export const mobileNavItemVariants = cva(
  "relative flex items-center justify-center w-full h-16 px-4 transition-colors duration-200 ease-in-out cursor-pointer select-none",
  {
    variants: {
      active: {
        true: "text-primary",
        false: "text-muted-foreground hover:text-foreground",
      },
      variant: {
        default: "",
        minimal: "h-12",
        pill: "rounded-full mx-2",
        bordered: "border border-border hover:border-primary",
      },
      animation: {
        default: "",
        bounce: "",
        scale: "",
        rotate: "",
        none: "",
      },
    },
    defaultVariants: {
      active: false,
      variant: "default",
      animation: "default",
    },
  },
)

type AnimationType = "bounce" | "scale" | "rotate" | "none" | "default"

// 动画变体定义
const animationVariants: Record<Exclude<AnimationType, "default" | "none">, {
  active: Record<string, any>;
  inactive: Record<string, any>;
}> = {
  bounce: {
    active: {
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    inactive: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
  scale: {
    active: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    inactive: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  },
  rotate: {
    active: {
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    inactive: {
      rotate: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
}

export interface MobileNavItemConfig {
  id: string
  icon?: React.ReactNode
  label?: string
  showLabel?: boolean
  onClick?: () => void
  badge?: number
  variant?: "default" | "minimal" | "pill" | "bordered"
  animation?: AnimationType
  className?: string
}

export interface MobileNavItemProps
  extends Omit<HTMLMotionProps<"div">, "onClick"> {
  config: MobileNavItemConfig
}

export function MobileNavItem({
  config,
  ...props
}: MobileNavItemProps) {
  const {
    id,
    icon,
    label,
    showLabel = true,
    onClick,
    variant = "default",
    animation = "default",
    badge,
    className
  } = config

  const { activeId, setActiveId } = React.useContext(MobileNavContext)
  const isActive = activeId === id

  const handleClick = React.useCallback(() => {
    setActiveId(id)
    onClick?.()
  }, [id, onClick, setActiveId])

  const getAnimationProps = () => {
    if (animation === "none" || animation === "default") return {}
    return animationVariants[animation as Exclude<AnimationType, "default" | "none">]?.[isActive ? "active" : "inactive"] || {}
  }

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={cn(mobileNavItemVariants({ active: isActive, variant, animation }), className)}
      onClick={handleClick}
      {...props}
    >
      <div className="flex flex-col items-center gap-1">
        {icon && (
          <motion.div
            animate={getAnimationProps()}
            className="relative"
          >
            {icon}
            {badge !== undefined && badge > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground ring-2 ring-background"
              >
                {badge}
              </motion.span>
            )}
          </motion.div>
        )}
        {showLabel && label && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium"
          >
            {label}
          </motion.span>
        )}
      </div>
      {isActive && variant !== "pill" && (
        <motion.div
          layoutId="activeIndicator"
          className={cn(
            "absolute h-0.5 bg-primary",
            variant === "bordered" ? "inset-0 rounded-full opacity-10" : "bottom-0 left-0 right-0"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
} 
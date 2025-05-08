"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import * as React from "react"

export interface TwitterNavItemProps extends Omit<HTMLMotionProps<"button">, "onClick"> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
  onClick?: () => void
}

export function TwitterNavItem({
  className,
  id,
  icon,
  label,
  active,
  badge,
  onClick,
  ...props
}: TwitterNavItemProps) {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 h-14 relative",
        active ? "text-blue-500" : "text-muted-foreground",
        className
      )}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <div className="relative">
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs">{label}</span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"
          layoutId="twitter-nav-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
} 
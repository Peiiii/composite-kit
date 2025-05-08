"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface TikTokNavItemProps extends Omit<HTMLMotionProps<"button">, "onClick"> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
  onClick?: () => void
}

export function TikTokNavItem({
  className,
  id,
  icon,
  label,
  active,
  badge,
  onClick,
  ...props
}: TikTokNavItemProps) {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 h-14 relative",
        active ? "text-white" : "text-white/60",
        className
      )}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <div className="relative">
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs">{label}</span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full"
          layoutId="tiktok-nav-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
} 
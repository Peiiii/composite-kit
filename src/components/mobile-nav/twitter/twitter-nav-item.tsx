"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface TwitterNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

export function TwitterNavItem({
  className,
  id,
  icon,
  label,
  active,
  badge,
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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full"
          layoutId="twitter-nav-indicator"
        />
      )}
    </motion.button>
  )
} 
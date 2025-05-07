"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface InstagramNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

export function InstagramNavItem({
  className,
  id,
  icon,
  label,
  active,
  badge,
  ...props
}: InstagramNavItemProps) {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 h-14 relative",
        active ? "text-foreground" : "text-muted-foreground",
        className
      )}
      whileTap={{ scale: 0.95 }}
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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full"
          layoutId="instagram-nav-indicator"
        />
      )}
    </motion.button>
  )
} 
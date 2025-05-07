"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface SpotifyNavItemProps extends Omit<HTMLMotionProps<"button">, "children"> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

export function SpotifyNavItem({
  id,
  icon,
  label,
  active,
  className,
  ...props
}: SpotifyNavItemProps) {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-full h-full",
        "text-muted-foreground hover:text-foreground transition-colors",
        active && "text-foreground",
        className
      )}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <div className="relative">
        {icon}
        {active && (
          <motion.div
            className="absolute -bottom-1 left-1/2 w-1 h-1 bg-foreground rounded-full"
            layoutId="spotify-nav-indicator"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        )}
      </div>
      <span className="text-xs">{label}</span>
    </motion.button>
  )
} 
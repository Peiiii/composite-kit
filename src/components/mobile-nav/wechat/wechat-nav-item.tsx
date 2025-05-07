"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface WeChatNavItemProps extends Omit<HTMLMotionProps<"button">, "children"> {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

export function WeChatNavItem({
  id,
  icon,
  label,
  active,
  badge,
  className,
  ...props
}: WeChatNavItemProps) {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-full h-full",
        "text-muted-foreground transition-colors",
        active ? "text-[#07C160]" : "hover:text-[#07C160]/60",
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
    </motion.button>
  )
}
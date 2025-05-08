"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createContext } from "react"

// 导航上下文
interface NavContextValue {
  activeId: string
  onActiveChange: (id: string) => void
}

const NavContext = createContext<NavContextValue | undefined>(undefined)

// 导航根组件
export interface NavRootProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

const NavRoot = React.forwardRef<HTMLDivElement, NavRootProps>(
  ({ defaultActiveId = "home", onActiveChange, className, children, ...props }, ref) => {
    const [activeId, setActiveId] = React.useState(defaultActiveId)

    const handleActiveChange = React.useCallback(
      (id: string) => {
        setActiveId(id)
        onActiveChange?.(id)
      },
      [onActiveChange]
    )

    return (
      <NavContext.Provider value={{ activeId, onActiveChange: handleActiveChange }}>
        <div
          ref={ref}
          className={cn(
            "fixed bottom-0 left-0 right-0 bg-background border-t",
            className
          )}
          {...props}
        >
          <div className="flex justify-around items-center h-16 px-2">
            {children}
          </div>
        </div>
      </NavContext.Provider>
    )
  }
)
NavRoot.displayName = "NavRoot"

// 导航项组件
export interface NavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string
  icon: React.ReactNode
  label: string
  badge?: number
  className?: string
}

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ id, icon, label, badge, className, ...props }, ref) => {
    const context = React.useContext(NavContext)
    if (!context) {
      throw new Error("NavItem must be used within NavRoot")
    }

    const { activeId, onActiveChange } = context
    const isActive = activeId === id

    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-1 w-full h-full",
          "text-muted-foreground transition-colors",
          isActive && "text-foreground",
          className
        )}
        onClick={() => onActiveChange(id)}
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
      </button>
    )
  }
)
NavItem.displayName = "NavItem"

// 导航指示器组件
export interface NavIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const NavIndicator = React.forwardRef<HTMLDivElement, NavIndicatorProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(NavContext)
    if (!context) {
      throw new Error("NavIndicator must be used within NavRoot")
    }

    const { activeId } = context

    return (
      <div
        ref={ref}
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground/80 rounded-full",
          className
        )}
        {...props}
      />
    )
  }
)
NavIndicator.displayName = "NavIndicator"

// 导出复合组件
export const MobileNav = {
  Root: NavRoot,
  Item: NavItem,
  Indicator: NavIndicator,
}
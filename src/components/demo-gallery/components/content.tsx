"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { useUIData } from "../context"

export interface DemoGalleryContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const DemoGalleryContent = React.forwardRef<HTMLElement, DemoGalleryContentProps>(
  ({ className, children, ...props }, ref) => {
    const { sidebarExpanded } = useUIData()

    return (
      <main 
        ref={ref}
        className={cn(
          "flex-1 overflow-auto transition-all duration-200",
          sidebarExpanded ? "ml-64" : "ml-0",
          className
        )}
        {...props}
      >
        <div className="container mx-auto py-8 px-4">
          <div className="space-y-12">
            {children}
          </div>
        </div>
      </main>
    )
  }
)
DemoGalleryContent.displayName = "DemoGalleryContent"
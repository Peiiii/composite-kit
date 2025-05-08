"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, ChevronUp, Home } from "lucide-react"
import * as React from "react"

export interface DemoCardRootProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DemoCardRoot = React.forwardRef<HTMLDivElement, DemoCardRootProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card shadow-sm", className)} {...props} />
  )
)
DemoCardRoot.displayName = "DemoCardRoot"

export interface DemoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  tags?: string[]
  showTags?: boolean
  showDescription?: boolean
  selectedCategory?: string | null
  onCategoryReset?: () => void
}

export const DemoCardHeader = React.forwardRef<HTMLDivElement, DemoCardHeaderProps>(
  ({ 
    className, 
    title,
    description,
    tags,
    showTags = true,
    showDescription = true,
    selectedCategory,
    onCategoryReset,
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    return (
      <div 
        ref={ref} 
        className={cn(
          "border-b transition-all duration-300 ease-in-out",
          isCollapsed ? "px-4 py-3" : "p-6",
          className
        )} 
        {...props}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {selectedCategory && (
              <div className={cn(
                "flex items-center text-sm text-muted-foreground mb-4 transition-all duration-300",
                isCollapsed ? "hidden" : "block"
              )}>
                <button
                  onClick={onCategoryReset}
                  className="flex items-center hover:text-foreground"
                >
                  <Home className="h-4 w-4 mr-1" />
                  所有分类
                </button>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">{selectedCategory}</span>
              </div>
            )}
            <h2 className={cn(
              "font-semibold truncate",
              isCollapsed ? "text-lg" : "text-2xl"
            )}>{title}</h2>
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
            )}>
              {showDescription && description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
              {showTags && tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm rounded-full bg-muted/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex-shrink-0 p-2 hover:bg-muted/50 rounded-md transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    )
  }
)
DemoCardHeader.displayName = "DemoCardHeader"

export interface DemoCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  contentHeight?: string
  isLoading?: boolean
  scrollable?: boolean
  scrollDirection?: 'vertical' | 'horizontal' | 'both'
}

export const DemoCardBody = React.forwardRef<HTMLDivElement, DemoCardBodyProps>(
  ({ 
    className, 
    contentHeight, 
    isLoading, 
    scrollable = false,
    scrollDirection = 'vertical',
    children, 
    ...props 
  }, ref) => {
    const scrollClasses = React.useMemo(() => {
      if (!scrollable) return ''
      
      const classes = ['overflow-auto']
      if (scrollDirection === 'horizontal' || scrollDirection === 'both') {
        classes.push('overflow-x-auto')
      }
      if (scrollDirection === 'vertical' || scrollDirection === 'both') {
        classes.push('overflow-y-auto')
      }
      return classes.join(' ')
    }, [scrollable, scrollDirection])

    return (
      <div 
        ref={ref} 
        className={cn(
          contentHeight ? `relative ${contentHeight}` : "relative",
          scrollClasses,
          className,
          "m-6"
        )} 
        {...props}
      >
        <div >
          <div className="min-w-full">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : children}
          </div>
        </div>
      </div>
    )
  }
)
DemoCardBody.displayName = "DemoCardBody"

export interface DemoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DemoCardFooter = React.forwardRef<HTMLDivElement, DemoCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-t p-4", className)} {...props} />
  )
)
DemoCardFooter.displayName = "DemoCardFooter"

export const DemoCard = {
  Root: DemoCardRoot,
  Header: DemoCardHeader,
  Body: DemoCardBody,
  Footer: DemoCardFooter,
} 
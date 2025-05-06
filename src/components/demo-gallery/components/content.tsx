"use client"

import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"
import { useDemoGallery } from "../context"

interface DemoGalleryContentProps {
  className?: string
  showTags?: boolean
  showDescription?: boolean
  contentHeight?: string
}

export function DemoGalleryContent({ 
  className,
  showTags = true,
  showDescription = true,
  contentHeight = "h-[600px]"
}: DemoGalleryContentProps) {
  const { 
    sidebarExpanded, 
    currentDemo, 
    isLoading,
    selectedCategory,
    setSelectedCategory 
  } = useDemoGallery()

  return (
    <main className={cn(
      "flex-1 overflow-auto transition-all duration-200",
      sidebarExpanded ? "ml-64" : "ml-0",
      className
    )}>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-12">
          <section className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center hover:text-foreground"
                >
                  <Home className="h-4 w-4 mr-1" />
                  所有分类
                </button>
                {selectedCategory && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">{selectedCategory}</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl font-semibold">{currentDemo?.title}</h2>
              {showDescription && currentDemo?.description && (
                <p className="text-muted-foreground mt-2">{currentDemo.description}</p>
              )}
              {showTags && currentDemo?.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentDemo.tags.map(tag => (
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
            <div className={cn("relative", contentHeight)}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                currentDemo?.component
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
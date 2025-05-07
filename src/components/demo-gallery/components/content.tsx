"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"
import { useDemoState, useUIData, useFilter } from "../context"
import { DemoConfig } from "../demo-gallery"

export interface DemoGalleryContentProps {
  className?: string
  showTags?: boolean
  showDescription?: boolean
  contentHeight?: string
}

export const DemoGalleryContent = React.memo(function DemoGalleryContent({ 
  className,
  showTags = true,
  showDescription = true,
  contentHeight = "h-[600px]"
}: DemoGalleryContentProps) {
  const { currentDemo } = useDemoState()
  const { sidebarExpanded, isLoading } = useUIData()
  const { selectedCategory, setSelectedCategory } = useFilter()

  const handleCategoryReset = React.useCallback(() => {
    setSelectedCategory(null)
  }, [setSelectedCategory])

  return (
    <main className={cn(
      "flex-1 overflow-auto transition-all duration-200",
      sidebarExpanded ? "ml-64" : "ml-0",
      className
    )}>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-12">
          <DemoCard
            currentDemo={currentDemo}
            isLoading={isLoading}
            showTags={showTags}
            showDescription={showDescription}
            contentHeight={contentHeight}
            selectedCategory={selectedCategory}
            onCategoryReset={handleCategoryReset}
          />
        </div>
      </div>
    </main>
  )
})

export interface DemoCardProps {
  currentDemo: DemoConfig | undefined
  isLoading: boolean
  showTags: boolean
  showDescription: boolean
  contentHeight: string
  selectedCategory: string | null
  onCategoryReset: () => void
}

export const DemoCard = React.memo(function DemoCard({
  currentDemo,
  isLoading,
  showTags,
  showDescription,
  contentHeight,
  selectedCategory,
  onCategoryReset
}: DemoCardProps) {
  return (
    <section className="rounded-lg border bg-card shadow-sm">
      <DemoHeader
        currentDemo={currentDemo}
        showTags={showTags}
        showDescription={showDescription}
        selectedCategory={selectedCategory}
        onCategoryReset={onCategoryReset}
      />
      <DemoContent
        currentDemo={currentDemo}
        isLoading={isLoading}
        contentHeight={contentHeight}
      />
    </section>
  )
})

export interface DemoHeaderProps {
  currentDemo: DemoConfig | undefined
  showTags: boolean
  showDescription: boolean
  selectedCategory: string | null
  onCategoryReset: () => void
}

export const DemoHeader = React.memo(function DemoHeader({
  currentDemo,
  showTags,
  showDescription,
  selectedCategory,
  onCategoryReset
}: DemoHeaderProps) {
  return (
    <div className="p-6 border-b">
      <Breadcrumb
        selectedCategory={selectedCategory}
        onCategoryReset={onCategoryReset}
      />
      <h2 className="text-2xl font-semibold">{currentDemo?.title}</h2>
      {showDescription && currentDemo?.description && (
        <p className="text-muted-foreground mt-2">{currentDemo.description}</p>
      )}
      {showTags && currentDemo?.tags && (
        <div className="flex flex-wrap gap-2 mt-4">
          {currentDemo.tags.map((tag: string) => (
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
  )
})

export interface DemoContentProps {
  currentDemo: DemoConfig | undefined
  isLoading: boolean
  contentHeight: string
}

export const DemoContent = React.memo(function DemoContent({
  currentDemo,
  isLoading,
  contentHeight
}: DemoContentProps) {
  return (
    <div className={cn("relative", contentHeight)}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        currentDemo?.component
      )}
    </div>
  )
})

interface BreadcrumbProps {
  selectedCategory: string | null
  onCategoryReset: () => void
}

const Breadcrumb = React.memo(function Breadcrumb({
  selectedCategory,
  onCategoryReset
}: BreadcrumbProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-4">
      <button
        onClick={onCategoryReset}
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
  )
})

const LoadingSpinner = React.memo(function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
})
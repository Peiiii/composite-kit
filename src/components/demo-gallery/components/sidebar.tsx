"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, Search } from "lucide-react"
import { useDemoState, useUIData, useFilter } from "../context"

export interface DemoGallerySidebarProps {
  className?: string
  title?: string
  showSearch?: boolean
  showCategoryFilter?: boolean
  showTags?: boolean
  showDescription?: boolean
  sidebarWidth?: string
  onDemoSelect?: (demoId: string) => void
  onCategoryChange?: (category: string | null) => void
  onSearch?: (query: string) => void
}

export const DemoGallerySidebar = React.memo(function DemoGallerySidebar({ 
  className,
  title = "组件库演示",
  showSearch = true,
  showCategoryFilter = true,
  showTags = true,
  showDescription = true,
  sidebarWidth = "w-64",
  onDemoSelect,
  onCategoryChange,
  onSearch,
}: DemoGallerySidebarProps) {
  const { selectedDemo, setSelectedDemo } = useDemoState()
  const { sidebarExpanded, setSidebarExpanded } = useUIData()
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    categories, 
    filteredDemos 
  } = useFilter()

  const handleSearch = React.useCallback((value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }, [setSearchQuery, onSearch])

  const handleCategoryChange = React.useCallback((value: string | null) => {
    setSelectedCategory(value)
    onCategoryChange?.(value)
  }, [setSelectedCategory, onCategoryChange])

  const handleDemoSelect = React.useCallback((demoId: string) => {
    setSelectedDemo(demoId)
    onDemoSelect?.(demoId)
  }, [setSelectedDemo, onDemoSelect])

  const handleSidebarToggle = React.useCallback(() => {
    setSidebarExpanded(false)
  }, [setSidebarExpanded])

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r transition-all duration-200 ease-in-out",
        "absolute left-0 top-0 bottom-0 z-20",
        sidebarExpanded ? `${sidebarWidth} opacity-100 translate-x-0` : `${sidebarWidth} opacity-0 -translate-x-full`,
        className
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="font-bold text-xl">{title}</h1>
        <button
          onClick={handleSidebarToggle}
          className="p-1 hover:bg-accent rounded-md"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {showSearch && (
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索 demo..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 rounded-md bg-muted/50 text-sm"
            />
          </div>
        </div>
      )}

      {showCategoryFilter && (
        <div className="p-2 border-b">
          <select
            value={selectedCategory || ""}
            onChange={(e) => handleCategoryChange(e.target.value || null)}
            className="w-full px-2 py-1.5 rounded-md bg-muted/50 text-sm"
          >
            <option value="">所有分类</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {filteredDemos.map((demo) => (
            <DemoItem
              key={demo.id}
              demo={demo}
              isSelected={selectedDemo === demo.id}
              showDescription={showDescription}
              showTags={showTags}
              onSelect={handleDemoSelect}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
})

interface DemoItemProps {
  demo: {
    id: string
    title: string
    description?: string
    tags?: string[]
  }
  isSelected: boolean
  showDescription: boolean
  showTags: boolean
  onSelect: (id: string) => void
}

const DemoItem = React.memo(function DemoItem({
  demo,
  isSelected,
  showDescription,
  showTags,
  onSelect
}: DemoItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(demo.id)}
        className={cn(
          "w-full text-left px-3 py-2 rounded-md transition-colors duration-200",
          isSelected
            ? "bg-accent text-accent-foreground"
            : "hover:bg-muted/50"
        )}
      >
        <div className="font-medium">{demo.title}</div>
        {showDescription && demo.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {demo.description}
          </div>
        )}
        {showTags && demo.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {demo.tags.map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-xs rounded-full bg-muted/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>
    </li>
  )
}) 
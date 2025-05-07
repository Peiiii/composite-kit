"use client"

import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { DemoConfig } from "../demo-gallery"
import { 
  DemoStateContext, 
  UIDataContext, 
  FilterContext,
  DemoGalleryContext,
  type DemoState,
  type UIData,
  type FilterState
} from "../context"

export interface DemoGalleryRootProps {
  demos: DemoConfig[]
  defaultDemoId?: string
  className?: string
  children: React.ReactNode
}

export const DemoGalleryRoot = React.memo(function DemoGalleryRoot({ 
  demos, 
  defaultDemoId, 
  className, 
  children 
}: DemoGalleryRootProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Demo 状态
  const [selectedDemo, setSelectedDemo] = React.useState(searchParams.get("demo") || defaultDemoId || demos[0].id)
  const currentDemo = React.useMemo(() => 
    demos.find((demo) => demo.id === selectedDemo),
    [demos, selectedDemo]
  )

  // UI 状态
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showExpandButton, setShowExpandButton] = React.useState(false)

  // 过滤状态
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  
  const categories = React.useMemo(() => 
    Array.from(new Set(demos.map(demo => demo.category))),
    [demos]
  )

  const filteredDemos = React.useMemo(() => 
    demos.filter(demo => {
      const matchesSearch = searchQuery === "" || 
        demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = !selectedCategory || demo.category === selectedCategory
      
      return matchesSearch && matchesCategory
    }),
    [demos, searchQuery, selectedCategory]
  )

  const handleDemoSelect = React.useCallback((demoId: string) => {
    setIsLoading(true)
    setSelectedDemo(demoId)
    navigate(`?demo=${demoId}`)
    setTimeout(() => setIsLoading(false), 300)
  }, [navigate])

  // 构建各个 Context 的值
  const demoState = React.useMemo<DemoState>(() => ({
    demos,
    selectedDemo,
    setSelectedDemo: handleDemoSelect,
    currentDemo
  }), [demos, selectedDemo, handleDemoSelect, currentDemo])

  const uiData = React.useMemo<UIData>(() => ({
    sidebarExpanded,
    setSidebarExpanded,
    isLoading,
    setIsLoading,
    showExpandButton,
    setShowExpandButton
  }), [sidebarExpanded, isLoading, showExpandButton])

  const filterState = React.useMemo<FilterState>(() => ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredDemos,
    categories
  }), [searchQuery, selectedCategory, filteredDemos, categories])

  // 为了向后兼容，保留原有的 context 值
  const legacyValue = React.useMemo(() => ({
    ...demoState,
    ...uiData,
    ...filterState
  }), [demoState, uiData, filterState])

  return (
    <DemoStateContext.Provider value={demoState}>
      <UIDataContext.Provider value={uiData}>
        <FilterContext.Provider value={filterState}>
          <DemoGalleryContext.Provider value={legacyValue}>
            <div className={className}>
              <div className="flex h-screen relative">
                {children}
              </div>
            </div>
          </DemoGalleryContext.Provider>
        </FilterContext.Provider>
      </UIDataContext.Provider>
    </DemoStateContext.Provider>
  )
}) 
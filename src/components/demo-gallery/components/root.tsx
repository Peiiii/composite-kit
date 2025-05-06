"use client"

import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { DemoConfig } from "../demo-gallery"
import { DemoGalleryContext } from "../context"

interface DemoGalleryRootProps {
  demos: DemoConfig[]
  defaultDemoId?: string
  className?: string
  children: React.ReactNode
}

export function DemoGalleryRoot({ demos, defaultDemoId, className, children }: DemoGalleryRootProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedDemo, setSelectedDemo] = React.useState(searchParams.get("demo") || defaultDemoId || demos[0].id)
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showExpandButton, setShowExpandButton] = React.useState(false)

  const currentDemo = demos.find((demo) => demo.id === selectedDemo)
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

  const value = React.useMemo(() => ({
    selectedDemo,
    setSelectedDemo: handleDemoSelect,
    sidebarExpanded,
    setSidebarExpanded,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    setIsLoading,
    showExpandButton,
    setShowExpandButton,
    demos,
    filteredDemos,
    categories,
    currentDemo
  }), [
    selectedDemo,
    handleDemoSelect,
    sidebarExpanded,
    searchQuery,
    selectedCategory,
    isLoading,
    showExpandButton,
    demos,
    filteredDemos,
    categories,
    currentDemo
  ])

  return (
    <DemoGalleryContext.Provider value={value}>
      <div className={className}>
        <div className="flex h-screen relative">
          {children}
        </div>
      </div>
    </DemoGalleryContext.Provider>
  )
} 
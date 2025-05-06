"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Search, Home } from "lucide-react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

// 定义 demo 配置类型
export interface DemoConfig {
  id: string
  title: string
  component: React.ReactNode
  description?: string
  category: string
  tags?: string[]
}

export interface DemoGalleryProps {
  demos: DemoConfig[]
  defaultDemoId?: string
  className?: string
}

export function DemoGallery({ demos, defaultDemoId, className }: DemoGalleryProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedDemo, setSelectedDemo] = React.useState(searchParams.get("demo") || defaultDemoId || demos[0].id)
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showExpandButton, setShowExpandButton] = React.useState(false)

  const currentDemo = demos.find((demo) => demo.id === selectedDemo)

  // 获取所有分类
  const categories = React.useMemo(() => 
    Array.from(new Set(demos.map(demo => demo.category))),
    [demos]
  )

  // 过滤 demo
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

  // 处理 demo 选择
  const handleDemoSelect = React.useCallback((demoId: string) => {
    setIsLoading(true)
    setSelectedDemo(demoId)
    navigate(`?demo=${demoId}`)
    // 模拟加载延迟
    setTimeout(() => setIsLoading(false), 300)
  }, [navigate])

  // 键盘导航
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const currentIndex = filteredDemos.findIndex(demo => demo.id === selectedDemo)
        let newIndex = currentIndex

        if (e.key === "ArrowDown") {
          newIndex = (currentIndex + 1) % filteredDemos.length
        } else if (e.key === "ArrowUp") {
          newIndex = (currentIndex - 1 + filteredDemos.length) % filteredDemos.length
        }

        handleDemoSelect(filteredDemos[newIndex].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filteredDemos, selectedDemo, handleDemoSelect])

  return (
    <div className={className}>
      <div className="flex h-screen relative">
        {/* 侧边栏导航 */}
        <div
          className={cn(
            "flex flex-col bg-card border-r transition-all duration-200 ease-in-out",
            "absolute left-0 top-0 bottom-0 z-20",
            sidebarExpanded ? "w-64 opacity-100 translate-x-0" : "w-64 opacity-0 -translate-x-full"
          )}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold text-xl">组件库演示</h1>
            <button
              onClick={() => setSidebarExpanded(false)}
              className="p-1 hover:bg-accent rounded-md"
            >
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索 demo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 rounded-md bg-muted/50 text-sm"
              />
            </div>
          </div>

          <div className="p-2 border-b">
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full px-2 py-1.5 rounded-md bg-muted/50 text-sm"
            >
              <option value="">所有分类</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {filteredDemos.map((demo) => (
                <li key={demo.id}>
                  <button
                    onClick={() => handleDemoSelect(demo.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors duration-200",
                      selectedDemo === demo.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="font-medium">{demo.title}</div>
                    {demo.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {demo.description}
                      </div>
                    )}
                    {demo.tags && (
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
              ))}
            </ul>
          </nav>
        </div>

        {/* 展开按钮 */}
        {!sidebarExpanded && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20"
            onMouseEnter={() => setShowExpandButton(true)}
            onMouseLeave={() => setShowExpandButton(false)}
          >
            <button
              onClick={() => setSidebarExpanded(true)}
              className={cn(
                "p-2 rounded-r-md bg-card border border-l-0 shadow-md",
                "transition-all duration-200",
                showExpandButton ? "translate-x-0" : "-translate-x-2"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* 主内容区域 */}
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-200",
          sidebarExpanded ? "ml-64" : "ml-0"
        )}>
          <div className="container mx-auto py-8 px-4">
            <div className="space-y-12">
              <section className="rounded-lg border bg-card shadow-sm">
                <div className="p-6 border-b">
                  {/* 面包屑导航 */}
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
                  {currentDemo?.description && (
                    <p className="text-muted-foreground mt-2">{currentDemo.description}</p>
                  )}
                  {currentDemo?.tags && (
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
                <div className="h-[600px] relative">
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
      </div>
    </div>
  )
} 
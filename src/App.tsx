import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Search, Home } from "lucide-react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ActivityBarConfigurable from "./demos/activity-bar-configurable/page"
import ActivityBarComposite from "./demos/activity-bar-composite/page"

// 定义 demo 配置类型
interface DemoConfig {
  id: string
  title: string
  component: React.ReactNode
  description?: string
  category: string
  tags?: string[]
}

// 所有 demo 的配置
const demos: DemoConfig[] = [
  {
    id: "activity-bar-configurable",
    title: "Activity Bar (配置模式)",
    component: <ActivityBarConfigurable />,
    description: "使用配置对象的方式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "配置模式"],
  },
  {
    id: "activity-bar-composite",
    title: "Activity Bar (复合组件模式)",
    component: <ActivityBarComposite />,
    description: "使用复合组件模式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "复合组件"],
  },
]

// 获取所有分类
const categories = Array.from(new Set(demos.map(demo => demo.category)))

function App() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedDemo, setSelectedDemo] = useState(searchParams.get("demo") || demos[0].id)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentDemo = demos.find((demo) => demo.id === selectedDemo)

  // 过滤 demo
  const filteredDemos = demos.filter(demo => {
    const matchesSearch = searchQuery === "" || 
      demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || demo.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // 处理 demo 选择
  const handleDemoSelect = useCallback((demoId: string) => {
    setIsLoading(true)
    setSelectedDemo(demoId)
    navigate(`?demo=${demoId}`)
    // 模拟加载延迟
    setTimeout(() => setIsLoading(false), 300)
  }, [navigate])

  // 键盘导航
  useEffect(() => {
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
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* 侧边栏导航 */}
        <div
          className={`
            flex flex-col
            bg-card border-r
            transition-all duration-200 ease-in-out
            ${sidebarExpanded ? "w-64" : "w-16"}
          `}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className={`font-bold ${sidebarExpanded ? "text-xl" : "text-sm"}`}>
              {sidebarExpanded ? "组件库演示" : "演示"}
            </h1>
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-1 hover:bg-accent rounded-md"
            >
              {sidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          {sidebarExpanded && (
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
          )}

          {sidebarExpanded && (
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
          )}

          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {filteredDemos.map((demo) => (
                <li key={demo.id}>
                  <button
                    onClick={() => handleDemoSelect(demo.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md
                      transition-colors duration-200
                      ${selectedDemo === demo.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/50"
                      }
                    `}
                  >
                    <div className="font-medium">{demo.title}</div>
                    {sidebarExpanded && demo.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {demo.description}
                      </div>
                    )}
                    {sidebarExpanded && demo.tags && (
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

        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
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

export default App

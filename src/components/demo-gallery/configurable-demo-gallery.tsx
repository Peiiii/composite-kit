"use client"

import { DemoGallery, type DemoConfig } from "./demo-gallery"

// 定义配置类型
export interface ConfigurableDemoGalleryProps {
  demos: DemoConfig[]
  defaultDemoId?: string
  className?: string
  // 自定义配置
  title?: string
  showSearch?: boolean
  showCategoryFilter?: boolean
  showTags?: boolean
  showDescription?: boolean
  // 自定义样式
  sidebarWidth?: string
  contentHeight?: string
  // 自定义行为
  onDemoSelect?: (demoId: string) => void
  onCategoryChange?: (category: string | null) => void
  onSearch?: (query: string) => void
}

export function ConfigurableDemoGallery({
  demos,
  defaultDemoId,
  className,
  // 默认配置
  title = "组件库演示",
  showSearch = true,
  showCategoryFilter = true,
  showTags = true,
  showDescription = true,
  // 默认样式
  sidebarWidth = "w-64",
  contentHeight = "h-[600px]",
  // 自定义行为
  onDemoSelect,
  onCategoryChange,
  onSearch,
}: ConfigurableDemoGalleryProps) {
  return (
    <DemoGallery.Root
      demos={demos}
      defaultDemoId={defaultDemoId}
      className={className}
    >
      <DemoGallery.Sidebar
        title={title}
        showSearch={showSearch}
        showCategoryFilter={showCategoryFilter}
        showTags={showTags}
        showDescription={showDescription}
        sidebarWidth={sidebarWidth}
        onDemoSelect={onDemoSelect}
        onCategoryChange={onCategoryChange}
        onSearch={onSearch}
      />
      <DemoGallery.ExpandButton />
      <DemoGallery.Content
        showTags={showTags}
        showDescription={showDescription}
        contentHeight={contentHeight}
      />
    </DemoGallery.Root>
  )
} 
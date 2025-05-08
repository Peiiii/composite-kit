"use client"

import * as React from "react"
import { DemoGalleryContent } from "./components/content"
import { DemoCard } from "./components/demo-card"
import { DemoGalleryExpandButton } from "./components/expand-button"
import { DemoGalleryRoot } from "./components/root"
import { DemoGallerySidebar } from "./components/sidebar"

// 定义 demo 配置类型
export interface DemoConfig {
  id: string
  title: string
  component: React.ReactNode
  description?: string
  category: string
  tags?: string[]
}

// 导出类型定义
export type { DemoGalleryContentProps } from "./components/content"
export type {
  DemoCardBodyProps,
  DemoCardFooterProps, DemoCardHeaderProps, DemoCardRootProps
} from "./components/demo-card"
export type { DemoGalleryRootProps } from "./components/root"
export type { DemoGallerySidebarProps } from "./components/sidebar"

// 导出组件
export const DemoGallery = {
  Root: DemoGalleryRoot,
  Sidebar: DemoGallerySidebar,
  ExpandButton: DemoGalleryExpandButton,
  Content: DemoGalleryContent,
}

export { DemoCard }

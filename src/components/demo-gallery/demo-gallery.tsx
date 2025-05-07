"use client"

import * as React from "react"
import { DemoGalleryRoot } from "./components/root"
import { DemoGallerySidebar } from "./components/sidebar"
import { DemoGalleryExpandButton } from "./components/expand-button"
import { 
  DemoGalleryContent,
  DemoCard,
  DemoHeader,
  DemoContent
} from "./components/content"

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
export type { DemoGalleryRootProps } from "./components/root"
export type { DemoGallerySidebarProps } from "./components/sidebar"
export type { 
  DemoGalleryContentProps,
  DemoCardProps,
  DemoHeaderProps,
  DemoContentProps
} from "./components/content"

// 导出组件
export const DemoGallery = {
  Root: DemoGalleryRoot,
  Sidebar: DemoGallerySidebar,
  ExpandButton: DemoGalleryExpandButton,
  Content: DemoGalleryContent,
  DemoCard: DemoCard,
  DemoHeader: DemoHeader,
  DemoContent: DemoContent
} 
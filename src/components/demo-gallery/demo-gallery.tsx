"use client"

import * as React from "react"
import { DemoGalleryRoot } from "./components/root"
import { DemoGallerySidebar } from "./components/sidebar"
import { DemoGalleryExpandButton } from "./components/expand-button"
import { DemoGalleryContent } from "./components/content"

// 定义 demo 配置类型
export interface DemoConfig {
  id: string
  title: string
  component: React.ReactNode
  description?: string
  category: string
  tags?: string[]
}

// 导出复合组件
export const DemoGallery = {
  Root: DemoGalleryRoot,
  Sidebar: DemoGallerySidebar,
  ExpandButton: DemoGalleryExpandButton,
  Content: DemoGalleryContent
} 
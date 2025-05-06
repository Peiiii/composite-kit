"use client"

import * as React from "react"
import { DemoConfig } from "./demo-gallery"

export interface DemoGalleryContextValue {
  selectedDemo: string
  setSelectedDemo: (id: string) => void
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showExpandButton: boolean
  setShowExpandButton: (show: boolean) => void
  demos: DemoConfig[]
  filteredDemos: DemoConfig[]
  categories: string[]
  currentDemo: DemoConfig | undefined
}

export const DemoGalleryContext = React.createContext<DemoGalleryContextValue | null>(null)

export function useDemoGallery() {
  const context = React.useContext(DemoGalleryContext)
  if (!context) {
    throw new Error("useDemoGallery must be used within a DemoGallery")
  }
  return context
} 
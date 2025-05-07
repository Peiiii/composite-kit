"use client"

import * as React from "react"
import { DemoConfig } from "./demo-gallery"

// Demo 状态 Context
export interface DemoState {
  demos: DemoConfig[]
  selectedDemo: string
  setSelectedDemo: (id: string) => void
  currentDemo: DemoConfig | undefined
}

export const DemoStateContext = React.createContext<DemoState | null>(null)

export function useDemoState() {
  const context = React.useContext(DemoStateContext)
  if (!context) {
    throw new Error("useDemoState must be used within a DemoGallery")
  }
  return context
}

// UI 状态 Context
export interface UIData {
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showExpandButton: boolean
  setShowExpandButton: (show: boolean) => void
}

export const UIDataContext = React.createContext<UIData | null>(null)

export function useUIData() {
  const context = React.useContext(UIDataContext)
  if (!context) {
    throw new Error("useUIData must be used within a DemoGallery")
  }
  return context
}

// 过滤状态 Context
export interface FilterState {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  filteredDemos: DemoConfig[]
  categories: string[]
}

export const FilterContext = React.createContext<FilterState | null>(null)

export function useFilter() {
  const context = React.useContext(FilterContext)
  if (!context) {
    throw new Error("useFilter must be used within a DemoGallery")
  }
  return context
}

// 为了向后兼容，保留原有的 context
export interface DemoGalleryContextValue extends DemoState, UIData, FilterState {}

export const DemoGalleryContext = React.createContext<DemoGalleryContextValue | null>(null)

export function useDemoGallery() {
  const context = React.useContext(DemoGalleryContext)
  if (!context) {
    throw new Error("useDemoGallery must be used within a DemoGallery")
  }
  return context
} 
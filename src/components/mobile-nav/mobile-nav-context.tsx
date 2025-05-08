"use client"

import * as React from "react"

export interface MobileNavContextConfig {
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  expandOnHover?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

export interface MobileNavContextValue extends MobileNavContextConfig {
  activeId: string
  setActiveId: (id: string) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

export const MobileNavContext = React.createContext<MobileNavContextValue>({
  activeId: "",
  setActiveId: () => {},
  isExpanded: false,
  setIsExpanded: () => {},
})

export function MobileNavProvider({
  children,
  config = {},
}: {
  children: React.ReactNode
  config?: MobileNavContextConfig
}) {
  const {
    defaultActiveId = "",
    onActiveChange,
    expandOnHover = false,
    expanded = false,
    onExpandedChange,
  } = config

  const [activeId, setActiveId] = React.useState(defaultActiveId)
  const [isExpanded, setIsExpanded] = React.useState(expanded)

  const handleActiveChange = React.useCallback((id: string) => {
    setActiveId(id)
    onActiveChange?.(id)
  }, [onActiveChange])

  const handleExpandedChange = React.useCallback((expanded: boolean) => {
    setIsExpanded(expanded)
    onExpandedChange?.(expanded)
  }, [onExpandedChange])

  const value = React.useMemo(() => ({
    activeId,
    setActiveId: handleActiveChange,
    isExpanded,
    setIsExpanded: handleExpandedChange,
    expandOnHover,
  }), [activeId, handleActiveChange, isExpanded, handleExpandedChange, expandOnHover])

  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  )
} 
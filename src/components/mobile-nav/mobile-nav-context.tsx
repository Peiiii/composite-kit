"use client"

import * as React from "react"

interface MobileNavContextValue {
  expanded: boolean
  activeId?: string
  setActiveId: (id: string) => void
}

export const MobileNavContext = React.createContext<MobileNavContextValue>({
  expanded: false,
  setActiveId: () => {},
}) 
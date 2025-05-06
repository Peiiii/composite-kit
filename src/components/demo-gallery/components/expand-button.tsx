"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useDemoGallery } from "../context"

export function DemoGalleryExpandButton() {
  const { sidebarExpanded, setSidebarExpanded, showExpandButton, setShowExpandButton } = useDemoGallery()

  if (sidebarExpanded) return null

  return (
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
  )
} 
"use client"

import * as React from "react"
import { useDemoState, useFilter, useUIData } from "../context"
import { DemoCard } from "./demo-card"
import type { DemoCardBodyProps } from "./demo-card"

export interface DemoCardContainerProps {
  showTags?: boolean
  showDescription?: boolean
  bodyProps?: Omit<DemoCardBodyProps, 'children'>
}

export const DemoCardContainer = React.memo(function DemoCardContainer({
  showTags = true,
  showDescription = true,
  bodyProps,
}: DemoCardContainerProps) {
  const { currentDemo } = useDemoState()
  const { isLoading } = useUIData()
  const { selectedCategory, setSelectedCategory } = useFilter()

  const handleCategoryReset = React.useCallback(() => {
    setSelectedCategory(null)
  }, [setSelectedCategory])

  return (
    <DemoCard.Root>
      <DemoCard.Header
        title={currentDemo?.title || ""}
        description={currentDemo?.description}
        tags={currentDemo?.tags}
        showTags={showTags}
        showDescription={showDescription}
        selectedCategory={selectedCategory}
        onCategoryReset={handleCategoryReset}
      />
      <DemoCard.Body
        {...bodyProps}
        isLoading={isLoading}
      >
        {currentDemo?.component}
      </DemoCard.Body>
    </DemoCard.Root>
  )
}) 
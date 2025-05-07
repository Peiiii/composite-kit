"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DemoGallery, type DemoConfig } from "@/components/demo-gallery"
import { useDemoState, useUIData, useFilter } from "@/components/demo-gallery/context"
import ActivityBarComposite from "../activity-bar-composite/page"
import ActivityBarConfigurable from "../activity-bar-configurable/page"

// 示例配置
const exampleDemos: DemoConfig[] = [
    {
        id: "activity-bar-configurable",
        title: "Activity Bar (配置模式)",
        component: <ActivityBarConfigurable />,
        description: "使用配置对象的方式构建 Activity Bar",
        category: "布局组件",
        tags: ["activity-bar", "配置模式"],
    },
    {
        id: "activity-bar-composite",
        title: "Activity Bar (复合组件模式)",
        component: <ActivityBarComposite />,
        description: "使用复合组件模式构建 Activity Bar",
        category: "布局组件",
        tags: ["activity-bar", "复合组件"],
    },
]

export function DemoGalleryCustomComposite() {
    const { currentDemo } = useDemoState()
    const { sidebarExpanded, isLoading } = useUIData()
    const { selectedCategory, setSelectedCategory } = useFilter()

    const handleCategoryReset = React.useCallback(() => {
        setSelectedCategory(null)
    }, [setSelectedCategory])

    return (
        <DemoGallery.Root
            demos={exampleDemos}
            defaultDemoId="activity-bar-configurable"
            className="h-full bg-background"
        >
            <DemoGallery.Sidebar
                title="组件库演示"
                showSearch
                showCategoryFilter
                showTags
                showDescription
                sidebarWidth="w-64"
            />
            <DemoGallery.ExpandButton />
            <main className={cn(
                "flex-1 overflow-auto transition-all duration-200",
                sidebarExpanded ? "ml-64" : "ml-0"
            )}>
                <div className="container mx-auto py-8 px-4">
                    <div className="space-y-12">
                        <DemoGallery.DemoCard
                            currentDemo={currentDemo}
                            isLoading={isLoading}
                            showTags={true}
                            showDescription={true}
                            contentHeight="h-[600px]"
                            selectedCategory={selectedCategory}
                            onCategoryReset={handleCategoryReset}
                        />
                    </div>
                </div>
            </main>
        </DemoGallery.Root>
    )
} 
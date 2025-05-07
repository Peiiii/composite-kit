import * as React from "react"
import { DemoGallery } from "@/components/demo-gallery"
import ActivityBarComposite from "./demos/activity-bar-composite/page"
import ActivityBarConfigurable from "./demos/activity-bar-configurable/page"
import DemoGalleryComposite from "./demos/demo-gallery-composite/page"
import DemoGalleryConfigurable from "./demos/demo-gallery-configurable/page"
import { DemoGalleryCustomComposite } from "./demos/demo-gallery-composite/custom-composite"

// 所有 demo 的配置
const demos = [
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
  {
    id: "demo-gallery-configurable",
    title: "Demo Gallery (配置模式)",
    component: <DemoGalleryConfigurable />,
    description: "使用配置对象的方式构建 Demo Gallery",
    category: "布局组件",
    tags: ["demo-gallery", "配置模式"],
  },
  {
    id: "demo-gallery-composite",
    title: "Demo Gallery (复合组件模式)",
    component: <DemoGalleryComposite />,
    description: "使用复合组件模式构建 Demo Gallery",
    category: "布局组件",
    tags: ["demo-gallery", "复合组件"],
  },
  {
    id: "demo-gallery-custom-composite",
    title: "Demo Gallery (自定义组合模式)",
    component: <DemoGalleryCustomComposite />,
    description: "使用自定义组合模式构建 Demo Gallery，展示如何使用基础组件进行组合",
    category: "布局组件",
    tags: ["demo-gallery", "自定义组合"],
  },
]

const App = React.memo(function App() {
  return (
    <DemoGallery.Root
      demos={demos}
      defaultDemoId="activity-bar-configurable"
      className="h-screen bg-background"
    >
      <DemoGallery.Sidebar
        title="组件库演示"
        showSearch={true}
        showCategoryFilter={true}
        showTags={true}
        showDescription={true}
        sidebarWidth="w-64"
      />
      <DemoGallery.ExpandButton />
      <DemoGallery.Content
        showTags={true}
        showDescription={true}
        contentHeight="h-[600px]"
      />
    </DemoGallery.Root>
  )
})

export default App

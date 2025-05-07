import * as React from "react"
import { ConfigurableDemoGallery, type DemoConfig } from "@/components/demo-gallery"
import ActivityBarComposite from "./demos/activity-bar-composite/page"
import ActivityBarConfigurable from "./demos/activity-bar-configurable/page"
import DemoGalleryComposite from "./demos/demo-gallery-composite/page"
import DemoGalleryConfigurable from "./demos/demo-gallery-configurable/page"

// 所有 demo 的配置
const demos: DemoConfig[] = [
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
]

const App = React.memo(function App() {
  return (
    <ConfigurableDemoGallery
      demos={demos}
      defaultDemoId="activity-bar-configurable"
      className="min-h-screen bg-background"
      title="组件库演示"
      showSearch={true}
      showCategoryFilter={true}
      showTags={true}
      showDescription={true}
      sidebarWidth="w-64"
      contentHeight="h-[600px]"
    />
  )
})

export default App

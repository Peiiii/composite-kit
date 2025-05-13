import { DemoConfig } from "@/components/demo-gallery";
import DemoGalleryComposite from "./page";
import DemoGalleryConfigurable from "../demo-gallery-configurable/page";
import { DemoGalleryCustomComposite } from "./custom-composite";

export const demoGalleryDemos: DemoConfig[] = [
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
]; 
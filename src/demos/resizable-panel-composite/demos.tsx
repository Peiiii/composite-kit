import { DemoConfig } from "@/components/demo-gallery";
import ResizablePanelCompositeDemo from "./page";
import { AdvancedDemo as ResizablePanelAdvancedDemo } from "./advanced";
import { RefControlDemo } from "./ref-control";

export const resizablePanelDemos: DemoConfig[] = [
  {
    id: "resizable-panel-ref-control",
    title: "可调整大小面板 (Ref 控制)",
    component: <RefControlDemo />,
    description: "展示如何使用 ref 来控制面板的折叠状态，提供更灵活的控制方式",
    category: "布局组件",
    tags: ["layout", "resizable", "ref", "高级功能"],
  },
  {
    id: "resizable-panel-advanced",
    title: "可调整大小面板 (高级)",
    component: <ResizablePanelAdvancedDemo />,
    description: "展示可调整大小面板的高级功能，包括嵌套面板、网格对齐、键盘操作等",
    category: "布局组件",
    tags: ["layout", "resizable", "复合组件", "高级功能"],
  },
  {
    id: "resizable-panel-composite",
    title: "可调整大小面板 (基础)",
    component: <ResizablePanelCompositeDemo />,
    description: "一个支持拖拽调整大小的面板组件，支持水平和垂直分割",
    category: "布局组件",
    tags: ["layout", "resizable", "复合组件"],
  },
]; 
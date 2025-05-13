import { DemoConfig } from "@/components/demo-gallery";
import ResizablePanelCompositeDemo from "./page";
import { AdvancedDemo as ResizablePanelAdvancedDemo } from "./advanced";
import { RefControlDemo } from "./ref-control";
import { ThreeColumnDemo } from "./three-column";
import { VSCodeLayoutDemo } from "./vscode-layout";
import { VSCodeLayoutSimplifiedDemo } from "./vscode-layout-simplified";
import { VSCodeDualSidebarDemo } from "./vscode-dual-sidebar";

export const resizablePanelDemos: DemoConfig[] = [
  {
    id: "resizable-panel-vscode-dual-sidebar",
    title: "VS Code 双侧边栏布局",
    component: <VSCodeDualSidebarDemo />,
    description: "模拟VS Code的双侧边栏布局，左右两侧均有可折叠的侧边栏，使用自定义Hook简化状态管理",
    category: "布局组件",
    tags: ["layout", "resizable", "复合布局", "IDE", "双侧边栏", "Hook简化"],
  },
  {
    id: "resizable-panel-vscode-layout-simplified",
    title: "VS Code 布局 (简化版)",
    component: <VSCodeLayoutSimplifiedDemo />,
    description: "使用自定义Hook简化的VS Code风格四栏布局，减少了状态管理的样板代码",
    category: "布局组件",
    tags: ["layout", "resizable", "复合布局", "IDE", "垂直拖拽", "Hook简化"],
  },
  {
    id: "resizable-panel-vscode-layout",
    title: "VS Code 布局",
    component: <VSCodeLayoutDemo />,
    description: "模拟 VS Code 的四栏布局，包含左侧活动栏、侧边栏、主编辑区域和底部面板，支持水平和垂直拖拽调整",
    category: "布局组件",
    tags: ["layout", "resizable", "复合布局", "IDE", "垂直拖拽"],
  },
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
  {
    id: "resizable-panel-three-column",
    title: "三栏布局面板",
    component: <ThreeColumnDemo />,
    description: "展示如何使用可调整大小面板创建经典的三栏布局，左右面板可折叠",
    category: "布局组件",
    tags: ["layout", "resizable", "三栏布局", "可折叠"],
  },
];

export * from "./advanced";
export * from "./ref-control";
export * from "./three-column";
export * from "./vscode-layout";
export * from "./vscode-layout-simplified";
export * from "./vscode-dual-sidebar"; 
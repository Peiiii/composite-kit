import * as React from "react";
import { VSCodeLayoutDemo } from "./components/vscode-layout-demo";
import { VSCodeLayoutCompoundDemo } from "./components/vscode-layout-compound-demo";
import { FullyCompoundDemo } from "./components/fully-compound-demo";
import { ConfiguratorDemo } from "./components/configurator-demo";
import { LayoutControlsDemo } from "./components/layout-controls-demo";
import { VSCodeLayoutPureDemo } from "./components/vscode-layout-pure-demo";
import { VSCodeLayoutPureDemo as VSCodeLayoutPureDemoRefactoring } from "./components/vscode-layout-pure-demo-refactoring";
import { VSCodeLayout } from "./components/vscode-layout-refactored";

export const vscodeLayoutDemos = [
  {
    id: "vscode-layout-v2-refactored",
    title: "VS Code 布局（重构版）V2",
    component: <VSCodeLayout />,
    description: "使用配置驱动和组件化架构重构的 VS Code 布局，支持高度自定义和扩展",
    category: "布局组件",
    tags: ["layout", "vscode", "配置驱动", "组件化", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-v2-pure-refactoring",
    title: "VS Code 布局（纯组件）- 重构版",
    component: <VSCodeLayoutPureDemoRefactoring />,
    description: "使用纯组件实现的 VS Code 布局，不依赖任何外部状态管理",
    category: "布局组件",
    tags: ["layout", "vscode", "纯组件", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-v2-pure",
    title: "VS Code 布局（纯组件）",
    component: <VSCodeLayoutPureDemo />,
    description: "使用纯组件实现的 VS Code 布局，不依赖任何外部状态管理",
    category: "布局组件",
    tags: ["layout", "vscode", "纯组件", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-v2-layout-controls",
    title: "VS Code 布局控制",
    component: <LayoutControlsDemo />,
    description:
      "展示VSCode布局的控制功能，包括面板显示/隐藏、折叠/展开以及布局预设",
    category: "布局组件",
    tags: ["layout", "vscode", "controls", "sidebar", "panel"],
  },
  {
    id: "vscode-layout-v2-configurator",
    title: "VS Code 布局 V2（配置器）",
    component: <ConfiguratorDemo />,
    description:
      "使用 react-resizable-panels 实现的 VS Code 布局，支持面板拖拽调整大小和折叠",
    category: "布局组件",
  },
  {
    id: "vscode-layout-v2",
    title: "VS Code 布局 V2",
    component: <VSCodeLayoutDemo />,
    description:
      "使用 react-resizable-panels 实现的 VS Code 布局，支持面板拖拽调整大小和折叠",
    category: "布局组件",
    tags: ["layout", "vscode", "现代化", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-compound",
    title: "VS Code 布局（复合组件）",
    component: <VSCodeLayoutCompoundDemo />,
    description:
      "使用命名空间模式的复合组件实现的 VS Code 布局，更加灵活和可组合",
    category: "布局组件",
    tags: ["layout", "vscode", "复合组件", "现代化", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-fully-compound",
    title: "VS Code 布局（全命名空间模式）",
    component: <FullyCompoundDemo />,
    description:
      "所有组件均使用命名空间模式实现的 VS Code 布局，完全组合式 API",
    category: "布局组件",
    tags: ["layout", "vscode", "复合组件", "命名空间", "组合式 API"],
  },
];

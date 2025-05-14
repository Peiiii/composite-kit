import * as React from "react";
import { VSCodeLayoutDemo } from "./components/vscode-layout-demo";
import { VSCodeLayoutCompoundDemo } from "./components/vscode-layout-compound-demo";
import { FullyCompoundDemo } from "./components/fully-compound-demo";

export const vscodeLayoutDemos = [
  {
    id: "vscode-layout-v2",
    title: "VS Code 布局 V2",
    component: <VSCodeLayoutDemo />,
    description: "使用 react-resizable-panels 实现的 VS Code 布局，支持面板拖拽调整大小和折叠",
    category: "布局组件",
    tags: ["layout", "vscode", "现代化", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-compound",
    title: "VS Code 布局（复合组件）",
    component: <VSCodeLayoutCompoundDemo />,
    description: "使用命名空间模式的复合组件实现的 VS Code 布局，更加灵活和可组合",
    category: "布局组件",
    tags: ["layout", "vscode", "复合组件", "现代化", "react-resizable-panels"],
  },
  {
    id: "vscode-layout-fully-compound",
    title: "VS Code 布局（全命名空间模式）",
    component: <FullyCompoundDemo />,
    description: "所有组件均使用命名空间模式实现的 VS Code 布局，完全组合式 API",
    category: "布局组件",
    tags: ["layout", "vscode", "复合组件", "命名空间", "组合式 API"],
  },
]; 
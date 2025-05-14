import * as React from "react";
import { VSCodeLayout } from "./components/vscode-layout";
import { VSCodeLayoutDemo } from "./components/vscode-layout-demo";

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
    id: "vscode-layout-demo",
    title: "VS Code 布局示例",
    component: <VSCodeLayout />,
    description: "展示如何使用 VSCodeLayout 组件构建完整的 VS Code 风格界面",
    category: "布局组件",
    tags: ["layout", "vscode", "示例", "教程"],
  },
]; 
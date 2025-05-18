import * as React from "react";
import {
  FileText,
  Search,
  GitBranch,
  Bug,
  LayoutGrid,
  Save,
  Eye,
} from "lucide-react";
import { ActivityItemConfig, FileConfig, SidebarViewConfig, CommandPaletteCommandItem } from "./layoutTypes";
import { validateConfig } from "./configValidator";
import {
  ExplorerView,
  SearchView,
  GitView,
  DebugView,
  ExtensionsView,
} from "../views";

// --- Application Configuration ---
const config = {
  activityItems: [
    {
      id: "explorer",
      icon: React.createElement(FileText),
      title: "资源管理器",
      sidebarViewId: "explorer",
    },
    {
      id: "search",
      icon: React.createElement(Search),
      title: "搜索",
      sidebarViewId: "search",
    },
    {
      id: "git",
      icon: React.createElement(GitBranch),
      title: "源代码管理",
      sidebarViewId: "git",
    },
    {
      id: "debug",
      icon: React.createElement(Bug),
      title: "运行和调试",
      sidebarViewId: "debug",
    },
    {
      id: "extensions",
      icon: React.createElement(LayoutGrid),
      title: "扩展",
      sidebarViewId: "extensions",
    },
  ] as ActivityItemConfig[],
  
  initialFiles: [
    {
      id: "welcome",
      name: "欢迎",
      content: "欢迎使用 VSCode 布局示例",
    },
  ] as FileConfig[],

  sidebarViews: [
    {
      id: "explorer",
      title: "资源管理器",
      component: ExplorerView,
    },
    {
      id: "search",
      title: "搜索",
      component: SearchView,
    },
    {
      id: "git",
      title: "源代码管理",
      component: GitView,
    },
    {
      id: "debug",
      title: "运行和调试",
      component: DebugView,
    },
    {
      id: "extensions",
      title: "扩展",
      component: ExtensionsView,
    },
  ] as SidebarViewConfig[],
  
  commands: [
    {
      id: "save",
      type: "command" as const,
      name: "保存文件",
      icon: React.createElement(Save),
      action: () => {
        console.log("保存文件");
      },
    },
    {
      id: "preview",
      type: "command" as const,
      name: "预览文件",
      icon: React.createElement(Eye),
      action: () => {
        console.log("预览文件");
      },
    },
  ] as CommandPaletteCommandItem[],
};

// 验证配置
try {
  validateConfig(config);
} catch (error) {
  console.error("配置验证失败:", error);
  throw error;
}

export const appConfig = config; 
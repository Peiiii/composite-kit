/**
 * 主导出文件
 * 从这里可以导出所有的布局组件、复合组件和钩子
 */

// 导出钩子
export * from "./hooks";

// 从primitive.ts导出，但排除VSCodeLayout
export {
  ActivityBar as ActivityBarPrimitive,
  ActivityBarGroup,
  ActivityBarItem,
  BottomPanel as BottomPanelPrimitive,
  BottomPanelContent,
  BottomPanelTab,
  BottomPanelTabs,
  EditorTab,
  EditorTabs as EditorTabsPrimitive,
  FileExplorer as FileExplorerPrimitive,
  FileExplorerFolder,
  FileExplorerGroup,
  FileExplorerItem,
  Outline as OutlinePrimitive,
  OutlineGroup,
  OutlineItem,
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader
} from "./primitive";

// 从compound.ts导出复合组件
export {
  ActivityBar,
  BottomPanel,
  EditorTabs,
  FileExplorer,
  Outline,
  Sidebar,
  VSCodeLayout
} from "./compound";

// 单独导出并重命名以避免冲突
export { VSCodeLayout as VSCodeLayoutPrimitive } from "./components/vscode-layout";

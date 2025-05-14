/**
 * 主导出文件
 * 从这里可以导出所有的布局组件、复合组件和钩子
 */

// 导出钩子
export * from "./hooks";

// 从primitive.ts导出，但排除VSCodeLayout
export {
  ActivityBar,
  ActivityBarGroup,
  ActivityBarItem,
  BottomPanel,
  BottomPanelContent,
  BottomPanelTab,
  BottomPanelTabs,
  EditorTab,
  EditorTabs,
  FileExplorer,
  FileExplorerFolder,
  FileExplorerGroup,
  FileExplorerItem,
  Outline,
  OutlineGroup,
  OutlineItem,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "./primitive";

// 从compound.ts导出，但排除VSCodeLayout
export {
  ActivityBarCompound,
  BottomPanelCompound,
  EditorTabsCompound,
  SidebarCompound,
} from "./compound";

// 单独导出并重命名以避免冲突
export { VSCodeLayout as VSCodeLayoutPrimitive } from "./components/vscode-layout";
export { VSCodeLayout as VSCodeLayoutCompound } from "./compounds/vscode-layout-compound";

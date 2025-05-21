import {
  WorkspaceLayout,
  LayoutControls,
  MainLayout,
  ActivityBar,
  ActivityItem,
  usePanelControls,
  SidebarLayout,
  WorkspacePanel,
  PanelContent,
  EditorHeader,
  EditorContent,
  StatusBar,
  StatusBarGroup,
  StatusBarItem,
  StatusBarIconItem,
  HorizontalLayout,
  VerticalLayout,
  ResizablePanel,
  ResizeHandle,
  MainContent,
  Tab,
} from "./vscode-layout";

// 基础布局组件
export const Layout = {
  Main: MainLayout,
  MainContent,
  Sidebar: SidebarLayout,
  Horizontal: HorizontalLayout,
  Vertical: VerticalLayout,
  ResizeHandle,
} as const;

// 工作区组件
export const Workspace = {
  Layout: WorkspaceLayout,
  Panel: WorkspacePanel,
} as const;

// 活动栏组件
export const Activity = {
  Bar: ActivityBar,
  Item: ActivityItem,
} as const;

// 编辑器组件
export const Editor = {
  Header: EditorHeader,
  Content: EditorContent,
  Tab,
} as const;

// 面板组件
export const Panel = {
  Resizable: ResizablePanel,
  Content: PanelContent,
} as const;

// 状态栏组件
export const Status = {
  Bar: StatusBar,
  Group: StatusBarGroup,
  Item: StatusBarItem,
  IconItem: StatusBarIconItem,
} as const;

// 控制组件
export const Controls = {
  Layout: LayoutControls,
} as const;

// 工具函数
export const Utils = {
  usePanelControls,
} as const;

// 为了向后兼容，保留原有的导出
export {
  WorkspaceLayout,
  LayoutControls,
  MainLayout,
  ActivityBar,
  ActivityItem,
  usePanelControls,
  SidebarLayout,
  WorkspacePanel,
  PanelContent,
  EditorHeader,
  EditorContent,
  StatusBar,
  StatusBarGroup,
  StatusBarItem,
  StatusBarIconItem,
  HorizontalLayout,
  VerticalLayout,
  ResizablePanel,
  ResizeHandle,
  MainContent,
  Tab,
};

export const VSCodeLayout = {
  Layout,
  Workspace,
  Activity,
  Editor,
  Panel,
  Status,
  Controls,
  Utils,
} as const;

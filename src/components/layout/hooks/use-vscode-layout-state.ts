import * as React from "react";
import { useResizablePanel } from "./use-resizable-panel";

export interface VSCodeLayoutState {
  // 布局可见性状态
  leftSidebarVisible: boolean;
  rightSidebarVisible: boolean;
  bottomPanelVisible: boolean;
  
  // 布局状态切换方法
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  toggleBottomPanel: () => void;
  
  // 面板处理引用
  leftSidebarRef: React.RefObject<any>;
  rightSidebarRef: React.RefObject<any>;
  bottomPanelRef: React.RefObject<any>;
  
  // 面板展开/折叠状态
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
  isBottomPanelCollapsed: boolean;
  
  // 面板展开/折叠切换
  collapseLeftSidebar: () => void;
  expandLeftSidebar: () => void;
  collapseRightSidebar: () => void;
  expandRightSidebar: () => void;
  collapseBottomPanel: () => void;
  expandBottomPanel: () => void;
}

export function useVSCodeLayoutState(): VSCodeLayoutState {
  // 面板可见性状态
  const [leftSidebarVisible, setLeftSidebarVisible] = React.useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = React.useState(true);
  const [bottomPanelVisible, setBottomPanelVisible] = React.useState(true);
  
  // 使用可调整大小面板钩子
  const leftSidebarPanel = useResizablePanel();
  const rightSidebarPanel = useResizablePanel();
  const bottomPanel = useResizablePanel();
  
  // 切换面板可见性的处理函数
  const toggleLeftSidebar = React.useCallback(() => {
    setLeftSidebarVisible(prev => !prev);
  }, []);
  
  const toggleRightSidebar = React.useCallback(() => {
    setRightSidebarVisible(prev => !prev);
  }, []);
  
  const toggleBottomPanel = React.useCallback(() => {
    setBottomPanelVisible(prev => !prev);
  }, []);
  
  return {
    // 可见性状态
    leftSidebarVisible,
    rightSidebarVisible,
    bottomPanelVisible,
    
    // 切换可见性
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleBottomPanel,
    
    // 面板引用
    leftSidebarRef: leftSidebarPanel.ref,
    rightSidebarRef: rightSidebarPanel.ref,
    bottomPanelRef: bottomPanel.ref,
    
    // 折叠状态
    isLeftSidebarCollapsed: leftSidebarPanel.isCollapsed,
    isRightSidebarCollapsed: rightSidebarPanel.isCollapsed,
    isBottomPanelCollapsed: bottomPanel.isCollapsed,
    
    // 折叠/展开操作
    collapseLeftSidebar: leftSidebarPanel.handleCollapse,
    expandLeftSidebar: leftSidebarPanel.handleExpand,
    collapseRightSidebar: rightSidebarPanel.handleCollapse,
    expandRightSidebar: rightSidebarPanel.handleExpand,
    collapseBottomPanel: bottomPanel.handleCollapse,
    expandBottomPanel: bottomPanel.handleExpand,
  };
} 
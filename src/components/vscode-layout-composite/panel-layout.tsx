import * as React from "react";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { LeftSidebar, LeftSidebarProps } from "./left-sidebar";
import { RightSidebar, RightSidebarProps } from "./right-sidebar";
import { BottomPanel, BottomPanelProps } from "./bottom-panel";
import { MainPanelArea, MainPanelAreaProps } from "./main-panel-area";

export interface PanelLayoutProps {
  /**
   * 左侧边栏属性
   */
  leftSidebarProps?: Omit<LeftSidebarProps, 'className'>;
  /**
   * 是否显示左侧边栏
   */
  showLeftSidebar?: boolean;
  /**
   * 左侧边栏类名
   */
  leftSidebarClassName?: string;
  /**
   * 右侧边栏属性
   */
  rightSidebarProps?: Omit<RightSidebarProps, 'className'>;
  /**
   * 是否显示右侧边栏
   */
  showRightSidebar?: boolean;
  /**
   * 右侧边栏类名
   */
  rightSidebarClassName?: string;
  /**
   * 底部面板属性
   */
  bottomPanelProps?: Omit<BottomPanelProps, 'className'>;
  /**
   * 是否显示底部面板
   */
  showBottomPanel?: boolean;
  /**
   * 底部面板类名
   */
  bottomPanelClassName?: string;
  /**
   * 主面板区域属性
   */
  mainPanelAreaProps: Omit<MainPanelAreaProps, 'className' | 'bottomPanel'>;
  /**
   * 主面板区域类名
   */
  mainPanelAreaClassName?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 面板分隔线类名
   */
  resizeHandleClassName?: string;
  /**
   * 是否集成底部面板到主面板区域
   */
  integrateBottomPanel?: boolean;
}

/**
 * VSCode风格的面板布局组件
 */
export function PanelLayout({
  leftSidebarProps,
  showLeftSidebar = true,
  leftSidebarClassName,
  rightSidebarProps,
  showRightSidebar = true,
  rightSidebarClassName,
  bottomPanelProps,
  showBottomPanel = true,
  bottomPanelClassName,
  mainPanelAreaProps,
  mainPanelAreaClassName,
  className = "",
  resizeHandleClassName = "w-1 bg-gray-200 hover:bg-blue-500 relative group",
  integrateBottomPanel = true,
}: PanelLayoutProps) {
  // 渲染水平方向的面板分隔线
  const renderHorizontalResizeHandle = () => (
    <PanelResizeHandle className={resizeHandleClassName}>
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </PanelResizeHandle>
  );
  
  // 渲染底部面板
  const renderBottomPanel = () => {
    if (!showBottomPanel || !bottomPanelProps) return null;
    
    return (
      <BottomPanel
        {...bottomPanelProps}
        className={bottomPanelClassName}
      />
    );
  };
  
  // 渲染主面板区域
  const renderMainPanelArea = () => {
    // 如果需要集成底部面板到主面板，则传入底部面板组件
    const bottomPanel = integrateBottomPanel ? renderBottomPanel() : undefined;
    
    return (
      <MainPanelArea
        {...mainPanelAreaProps}
        className={mainPanelAreaClassName}
        bottomPanel={bottomPanel}
      />
    );
  };

  return (
    <div className={`h-full flex-1 overflow-hidden ${className}`}>
      <PanelGroup direction="horizontal" className="h-full">
        {/* 左侧边栏 */}
        {showLeftSidebar && leftSidebarProps && (
          <>
            <LeftSidebar 
              {...leftSidebarProps}
              className={leftSidebarClassName}
            />
            {renderHorizontalResizeHandle()}
          </>
        )}
        
        {/* 主内容区域 */}
        <PanelGroup direction="vertical" className="h-full">
          {/* 主面板区域 */}
          <div className="h-full flex-1 overflow-hidden">
            {renderMainPanelArea()}
          </div>
          
          {/* 底部面板（如果不集成到主面板） */}
          {!integrateBottomPanel && showBottomPanel && bottomPanelProps && (
            <>
              <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-blue-500 relative group">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </PanelResizeHandle>
              {renderBottomPanel()}
            </>
          )}
        </PanelGroup>
        
        {/* 右侧边栏 */}
        {showRightSidebar && rightSidebarProps && (
          <>
            {renderHorizontalResizeHandle()}
            <RightSidebar 
              {...rightSidebarProps}
              className={rightSidebarClassName}
            />
          </>
        )}
      </PanelGroup>
    </div>
  );
} 
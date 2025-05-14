import * as React from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import { usePanelState } from "@/demos/vscode-layout-v2/components/use-panel-state";

export interface VSCodeLayoutProps {
  className?: string;
  leftSidebar?: {
    content: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
  };
  rightSidebar?: {
    content: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
  };
  bottomPanel?: {
    content: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
  };
  mainContent: React.ReactNode;
  activityBar?: React.ReactNode;
}

export function VSCodeLayout({
  className,
  leftSidebar,
  rightSidebar,
  bottomPanel,
  mainContent,
  activityBar,
}: VSCodeLayoutProps) {
  const leftSidebarState = usePanelState();
  const rightSidebarState = usePanelState();
  const bottomPanelState = usePanelState();

  return (
    <div className={`h-full w-full ${className}`}>
      <div className="h-full w-full rounded-lg border bg-background overflow-hidden flex">
        {/* 左侧活动栏 */}
        {activityBar && (
          <div className="w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0">
            {activityBar}
          </div>
        )}

        {/* 主内容区域 */}
        <div className="flex-1 h-full">
          <PanelGroup direction="horizontal">
            {/* 左侧边栏 */}
            {leftSidebar && (
              <>
                <Panel
                  ref={leftSidebarState.panelRef}
                  defaultSize={leftSidebar.defaultSize ?? 20}
                  minSize={leftSidebar.minSize ?? 15}
                  maxSize={leftSidebar.maxSize ?? 30}
                  collapsible
                  onCollapse={leftSidebarState.collapse}
                  onExpand={leftSidebarState.expand}
                >
                  {leftSidebar.content}
                </Panel>

                <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
              </>
            )}

            {/* 主编辑区 */}
            <Panel defaultSize={60}>
              <PanelGroup direction="vertical">
                {/* 编辑器区域 */}
                <Panel defaultSize={70}>
                  {mainContent}
                </Panel>

                {/* 底部面板 */}
                {bottomPanel && (
                  <>
                    <PanelResizeHandle className="h-1 bg-border hover:bg-primary/20 transition-colors" />

                    <Panel
                      ref={bottomPanelState.panelRef}
                      defaultSize={bottomPanel.defaultSize ?? 30}
                      minSize={bottomPanel.minSize ?? 20}
                      collapsible
                      onCollapse={bottomPanelState.collapse}
                      onExpand={bottomPanelState.expand}
                    >
                      {bottomPanel.content}
                    </Panel>
                  </>
                )}
              </PanelGroup>
            </Panel>

            {/* 右侧边栏 */}
            {rightSidebar && (
              <>
                <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />

                <Panel
                  ref={rightSidebarState.panelRef}
                  defaultSize={rightSidebar.defaultSize ?? 20}
                  minSize={rightSidebar.minSize ?? 15}
                  maxSize={rightSidebar.maxSize ?? 30}
                  collapsible
                  onCollapse={rightSidebarState.collapse}
                  onExpand={rightSidebarState.expand}
                >
                  {rightSidebar.content}
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
    </div>
  );
} 
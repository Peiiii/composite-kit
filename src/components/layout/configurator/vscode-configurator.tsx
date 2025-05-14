import { cn } from "@/lib/utils";
import * as React from "react";
import {
  ActivityBar,
  BottomPanel,
  EditorTabs,
  FileExplorer,
  Outline,
  Sidebar,
  VSCodeLayout,
} from "../compound";
import { useResizablePanel } from "../hooks";
import { VSCodeLayoutState } from "../hooks/use-vscode-layout-state";

// 活动栏项目配置
export interface ActivityBarItemConfig {
  id: string;
  icon: React.ReactNode;
  title: string;
}

// 文件项目配置
export interface FileItemConfig {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: FileItemConfig[];
  content?: string;
}

// 编辑器标签配置
export interface EditorTabConfig {
  id: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

// 大纲项目配置
export interface OutlineItemConfig {
  id: string;
  title: string;
  itemType?: string;
}

// 底部面板标签配置
export interface BottomPanelTabConfig {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode | string;
}

// VSCode配置器属性
export interface VSCodeConfiguratorProps {
  // 活动栏配置
  activityBar?: {
    items: ActivityBarItemConfig[];
    initialActiveItemId?: string;
    className?: string;
  };

  // 左侧边栏配置
  leftSidebar?: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
    title?: string;
    content?: React.ReactNode;
    // 文件浏览器配置
    fileExplorer?: {
      title?: string;
      files: FileItemConfig[];
      className?: string;
    };
  };

  // 右侧边栏配置
  rightSidebar?: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
    title?: string;
    content?: React.ReactNode;
    // 大纲配置
    outline?: {
      title?: string;
      items: OutlineItemConfig[];
      className?: string;
    };
  };

  // 编辑器区域配置
  editor?: {
    tabs: EditorTabConfig[];
    initialActiveTabId?: string;
    className?: string;
  };

  // 底部面板配置
  bottomPanel?: {
    defaultSize?: number;
    minSize?: number;
    tabs: BottomPanelTabConfig[];
    initialActiveTabId?: string;
    className?: string;
  };

  // 根布局配置
  rootClassName?: string;
  
  // 布局状态
  layoutState?: VSCodeLayoutState;
}

export function VSCodeConfigurator({
  activityBar,
  leftSidebar,
  rightSidebar,
  editor,
  bottomPanel,
  rootClassName,
  layoutState,
}: VSCodeConfiguratorProps) {
  // 状态管理
  const [activeActivityItem, setActiveActivityItem] = React.useState<string>(
    activityBar?.initialActiveItemId || activityBar?.items?.[0]?.id || ""
  );

  const [activeEditorTab, setActiveEditorTab] = React.useState<string>(
    editor?.initialActiveTabId || editor?.tabs?.[0]?.id || ""
  );

  const [activeBottomTab, setActiveBottomTab] = React.useState<string>(
    bottomPanel?.initialActiveTabId || bottomPanel?.tabs?.[0]?.id || ""
  );

  // 缓存面板配置，以便在隐藏/显示切换时保持状态
  const leftSidebarConfig = React.useRef(leftSidebar);
  const rightSidebarConfig = React.useRef(rightSidebar);
  const bottomPanelConfig = React.useRef(bottomPanel);

  // 当配置变化时更新缓存
  React.useEffect(() => {
    if (leftSidebar) leftSidebarConfig.current = leftSidebar;
  }, [leftSidebar]);

  React.useEffect(() => {
    if (rightSidebar) rightSidebarConfig.current = rightSidebar;
  }, [rightSidebar]);

  React.useEffect(() => {
    if (bottomPanel) bottomPanelConfig.current = bottomPanel;
  }, [bottomPanel]);

  // 使用Hook管理可调整大小的面板
  const leftPanelState = layoutState ? { ref: layoutState.leftSidebarRef, toggle: layoutState.isLeftSidebarCollapsed ? layoutState.expandLeftSidebar : layoutState.collapseLeftSidebar } : useResizablePanel();
  const rightPanelState = layoutState ? { ref: layoutState.rightSidebarRef, toggle: layoutState.isRightSidebarCollapsed ? layoutState.expandRightSidebar : layoutState.collapseRightSidebar } : useResizablePanel();
  const bottomPanelState = layoutState ? { ref: layoutState.bottomPanelRef, toggle: layoutState.isBottomPanelCollapsed ? layoutState.expandBottomPanel : layoutState.collapseBottomPanel } : useResizablePanel();

  // 渲染文件树
  const renderFileTree = React.useCallback((files: FileItemConfig[], depth = 0) => {
    return files.map((file) => {
      if (file.isFolder) {
        return (
          <React.Fragment key={file.id}>
            <FileExplorer.Folder>{file.name}</FileExplorer.Folder>
            {file.children && file.children.length > 0 && (
              <div className="ml-2">
                {renderFileTree(file.children, depth + 1)}
              </div>
            )}
          </React.Fragment>
        );
      }

      return (
        <FileExplorer.Item
          key={file.id}
          active={activeEditorTab === file.id}
          onClick={() => {
            if (file.content) {
              // 使用requestAnimationFrame延迟执行，避免立即更新状态引起的布局变化
              requestAnimationFrame(() => {
                setActiveEditorTab(file.id);
              });
            }
          }}
        >
          {file.name}
        </FileExplorer.Item>
      );
    });
  }, [activeEditorTab, setActiveEditorTab]); // 仅在这些依赖变化时重新创建函数

  return (
    <div className={cn("h-full w-full", rootClassName)}>
      <VSCodeLayout.Root>
        {/* 活动栏 */}
        {activityBar && activityBar.items.length > 0 && (
          <VSCodeLayout.ActivityBar className={activityBar.className}>
            <ActivityBar.Root>
              <ActivityBar.Group>
                {activityBar.items.map((item) => (
                  <ActivityBar.Item
                    key={item.id}
                    active={activeActivityItem === item.id}
                    icon={item.icon}
                    title={item.title}
                    onClick={() => setActiveActivityItem(item.id)}
                  />
                ))}
              </ActivityBar.Group>
            </ActivityBar.Root>
          </VSCodeLayout.ActivityBar>
        )}

        {/* 主内容区域 */}
        <VSCodeLayout.Main>
          <VSCodeLayout.Horizontal>
            {/* 左侧边栏 */}
            {leftSidebar &&
              (leftSidebar.content || leftSidebar.fileExplorer) && (
                <>
                  <VSCodeLayout.LeftSidebar
                    ref={leftPanelState.ref}
                    defaultSize={leftSidebar.defaultSize}
                    minSize={leftSidebar.minSize}
                    maxSize={leftSidebar.maxSize}
                    className={leftSidebar.className}
                  >
                    <Sidebar.Root
                      position="left"
                      onToggle={leftPanelState.toggle}
                    >
                      <Sidebar.Header>
                        <h3 className="font-semibold text-sm truncate">
                          {leftSidebar.title || "资源管理器"}
                        </h3>
                      </Sidebar.Header>
                      <Sidebar.Content>
                        {leftSidebar.content ||
                          (leftSidebar.fileExplorer && (
                            <FileExplorer.Root>
                              <FileExplorer.Group
                                title={leftSidebar.fileExplorer.title || "文件"}
                              >
                                {renderFileTree(leftSidebar.fileExplorer.files)}
                              </FileExplorer.Group>
                            </FileExplorer.Root>
                          ))}
                      </Sidebar.Content>
                    </Sidebar.Root>
                  </VSCodeLayout.LeftSidebar>
                  <VSCodeLayout.ResizeHandle withHandle />
                </>
              )}

            {/* 主编辑区域 */}
            <VSCodeLayout.Panel>
              <VSCodeLayout.Vertical>
                {/* 编辑器区域 */}
                <VSCodeLayout.Panel>
                  <div className="flex h-full flex-col">
                    {editor && editor.tabs.length > 0 && (
                      <>
                        <EditorTabs.Root>
                          {editor.tabs.map((tab) => (
                            <EditorTabs.Tab
                              key={tab.id}
                              active={activeEditorTab === tab.id}
                              icon={tab.icon}
                              onClick={() => setActiveEditorTab(tab.id)}
                            >
                              {tab.title}
                            </EditorTabs.Tab>
                          ))}
                        </EditorTabs.Root>
                        <div className="flex-1 overflow-auto p-4 bg-muted/10">
                          {editor.tabs.find((tab) => tab.id === activeEditorTab)
                            ?.content && (
                            <pre className="text-xs font-mono">
                              {
                                editor.tabs.find(
                                  (tab) => tab.id === activeEditorTab
                                )?.content
                              }
                            </pre>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </VSCodeLayout.Panel>

                {/* 底部面板 */}
                {bottomPanel && bottomPanel.tabs.length > 0 && (
                  <>
                    <VSCodeLayout.ResizeHandle
                      orientation="horizontal"
                      withHandle
                    />
                    <VSCodeLayout.BottomPanel
                      ref={bottomPanelState.ref}
                      defaultSize={bottomPanel.defaultSize || 25}
                      minSize={bottomPanel.minSize || 10}
                      className={bottomPanel.className}
                    >
                      <BottomPanel.Root>
                        <BottomPanel.Tabs>
                          {bottomPanel.tabs.map((tab) => (
                            <BottomPanel.Tab
                              key={tab.id}
                              active={activeBottomTab === tab.id}
                              icon={tab.icon}
                              onClick={() => setActiveBottomTab(tab.id)}
                            >
                              {tab.title}
                            </BottomPanel.Tab>
                          ))}
                        </BottomPanel.Tabs>
                        <BottomPanel.Content>
                          {activeBottomTab && (
                            <>
                              {typeof bottomPanel.tabs.find(
                                (tab) => tab.id === activeBottomTab
                              )?.content === "string" ? (
                                <pre className="text-xs font-mono text-muted-foreground p-2">
                                  {
                                    bottomPanel.tabs.find(
                                      (tab) => tab.id === activeBottomTab
                                    )?.content as string
                                  }
                                </pre>
                              ) : (
                                bottomPanel.tabs.find(
                                  (tab) => tab.id === activeBottomTab
                                )?.content
                              )}
                            </>
                          )}
                        </BottomPanel.Content>
                      </BottomPanel.Root>
                    </VSCodeLayout.BottomPanel>
                  </>
                )}
              </VSCodeLayout.Vertical>
            </VSCodeLayout.Panel>

            {/* 右侧边栏 */}
            {rightSidebar && (rightSidebar.content || rightSidebar.outline) && (
              <>
                <VSCodeLayout.ResizeHandle withHandle />
                <VSCodeLayout.RightSidebar
                  ref={rightPanelState.ref}
                  defaultSize={rightSidebar.defaultSize}
                  minSize={rightSidebar.minSize}
                  maxSize={rightSidebar.maxSize}
                  className={rightSidebar.className}
                >
                  <Sidebar.Root
                    position="right"
                    onToggle={rightPanelState.toggle}
                  >
                    <Sidebar.Header>
                      <h3 className="font-semibold text-sm truncate">
                        {rightSidebar.title || "大纲"}
                      </h3>
                    </Sidebar.Header>
                    <Sidebar.Content>
                      {rightSidebar.content ||
                        (rightSidebar.outline && (
                          <Outline.Root>
                            <Outline.Group
                              title={rightSidebar.outline.title || "大纲"}
                            >
                              {rightSidebar.outline.items.map((item) => (
                                <Outline.Item
                                  key={item.id}
                                  itemType={item.itemType}
                                >
                                  {item.title}
                                </Outline.Item>
                              ))}
                            </Outline.Group>
                          </Outline.Root>
                        ))}
                    </Sidebar.Content>
                  </Sidebar.Root>
                </VSCodeLayout.RightSidebar>
              </>
            )}
          </VSCodeLayout.Horizontal>
        </VSCodeLayout.Main>
      </VSCodeLayout.Root>
    </div>
  );
}
 
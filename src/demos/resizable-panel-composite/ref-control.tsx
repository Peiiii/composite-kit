import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes } from "@/components/resizable-panel/hooks/use-panel-sizes";
import type { ResizablePanelRef } from "@/components/resizable-panel/types";
import { ChevronLeft, ChevronRight, FileText, MessageSquare, Settings, Users } from "lucide-react";
import * as React from "react";

export function RefControlDemo() {
  const { onLayout } = usePanelSizes("resizable-panel-ref-control");
  const panelRef = React.useRef<ResizablePanelRef>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string>("");

  const handleToggle = React.useCallback(() => {
    if (panelRef.current) {
      if (isCollapsed) {
        panelRef.current.expand();
      } else {
        panelRef.current.collapse();
      }
      setIsCollapsed(!isCollapsed);
    }
  }, [isCollapsed]);

  const handleExpand = React.useCallback(() => {
    console.log("通过拖拽展开");    
    setLastAction("通过拖拽展开");
    setIsCollapsed(false);
  }, []);

  const handleCollapse = React.useCallback(() => {
    console.log("通过拖拽折叠");    
    setLastAction("通过拖拽折叠");
    setIsCollapsed(true);
  }, []);

  return (
    <div className="h-[600px] w-full p-4">
      <ResizablePanel.Root
        direction="horizontal"
        onLayout={onLayout}
        autoSaveId="resizable-panel-ref-control"
        className="h-full w-full rounded-lg border bg-background"
      >
        <ResizablePanel.Panel
          ref={panelRef}
          defaultSize={30}
          minSize={20}
          collapsible
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        >
          <div className="flex h-full flex-col bg-card border-r">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">侧边栏</h2>
              <button
                onClick={handleToggle}
                className="rounded-md p-1 hover:bg-accent"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <nav className="space-y-1 p-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <button
                    key={i}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                  >
                    {i % 4 === 0 && <FileText className="h-4 w-4" />}
                    {i % 4 === 1 && <MessageSquare className="h-4 w-4" />}
                    {i % 4 === 2 && <Users className="h-4 w-4" />}
                    {i % 4 === 3 && <Settings className="h-4 w-4" />}
                    <span>菜单项 {i + 1}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </ResizablePanel.Panel>
        <ResizablePanel.Handle />
        <ResizablePanel.Panel defaultSize={70}>
          <div className="flex h-full flex-col bg-card">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">主内容区</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">面板状态</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    当前状态: {isCollapsed ? "已折叠" : "已展开"}
                  </p>
                  {lastAction && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      最后操作: {lastAction}
                    </p>
                  )}
                </div>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <h3 className="font-medium">内容卡片 {i + 1}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      这是一个示例内容卡片，展示了如何使用 ref 来控制面板的折叠状态。
                      你可以通过以下方式折叠/展开面板：
                      <ul className="mt-2 list-disc pl-4">
                        <li>点击侧边栏右上角的按钮</li>
                        <li>拖拽分隔线</li>
                      </ul>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel.Panel>
      </ResizablePanel.Root>
    </div>
  );
} 
import * as React from "react";
import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes } from "@/components/resizable-panel/hooks/use-panel-sizes";
import type { ResizablePanelRef } from "@/components/resizable-panel/types";
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  Users, 
  Search,
  LayoutList,
  PanelLeftClose,
  PanelRightClose
} from "lucide-react";

export function ThreeColumnDemo() {
  const { onLayout } = usePanelSizes("resizable-panel-three-column");
  const leftPanelRef = React.useRef<ResizablePanelRef>(null);
  const rightPanelRef = React.useRef<ResizablePanelRef>(null);
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [rightCollapsed, setRightCollapsed] = React.useState(false);

  const handleLeftToggle = React.useCallback(() => {
    if (leftPanelRef.current) {
      if (leftCollapsed) {
        leftPanelRef.current.expand();
      } else {
        leftPanelRef.current.collapse();
      }
      setLeftCollapsed(!leftCollapsed);
    }
  }, [leftCollapsed]);

  const handleRightToggle = React.useCallback(() => {
    if (rightPanelRef.current) {
      if (rightCollapsed) {
        rightPanelRef.current.expand();
      } else {
        rightPanelRef.current.collapse();
      }
      setRightCollapsed(!rightCollapsed);
    }
  }, [rightCollapsed]);

  const handleLeftExpand = React.useCallback(() => {
    console.log("左侧面板展开");
    setLeftCollapsed(false);
  }, []);

  const handleLeftCollapse = React.useCallback(() => {
    console.log("左侧面板折叠");
    setLeftCollapsed(true);
  }, []);

  const handleRightExpand = React.useCallback(() => {
    console.log("右侧面板展开");
    setRightCollapsed(false);
  }, []);

  const handleRightCollapse = React.useCallback(() => {
    console.log("右侧面板折叠");
    setRightCollapsed(true);
  }, []);

  return (
    <div className="h-[600px] w-full p-4">
      <ResizablePanel.Root
        direction="horizontal"
        onLayout={onLayout}
        autoSaveId="resizable-panel-three-column"
        className="h-full w-full rounded-lg border bg-background"
      >
        {/* 左侧面板 */}
        <ResizablePanel.Panel
          ref={leftPanelRef}
          defaultSize={20}
          minSize={15}
          maxSize={30}
          collapsible
          onExpand={handleLeftExpand}
          onCollapse={handleLeftCollapse}
        >
          <div className="flex h-full flex-col bg-card border-r">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">导航</h2>
              <button
                onClick={handleLeftToggle}
                className="rounded-md p-1 hover:bg-accent"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <nav className="space-y-1 p-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                  >
                    {i % 4 === 0 && <FileText className="h-4 w-4" />}
                    {i % 4 === 1 && <MessageSquare className="h-4 w-4" />}
                    {i % 4 === 2 && <Users className="h-4 w-4" />}
                    {i % 4 === 3 && <Settings className="h-4 w-4" />}
                    <span>导航项 {i + 1}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </ResizablePanel.Panel>

        {/* 左侧与中间面板的分隔条 */}
        <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

        {/* 中间面板 */}
        <ResizablePanel.Panel defaultSize={60}>
          <div className="flex h-full flex-col bg-card">
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">主内容区</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="搜索..."
                    className="rounded-md border border-input pl-8 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <h3 className="font-medium">内容卡片 {i + 1}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      这是一个三栏布局的示例，展示了如何使用 ResizablePanel 组件创建可拖拽的三栏布局。
                      左侧和右侧面板都可以通过拖拽分隔线或点击折叠按钮来调整大小或折叠。
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
                        查看详情
                      </button>
                      <button className="rounded border px-3 py-1 text-sm">
                        编辑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel.Panel>

        {/* 中间与右侧面板的分隔条 */}
        <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

        {/* 右侧面板 */}
        <ResizablePanel.Panel
          ref={rightPanelRef}
          defaultSize={20}
          minSize={15}
          maxSize={30}
          collapsible
          onExpand={handleRightExpand}
          onCollapse={handleRightCollapse}
        >
          <div className="flex h-full flex-col bg-card border-l">
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">详情</h2>
              <button
                onClick={handleRightToggle}
                className="rounded-md p-1 hover:bg-accent"
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="p-4">
                <h3 className="font-medium mb-2">属性面板</h3>
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-1">
                      <label className="text-sm font-medium">属性 {i + 1}</label>
                      <div className="flex items-center rounded-md border px-3 py-2">
                        <LayoutList className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">值 {i + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel.Panel>
      </ResizablePanel.Root>
    </div>
  );
} 
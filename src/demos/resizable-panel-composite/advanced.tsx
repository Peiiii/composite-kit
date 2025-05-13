import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes } from "@/components/resizable-panel/hooks/use-panel-sizes";
import { ChevronLeft, FileText, MessageSquare, Settings, Users } from "lucide-react";

export function AdvancedDemo() {
  const { onLayout } = usePanelSizes("resizable-panel-advanced");

  return (
    <div className="h-[600px] w-full p-4">
      <ResizablePanel.Root
        direction="vertical"
        onLayout={onLayout}
        autoSaveId="resizable-panel-advanced"
        className="h-full w-full rounded-lg border bg-background"
        enableGridSnap
        gridSize={20}
        stepSize={10}
        enableKeyboard
        showDragPreview
      >
        <ResizablePanel.Panel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col bg-card border-r border-b">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">顶部面板</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">系统通知</h3>
                  <p className="text-sm text-muted-foreground">欢迎使用高级面板示例</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">快速操作</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button className="rounded border p-2 text-sm hover:bg-accent">新建文档</button>
                    <button className="rounded border p-2 text-sm hover:bg-accent">导入文件</button>
                    <button className="rounded border p-2 text-sm hover:bg-accent">分享</button>
                    <button className="rounded border p-2 text-sm hover:bg-accent">设置</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel.Panel>
        <ResizablePanel.Handle 
          showDragFeedback 
          dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} 
        />
        <ResizablePanel.Panel defaultSize={50}>
          <ResizablePanel.Root 
            direction="horizontal"
            className="h-full"
          >
            <ResizablePanel.Panel
              defaultSize={30}
              minSize={20}
              collapsible
              showCollapseButton
              collapseButtonIcon={<ChevronLeft className="h-4 w-4" />}
              enableDoubleClickReset
              doubleClickResetSize={30}
            >
              <div className="flex h-full flex-col bg-card border-r">
                <div className="border-b p-4">
                  <h2 className="text-lg font-semibold">侧边栏</h2>
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
            <ResizablePanel.Handle showDragFeedback />
            <ResizablePanel.Panel defaultSize={70}>
              <div className="flex h-full flex-col bg-card">
                <div className="border-b p-4">
                  <h2 className="text-lg font-semibold">主内容区</h2>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="rounded-lg border p-4">
                        <h3 className="font-medium">内容卡片 {i + 1}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          这是一个示例内容卡片，展示了如何在面板中处理长内容。当内容超出面板高度时，
                          面板会自动显示滚动条，而不会影响其他面板的布局。
                        </p>
                        <div className="mt-4 flex gap-2">
                          <button className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
                            操作 1
                          </button>
                          <button className="rounded border px-3 py-1 text-sm">
                            操作 2
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ResizablePanel.Panel>
          </ResizablePanel.Root>
        </ResizablePanel.Panel>
        <ResizablePanel.Handle showDragFeedback />
        <ResizablePanel.Panel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col bg-card border-t">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">底部面板</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="rounded border p-2 text-sm">
                    <div className="font-medium">日志 {i + 1}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date().toLocaleTimeString()} - 系统操作记录
                    </div>
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
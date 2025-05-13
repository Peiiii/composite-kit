import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes } from "@/components/resizable-panel/hooks/use-panel-sizes";

export default function ResizablePanelCompositeDemo() {
  const { onLayout } = usePanelSizes("resizable-panel-demo");

  return (
    <div className="h-full w-full p-4">
      <ResizablePanel.Root
        direction="horizontal"
        onLayout={onLayout}
        autoSaveId="resizable-panel-demo"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel.Panel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">侧边栏</h2>
            </div>
            <div className="flex-1 p-4">
              <p>这是一个可调整大小的侧边栏面板</p>
            </div>
          </div>
        </ResizablePanel.Panel>
        <ResizablePanel.Handle />
        <ResizablePanel.Panel defaultSize={75}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">主内容区</h2>
            </div>
            <div className="flex-1 p-4">
              <p>这是一个可调整大小的主内容面板</p>
            </div>
          </div>
        </ResizablePanel.Panel>
      </ResizablePanel.Root>
    </div>
  );
} 
import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes, useResizablePanel } from "@/components/resizable-panel/hooks";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Code,
  FileText,
  Folder,
  GitBranch,
  Play,
  Search,
  Settings,
  Terminal,
  Users
} from "lucide-react";
import * as React from "react";

/**
 * VS Code风格布局示例 - 活动栏固定，侧边栏内容可折叠
 * 这个示例更准确地模拟VS Code布局行为：
 * 1. 左侧活动栏保持固定宽度，不可折叠
 * 2. 侧边栏内容区域可以折叠/展开
 * 3. 活动栏和侧边栏内容区分离
 */
export function VSCodeActivitySidebarDemo() {
  // 水平和垂直布局的尺寸存储
  const { onLayout: onHorizontalLayout } = usePanelSizes("vscode-activity-sidebar-horizontal");
  const { onLayout: onVerticalLayout } = usePanelSizes("vscode-activity-sidebar-vertical");
  
  // 使用Hook简化侧边栏面板内容区的状态管理
  const sidebarContent = useResizablePanel();
  
  // 使用Hook简化底部面板的状态管理
  const bottomPanel = useResizablePanel();
  
  // 活动标签、文件和活动栏图标状态
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");
  const [activeIcon, setActiveIcon] = React.useState("explorer");

  return (
    <div className="h-[600px] w-full p-4">
      <div className="h-full w-full rounded-lg border bg-background overflow-hidden flex">
        {/* 固定宽度活动栏 */}
        <div className="w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0">
          <button 
            className={`p-2 hover:bg-accent rounded-md mb-2 ${activeIcon === "explorer" ? "bg-accent/30" : ""}`}
            onClick={() => setActiveIcon("explorer")}
          >
            <Folder className="h-5 w-5" />
          </button>
          <button 
            className={`p-2 hover:bg-accent rounded-md mb-2 ${activeIcon === "search" ? "bg-accent/30" : ""}`}
            onClick={() => setActiveIcon("search")}
          >
            <Search className="h-5 w-5" />
          </button>
          <button 
            className={`p-2 hover:bg-accent rounded-md mb-2 ${activeIcon === "git" ? "bg-accent/30" : ""}`}
            onClick={() => setActiveIcon("git")}
          >
            <GitBranch className="h-5 w-5" />
          </button>
          <button 
            className={`p-2 hover:bg-accent rounded-md mb-2 ${activeIcon === "debug" ? "bg-accent/30" : ""}`}
            onClick={() => setActiveIcon("debug")}
          >
            <Play className="h-5 w-5" />
          </button>
          <div className="mt-auto">
            <button className="p-2 hover:bg-accent rounded-md mb-2">
              <Users className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md mb-2">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 可调整大小的内容区域 */}
        <div className="flex-1 h-full flex">
          <ResizablePanel.Root
            direction="horizontal"
            onLayout={onHorizontalLayout}
            autoSaveId="vscode-activity-sidebar-horizontal"
            className="h-full w-full"
          >
            {/* 侧边栏内容区 */}
            <ResizablePanel.Panel
              ref={sidebarContent.ref}
              defaultSize={20}
              minSize={15}
              maxSize={30}
              collapsible
              onExpand={sidebarContent.handleExpand}
              onCollapse={sidebarContent.handleCollapse}
            >
              <div className="h-full flex flex-col border-r">
                <div className="border-b p-2 flex justify-between items-center">
                  <h3 className="font-semibold text-sm">
                    {activeIcon === "explorer" && "资源管理器"}
                    {activeIcon === "search" && "搜索"}
                    {activeIcon === "git" && "源代码管理"}
                    {activeIcon === "debug" && "运行和调试"}
                  </h3>
                  <button
                    onClick={sidebarContent.toggle}
                    className="rounded-md p-1 hover:bg-accent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  {activeIcon === "explorer" && (
                    <div className="p-2">
                      <div className="mb-2">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium">项目</span>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                            <Folder className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>node_modules</span>
                          </div>
                          <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                            <Folder className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>src</span>
                          </div>
                          <div className="ml-2">
                            <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                              <Folder className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>components</span>
                            </div>
                            <div className="ml-2">
                              <div 
                                className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${activeFile === "button.tsx" ? "bg-accent" : "hover:bg-accent"}`}
                                onClick={() => setActiveFile("button.tsx")}
                              >
                                <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>button.tsx</span>
                              </div>
                              <div 
                                className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${activeFile === "index.tsx" ? "bg-accent" : "hover:bg-accent"}`}
                                onClick={() => setActiveFile("index.tsx")}
                              >
                                <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>index.tsx</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                            <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>package.json</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeIcon === "search" && (
                    <div className="p-2">
                      <div className="mb-2">
                        <input
                          type="text"
                          placeholder="搜索"
                          className="w-full px-2 py-1 text-xs border rounded"
                        />
                        <div className="mt-2 text-xs text-muted-foreground">
                          在输入框中输入搜索词以开始搜索
                        </div>
                      </div>
                    </div>
                  )}

                  {activeIcon === "git" && (
                    <div className="p-2">
                      <div className="mb-2 text-xs">
                        <div className="font-medium mb-1">更改</div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>src/components/button.tsx</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeIcon === "debug" && (
                    <div className="p-2 text-xs">
                      <button className="w-full border rounded-sm px-2 py-1 mb-2">
                        运行和调试
                      </button>
                      <div className="mb-1 font-medium">调试配置</div>
                      <div className="ml-2">
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          启动开发服务器
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel.Panel>

            {/* 侧边栏内容区与主编辑区的分隔条 */}
            <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

            {/* 主内容区 - 垂直分割 */}
            <ResizablePanel.Panel defaultSize={80}>
              <ResizablePanel.Root 
                direction="vertical"
                onLayout={onVerticalLayout}
                autoSaveId="vscode-activity-sidebar-vertical"
                className="h-full"
              >
                {/* 编辑器区域 */}
                <ResizablePanel.Panel defaultSize={70}>
                  <div className="flex h-full flex-col">
                    {/* 标签栏 */}
                    <div className="bg-muted/40 border-b flex">
                      <div 
                        className={`px-3 py-1.5 text-xs border-r flex items-center ${activeFile === "index.tsx" ? "bg-background" : ""}`}
                        onClick={() => setActiveFile("index.tsx")}
                      >
                        <FileText className="h-3 w-3 mr-1.5" />
                        index.tsx
                      </div>
                      <div 
                        className={`px-3 py-1.5 text-xs border-r flex items-center ${activeFile === "button.tsx" ? "bg-background" : ""}`}
                        onClick={() => setActiveFile("button.tsx")}
                      >
                        <FileText className="h-3 w-3 mr-1.5" />
                        button.tsx
                      </div>
                    </div>
                    
                    {/* 编辑器内容 */}
                    <div className="flex-1 overflow-auto p-4 bg-muted/10">
                      {activeFile === "index.tsx" ? (
                        <pre className="text-xs font-mono">
{`import * as React from "react";
import { Button } from "./button";

export function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        My Application
      </h1>
      <Button>Click Me</Button>
    </div>
  );
}`}
                        </pre>
                      ) : (
                        <pre className="text-xs font-mono">
{`import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "default",
  size = "md",
}: ButtonProps) {
  return (
    <button
      className={\`
        rounded font-medium
        \${variant === "default" ? "bg-primary text-white" : ""}
        \${variant === "outline" ? "border border-primary" : ""}
        \${variant === "ghost" ? "bg-transparent hover:bg-muted" : ""}
        \${size === "sm" ? "text-xs px-2 py-1" : ""}
        \${size === "md" ? "text-sm px-3 py-1.5" : ""}
        \${size === "lg" ? "text-base px-4 py-2" : ""}
      \`}
    >
      {children}
    </button>
  );
}`}
                        </pre>
                      )}
                    </div>
                  </div>
                </ResizablePanel.Panel>

                {/* 编辑器与底部面板的分隔条 */}
                <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

                {/* 底部面板 */}
                <ResizablePanel.Panel 
                  ref={bottomPanel.ref}
                  defaultSize={30}
                  minSize={20}
                  collapsible
                  onExpand={bottomPanel.handleExpand}
                  onCollapse={bottomPanel.handleCollapse}
                >
                  <div className="flex h-full flex-col border-t">
                    <div className="bg-muted/40 border-b flex justify-between items-center">
                      <div className="flex">
                        <button 
                          className={`px-3 py-1.5 text-xs border-r flex items-center ${activeTab === "terminal" ? "bg-background" : ""}`}
                          onClick={() => setActiveTab("terminal")}
                        >
                          <Terminal className="h-3 w-3 mr-1.5" />
                          终端
                        </button>
                        <button 
                          className={`px-3 py-1.5 text-xs border-r flex items-center ${activeTab === "output" ? "bg-background" : ""}`}
                          onClick={() => setActiveTab("output")}
                        >
                          <Code className="h-3 w-3 mr-1.5" />
                          输出
                        </button>
                      </div>
                      <button
                        onClick={bottomPanel.toggle}
                        className="px-2 py-1 hover:bg-accent"
                      >
                        {bottomPanel.isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto bg-muted/10 p-2">
                      {activeTab === "terminal" && (
                        <pre className="text-xs font-mono text-muted-foreground">
{`$ npm start
> my-app@0.1.0 start
> react-scripts start

Starting the development server...

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000`}
                        </pre>
                      )}
                      {activeTab === "output" && (
                        <pre className="text-xs font-mono text-muted-foreground">
{`[Info  - 10:42:35] Starting TypeScript server
[Info  - 10:42:36] TypeScript server started
[Info  - 10:42:38] Project root: /Users/user/Projects/my-app
[Info  - 10:42:39] Using tsconfig.json from project root
[Info  - 10:42:40] No errors found in project`}
                        </pre>
                      )}
                    </div>
                  </div>
                </ResizablePanel.Panel>
              </ResizablePanel.Root>
            </ResizablePanel.Panel>
          </ResizablePanel.Root>
        </div>
      </div>
    </div>
  );
} 
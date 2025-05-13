import * as React from "react";
import { ResizablePanel } from "@/components/resizable-panel/composite";
import { usePanelSizes, useResizablePanel } from "@/components/resizable-panel/hooks";
import { 
  FileText, 
  Code,
  Terminal,
  Search,
  Server,
  GitBranch,
  Settings,
  Play,
  Folder,
  FileBadge,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from "lucide-react";

export function VSCodeLayoutSimplifiedDemo() {
  const { onLayout: onHorizontalLayout } = usePanelSizes("vscode-horizontal-layout-simplified");
  const { onLayout: onVerticalLayout } = usePanelSizes("vscode-vertical-layout-simplified");
  
  // 使用Hook简化侧边栏面板的状态管理
  const sidebar = useResizablePanel();
  
  // 使用Hook简化底部面板的状态管理
  const bottomPanel = useResizablePanel();
  
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");

  return (
    <div className="h-[600px] w-full p-4">
      <ResizablePanel.Root
        direction="horizontal"
        onLayout={onHorizontalLayout}
        autoSaveId="vscode-horizontal-layout-simplified"
        className="h-full w-full rounded-lg border bg-background overflow-hidden"
      >
        {/* 左侧活动栏 + 侧边栏 */}
        <ResizablePanel.Panel
          ref={sidebar.ref}
          defaultSize={20}
          minSize={15}
          maxSize={35}
          collapsible
          onExpand={sidebar.handleExpand}
          onCollapse={sidebar.handleCollapse}
        >
          <div className="flex h-full">
            {/* 活动栏 */}
            <div className="w-12 h-full bg-muted flex flex-col items-center py-2 border-r">
              <button className="p-2 hover:bg-accent rounded-md mb-2">
                <FileBadge className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md mb-2 bg-accent/30">
                <Folder className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md mb-2">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md mb-2">
                <GitBranch className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md mb-2">
                <Server className="h-5 w-5" />
              </button>
              <div className="mt-auto">
                <button className="p-2 hover:bg-accent rounded-md mb-2">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 侧边栏内容 */}
            <div className="flex-1 h-full flex flex-col border-r">
              <div className="border-b p-2 flex justify-between items-center">
                <h3 className="font-semibold text-sm">资源管理器</h3>
                <button
                  onClick={sidebar.toggle}
                  className="rounded-md p-1 hover:bg-accent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-2">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">项目</span>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                        <Folder className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>node_modules</span>
                      </div>
                      <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                        <Folder className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>public</span>
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
                      <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                        <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>tsconfig.json</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel.Panel>

        {/* 左侧与主编辑区的分隔条 */}
        <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

        {/* 主内容区 - 垂直分割 */}
        <ResizablePanel.Panel defaultSize={80}>
          <ResizablePanel.Root 
            direction="vertical"
            onLayout={onVerticalLayout}
            autoSaveId="vscode-vertical-layout-simplified"
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

            {/* 编辑器和底部面板的分隔条 */}
            <ResizablePanel.Handle showDragFeedback dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }} />

            {/* 底部面板（终端、问题、输出等） */}
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
                    <button 
                      className={`px-3 py-1.5 text-xs border-r flex items-center ${activeTab === "debug" ? "bg-background" : ""}`}
                      onClick={() => setActiveTab("debug")}
                    >
                      <Play className="h-3 w-3 mr-1.5" />
                      调试
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
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully`}
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
                  {activeTab === "debug" && (
                    <div className="text-xs text-muted-foreground p-2">
                      <p>没有活动的调试会话</p>
                      <button className="mt-2 border rounded px-2 py-1 hover:bg-accent">
                        启动调试
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel.Panel>
          </ResizablePanel.Root>
        </ResizablePanel.Panel>
      </ResizablePanel.Root>
    </div>
  );
} 
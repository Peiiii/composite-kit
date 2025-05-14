import * as React from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import {
  Folder,
  Search,
  GitBranch,
  Play,
  LayoutGrid,
  Users,
  Settings,
  FileText,
  Terminal,
  Code,
  Info,
  BookOpen,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { usePanelState } from "./use-panel-state";

interface VSCodeLayoutProps {
  className?: string;
}

export function VSCodeLayout({ className }: VSCodeLayoutProps) {
  const leftSidebar = usePanelState();
  const rightSidebar = usePanelState();
  const bottomPanel = usePanelState();
  const [activeLeftIcon, setActiveLeftIcon] = React.useState("explorer");
  const [activeRightIcon, setActiveRightIcon] = React.useState("outline");
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");

  return (
    <div className={`h-[600px] w-full p-4 ${className}`}>
      <div className="h-full w-full rounded-lg border bg-background overflow-hidden flex">
        {/* 左侧活动栏 */}
        <div className="w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0">
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              activeLeftIcon === "explorer" ? "bg-accent/30" : ""
            }`}
            onClick={() => setActiveLeftIcon("explorer")}
          >
            <Folder className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              activeLeftIcon === "search" ? "bg-accent/30" : ""
            }`}
            onClick={() => setActiveLeftIcon("search")}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              activeLeftIcon === "git" ? "bg-accent/30" : ""
            }`}
            onClick={() => setActiveLeftIcon("git")}
          >
            <GitBranch className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              activeLeftIcon === "debug" ? "bg-accent/30" : ""
            }`}
            onClick={() => setActiveLeftIcon("debug")}
          >
            <Play className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              activeLeftIcon === "extensions" ? "bg-accent/30" : ""
            }`}
            onClick={() => setActiveLeftIcon("extensions")}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <div className="mt-auto flex flex-col items-center">
            <button className="p-2 hover:bg-accent rounded-md mb-2">
              <Users className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md mb-2">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 h-full">
          <PanelGroup direction="horizontal">
            {/* 左侧边栏 */}
            <Panel
              ref={leftSidebar.panelRef}
              defaultSize={20}
              minSize={15}
              maxSize={30}
              collapsible
              onCollapse={leftSidebar.collapse}
              onExpand={leftSidebar.expand}
            >
              <div className="h-full flex flex-col border-r">
                <div className="border-b p-2 flex justify-between items-center">
                  <h3 className="font-semibold text-sm">
                    {activeLeftIcon === "explorer" && "资源管理器"}
                    {activeLeftIcon === "search" && "搜索"}
                    {activeLeftIcon === "git" && "源代码管理"}
                    {activeLeftIcon === "debug" && "运行和调试"}
                    {activeLeftIcon === "extensions" && "扩展"}
                  </h3>
                  <button
                    onClick={leftSidebar.toggle}
                    className="rounded-md p-1 hover:bg-accent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  {/* 左侧边栏内容 */}
                  {activeLeftIcon === "explorer" && (
                    <div className="p-2">
                      <div className="mb-2">
                        <div className="flex items-center mb-1">
                          <ChevronDown className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">项目</span>
                        </div>
                        <div className="ml-4">
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
                                className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${
                                  activeFile === "button.tsx"
                                    ? "bg-accent"
                                    : "hover:bg-accent"
                                }`}
                                onClick={() => setActiveFile("button.tsx")}
                              >
                                <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>button.tsx</span>
                              </div>
                              <div
                                className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${
                                  activeFile === "index.tsx"
                                    ? "bg-accent"
                                    : "hover:bg-accent"
                                }`}
                                onClick={() => setActiveFile("index.tsx")}
                              >
                                <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>index.tsx</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />

            {/* 主编辑区 */}
            <Panel defaultSize={60}>
              <PanelGroup direction="vertical">
                {/* 编辑器区域 */}
                <Panel defaultSize={70}>
                  <div className="flex h-full flex-col">
                    {/* 标签栏 */}
                    <div className="bg-muted/40 border-b flex">
                      <div
                        className={`px-3 py-1.5 text-xs border-r flex items-center ${
                          activeFile === "index.tsx" ? "bg-background" : ""
                        }`}
                        onClick={() => setActiveFile("index.tsx")}
                      >
                        <FileText className="h-3 w-3 mr-1.5" />
                        index.tsx
                      </div>
                      <div
                        className={`px-3 py-1.5 text-xs border-r flex items-center ${
                          activeFile === "button.tsx" ? "bg-background" : ""
                        }`}
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
                </Panel>

                <PanelResizeHandle className="h-1 bg-border hover:bg-primary/20 transition-colors" />

                {/* 底部面板 */}
                <Panel
                  ref={bottomPanel.panelRef}
                  defaultSize={30}
                  minSize={20}
                  collapsible
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                >
                  <div className="flex h-full flex-col border-t">
                    <div className="bg-muted/40 border-b flex justify-between items-center">
                      <div className="flex">
                        <button
                          className={`px-3 py-1.5 text-xs border-r flex items-center ${
                            activeTab === "terminal" ? "bg-background" : ""
                          }`}
                          onClick={() => setActiveTab("terminal")}
                        >
                          <Terminal className="h-3 w-3 mr-1.5" />
                          终端
                        </button>
                        <button
                          className={`px-3 py-1.5 text-xs border-r flex items-center ${
                            activeTab === "output" ? "bg-background" : ""
                          }`}
                          onClick={() => setActiveTab("output")}
                        >
                          <Code className="h-3 w-3 mr-1.5" />
                          输出
                        </button>
                        <button
                          className={`px-3 py-1.5 text-xs border-r flex items-center ${
                            activeTab === "debug" ? "bg-background" : ""
                          }`}
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
                        {bottomPanel.isCollapsed ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
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
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>

            <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />

            {/* 右侧边栏 */}
            <Panel
              ref={rightSidebar.panelRef}
              defaultSize={20}
              minSize={15}
              maxSize={30}
              collapsible
              onCollapse={rightSidebar.collapse}
              onExpand={rightSidebar.expand}
            >
              <div className="flex h-full">
                <div className="flex-1 h-full flex flex-col border-l">
                  <div className="border-b p-2 flex justify-between items-center">
                    <h3 className="font-semibold text-sm">
                      {activeRightIcon === "outline" && "大纲"}
                      {activeRightIcon === "problems" && "问题"}
                      {activeRightIcon === "docs" && "文档"}
                      {activeRightIcon === "help" && "帮助"}
                    </h3>
                    <div className="flex items-center">
                      <button
                        onClick={rightSidebar.toggle}
                        className="rounded-md p-1 hover:bg-accent"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* 右侧活动栏图标 */}
                  <div className="border-b flex items-center justify-between py-1 px-2">
                    <div className="flex">
                      <button
                        className={`p-1 hover:bg-accent rounded-md mr-1 ${
                          activeRightIcon === "outline" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setActiveRightIcon("outline")}
                      >
                        <Code className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md mr-1 ${
                          activeRightIcon === "problems" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setActiveRightIcon("problems")}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md mr-1 ${
                          activeRightIcon === "docs" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setActiveRightIcon("docs")}
                      >
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md ${
                          activeRightIcon === "help" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setActiveRightIcon("help")}
                      >
                        <CircleHelp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto">
                    {activeRightIcon === "outline" && (
                      <div className="p-2">
                        <div className="text-xs mb-2">
                          <div className="font-medium mb-1">大纲</div>
                          {activeFile === "index.tsx" ? (
                            <div className="ml-2">
                              <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                                <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>App (function)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="ml-2">
                              <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                                <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>ButtonProps (interface)</span>
                              </div>
                              <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                                <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>Button (function)</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
} 
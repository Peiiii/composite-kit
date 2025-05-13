import { ResizablePanel } from "@/components/resizable-panel/composite";
import {
  usePanelSizes,
  useResizablePanel,
} from "@/components/resizable-panel/hooks";
import {
  Beaker,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Code,
  Database,
  FileText,
  Folder,
  GitBranch,
  Info,
  LayoutGrid,
  Play,
  Search,
  Settings,
  Terminal,
  Users,
} from "lucide-react";
import * as React from "react";

export function VSCodeDualSidebarDemo() {
  const { onLayout: onHorizontalLayout } = usePanelSizes(
    "vscode-dual-sidebar-horizontal"
  );
  const { onLayout: onVerticalLayout } = usePanelSizes(
    "vscode-dual-sidebar-vertical"
  );

  // 使用Hook简化左侧边栏内容区的状态管理
  const leftSidebarContent = useResizablePanel();

  // 使用Hook简化右侧边栏面板的状态管理
  const rightSidebar = useResizablePanel();

  // 使用Hook简化底部面板的状态管理
  const bottomPanel = useResizablePanel();

  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");
  const [leftActiveIcon, setLeftActiveIcon] = React.useState("explorer");
  const [rightActiveIcon, setRightActiveIcon] = React.useState("outline");

  return (
    <div className="h-[600px] w-full p-4">
      <div className="h-full w-full rounded-lg border bg-background overflow-hidden flex">
        {/* 固定宽度左侧活动栏 */}
        <div className="w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0">
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              leftActiveIcon === "explorer" ? "bg-accent/30" : ""
            }`}
            onClick={() => setLeftActiveIcon("explorer")}
          >
            <Folder className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              leftActiveIcon === "search" ? "bg-accent/30" : ""
            }`}
            onClick={() => setLeftActiveIcon("search")}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              leftActiveIcon === "git" ? "bg-accent/30" : ""
            }`}
            onClick={() => setLeftActiveIcon("git")}
          >
            <GitBranch className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              leftActiveIcon === "debug" ? "bg-accent/30" : ""
            }`}
            onClick={() => setLeftActiveIcon("debug")}
          >
            <Play className="h-5 w-5" />
          </button>
          <button
            className={`p-2 hover:bg-accent rounded-md mb-2 ${
              leftActiveIcon === "extensions" ? "bg-accent/30" : ""
            }`}
            onClick={() => setLeftActiveIcon("extensions")}
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

        {/* 可调整大小的内容区域 */}
        <div className="flex-1 h-full">
          <ResizablePanel.Root
            direction="horizontal"
            onLayout={onHorizontalLayout}
            autoSaveId="vscode-dual-sidebar-horizontal"
            className="h-full w-full"
          >
            {/* 左侧边栏内容区 */}
            <ResizablePanel.Panel
              ref={leftSidebarContent.ref}
              defaultSize={20}
              minSize={15}
              maxSize={30}
              collapsible
              onExpand={leftSidebarContent.handleExpand}
              onCollapse={leftSidebarContent.handleCollapse}
            >
              <div className="h-full flex flex-col border-r">
                <div className="border-b p-2 flex justify-between items-center">
                  <h3 className="font-semibold text-sm">
                    {leftActiveIcon === "explorer" && "资源管理器"}
                    {leftActiveIcon === "search" && "搜索"}
                    {leftActiveIcon === "git" && "源代码管理"}
                    {leftActiveIcon === "debug" && "运行和调试"}
                    {leftActiveIcon === "extensions" && "扩展"}
                  </h3>
                  <button
                    onClick={leftSidebarContent.toggle}
                    className="rounded-md p-1 hover:bg-accent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  {leftActiveIcon === "explorer" && (
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
                  )}

                  {leftActiveIcon === "search" && (
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

                  {leftActiveIcon === "git" && (
                    <div className="p-2">
                      <div className="mb-2 text-xs">
                        <div className="font-medium mb-1">更改</div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>src/components/button.tsx</span>
                        </div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>package.json</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {leftActiveIcon === "debug" && (
                    <div className="p-2 text-xs">
                      <button className="w-full border rounded-sm px-2 py-1 mb-2">
                        运行和调试
                      </button>
                      <div className="mb-1 font-medium">调试配置</div>
                      <div className="ml-2">
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          启动开发服务器
                        </div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          调试测试
                        </div>
                      </div>
                    </div>
                  )}

                  {leftActiveIcon === "extensions" && (
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="搜索扩展"
                        className="w-full px-2 py-1 text-xs border rounded mb-2"
                      />
                      <div className="text-xs">
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>TypeScript 扩展</span>
                        </div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <Beaker className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>ESLint</span>
                        </div>
                        <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                          <Database className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>Prettier</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel.Panel>

            {/* 左侧侧边栏与主编辑区的分隔条 */}
            <ResizablePanel.Handle
              showDragFeedback
              dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }}
            />

            {/* 中央主内容区 */}
            <ResizablePanel.Panel defaultSize={60}>
              <ResizablePanel.Root
                direction="vertical"
                onLayout={onVerticalLayout}
                autoSaveId="vscode-dual-sidebar-vertical"
                className="h-full"
              >
                {/* 编辑器区域 */}
                <ResizablePanel.Panel defaultSize={70}>
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
                </ResizablePanel.Panel>

                {/* 编辑器和底部面板的分隔条 */}
                <ResizablePanel.Handle
                  showDragFeedback
                  dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }}
                />

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

            {/* 主编辑区与右侧侧边栏的分隔条 */}
            <ResizablePanel.Handle
              showDragFeedback
              dragStyle={{ backgroundColor: "rgba(var(--primary), 0.2)" }}
            />

            {/* 右侧侧边栏 */}
            <ResizablePanel.Panel
              ref={rightSidebar.ref}
              defaultSize={20}
              minSize={15}
              maxSize={30}
              collapsible
              onExpand={rightSidebar.handleExpand}
              onCollapse={rightSidebar.handleCollapse}
            >
              <div className="flex h-full">
                {/* 右侧侧边栏内容 */}
                <div className="flex-1 h-full flex flex-col border-l">
                  <div className="border-b p-2 flex justify-between items-center">
                    <h3 className="font-semibold text-sm">
                      {rightActiveIcon === "outline" && "大纲"}
                      {rightActiveIcon === "problems" && "问题"}
                      {rightActiveIcon === "docs" && "文档"}
                      {rightActiveIcon === "help" && "帮助"}
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
                          rightActiveIcon === "outline" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setRightActiveIcon("outline")}
                      >
                        <Code className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md mr-1 ${
                          rightActiveIcon === "problems" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setRightActiveIcon("problems")}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md mr-1 ${
                          rightActiveIcon === "docs" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setRightActiveIcon("docs")}
                      >
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 hover:bg-accent rounded-md ${
                          rightActiveIcon === "help" ? "bg-accent/30" : ""
                        }`}
                        onClick={() => setRightActiveIcon("help")}
                      >
                        <CircleHelp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto">
                    {rightActiveIcon === "outline" && (
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

                    {rightActiveIcon === "problems" && (
                      <div className="p-2">
                        <div className="text-xs mb-2">
                          <div className="font-medium mb-1">问题 (0)</div>
                          <div className="text-muted-foreground">
                            没有发现错误和警告
                          </div>
                        </div>
                      </div>
                    )}

                    {rightActiveIcon === "docs" && (
                      <div className="p-2">
                        <div className="text-xs mb-2">
                          <div className="font-medium mb-1">文档</div>
                          <div className="ml-2">
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>React 文档</span>
                            </div>
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>TypeScript 手册</span>
                            </div>
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>VS Code 快捷键</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {rightActiveIcon === "help" && (
                      <div className="p-2">
                        <div className="text-xs mb-2">
                          <div className="font-medium mb-1">帮助</div>
                          <div className="ml-2">
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <CircleHelp className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>获取支持</span>
                            </div>
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <CircleHelp className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>常见问题</span>
                            </div>
                            <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                              <CircleHelp className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>报告问题</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ResizablePanel.Panel>
          </ResizablePanel.Root>
        </div>
      </div>
    </div>
  );
}

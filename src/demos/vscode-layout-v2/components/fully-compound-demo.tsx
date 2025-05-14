import {
    ActivityBar,
    BottomPanel,
    EditorTabs,
    FileExplorer,
    Outline,
    Sidebar,
    VSCodeLayout,
} from "@/components/layout/compound";
import { useResizablePanel } from "@/components/layout/hooks";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Code,
    FileText,
    Folder,
    GitBranch,
    LayoutGrid,
    Play,
    Search,
    Settings,
    Terminal,
    Users
} from "lucide-react";
import * as React from "react";

export function FullyCompoundDemo() {
  const [activeLeftIcon, setActiveLeftIcon] = React.useState("explorer");
  const [activeRightIcon, setActiveRightIcon] = React.useState("outline");
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");
  
  // 使用Hook简化左侧边栏内容区的状态管理
  const leftSidebar = useResizablePanel();
  
  // 使用Hook简化右侧边栏面板的状态管理
  const rightSidebar = useResizablePanel();
  
  // 使用Hook简化底部面板的状态管理
  const bottomPanel = useResizablePanel();

  return (
    <div className="flex flex-col h-[650px] w-full gap-4">
      {/* 添加控制按钮区域 */}
      <div className="px-4 flex gap-2">
        <button 
          className="px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80 flex items-center gap-1"
          onClick={leftSidebar.isCollapsed ? leftSidebar.handleExpand : leftSidebar.handleCollapse}
        >
          {leftSidebar.isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {leftSidebar.isCollapsed ? "展开左侧边栏" : "折叠左侧边栏"}
        </button>
        <button 
          className="px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80 flex items-center gap-1"
          onClick={rightSidebar.isCollapsed ? rightSidebar.handleExpand : rightSidebar.handleCollapse}
        >
          {rightSidebar.isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {rightSidebar.isCollapsed ? "展开右侧边栏" : "折叠右侧边栏"}
        </button>
        <button 
          className="px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80 flex items-center gap-1"
          onClick={bottomPanel.isCollapsed ? bottomPanel.handleExpand : bottomPanel.handleCollapse}
        >
          {bottomPanel.isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {bottomPanel.isCollapsed ? "展开底部面板" : "折叠底部面板"}
        </button>
      </div>
    
      <div className="flex-1 p-4">
        <VSCodeLayout.Root>
          {/* 左侧活动栏 */}
          <VSCodeLayout.ActivityBar>
            <ActivityBar.Root>
              <ActivityBar.Group>
                <ActivityBar.Item
                  active={activeLeftIcon === "explorer"}
                  icon={<Folder className="h-5 w-5" />}
                  onClick={() => setActiveLeftIcon("explorer")}
                />
                <ActivityBar.Item
                  active={activeLeftIcon === "search"}
                  icon={<Search className="h-5 w-5" />}
                  onClick={() => setActiveLeftIcon("search")}
                />
                <ActivityBar.Item
                  active={activeLeftIcon === "git"}
                  icon={<GitBranch className="h-5 w-5" />}
                  onClick={() => setActiveLeftIcon("git")}
                />
                <ActivityBar.Item
                  active={activeLeftIcon === "debug"}
                  icon={<Play className="h-5 w-5" />}
                  onClick={() => setActiveLeftIcon("debug")}
                />
                <ActivityBar.Item
                  active={activeLeftIcon === "extensions"}
                  icon={<LayoutGrid className="h-5 w-5" />}
                  onClick={() => setActiveLeftIcon("extensions")}
                />
              </ActivityBar.Group>
              <ActivityBar.Group className="mt-auto">
                <ActivityBar.Item icon={<Users className="h-5 w-5" />} />
                <ActivityBar.Item icon={<Settings className="h-5 w-5" />} />
              </ActivityBar.Group>
            </ActivityBar.Root>
          </VSCodeLayout.ActivityBar>

          {/* 主内容区域 */}
          <VSCodeLayout.Main>
            <VSCodeLayout.Horizontal>
              {/* 左侧边栏 */}
              <VSCodeLayout.LeftSidebar ref={leftSidebar.ref}>
                <Sidebar.Root position="left" onToggle={leftSidebar.toggle}>
                  <Sidebar.Header>
                    <h3 className="font-semibold text-sm truncate">
                      {activeLeftIcon === "explorer" && "资源管理器"}
                      {activeLeftIcon === "search" && "搜索"}
                      {activeLeftIcon === "git" && "源代码管理"}
                      {activeLeftIcon === "debug" && "运行和调试"}
                      {activeLeftIcon === "extensions" && "扩展"}
                    </h3>
                  </Sidebar.Header>
                  <Sidebar.Content>
                    {activeLeftIcon === "explorer" && (
                      <FileExplorer.Root>
                        <FileExplorer.Group title="项目">
                          <FileExplorer.Folder>src</FileExplorer.Folder>
                          <div className="ml-2">
                            <FileExplorer.Folder>components</FileExplorer.Folder>
                            <div className="ml-2">
                              <FileExplorer.Item
                                active={activeFile === "button.tsx"}
                                onClick={() => setActiveFile("button.tsx")}
                              >
                                button.tsx
                              </FileExplorer.Item>
                              <FileExplorer.Item
                                active={activeFile === "index.tsx"}
                                onClick={() => setActiveFile("index.tsx")}
                              >
                                index.tsx
                              </FileExplorer.Item>
                            </div>
                          </div>
                        </FileExplorer.Group>
                      </FileExplorer.Root>
                    )}
                  </Sidebar.Content>
                </Sidebar.Root>
              </VSCodeLayout.LeftSidebar>

              <VSCodeLayout.ResizeHandle withHandle />

              {/* 主编辑区域 */}
              <VSCodeLayout.Panel>
                <VSCodeLayout.Vertical>
                  {/* 编辑器区域 */}
                  <VSCodeLayout.Panel>
                    <div className="flex h-full flex-col">
                      <EditorTabs.Root>
                        <EditorTabs.Tab
                          active={activeFile === "index.tsx"}
                          icon={<FileText className="h-3 w-3" />}
                          onClick={() => setActiveFile("index.tsx")}
                        >
                          index.tsx
                        </EditorTabs.Tab>
                        <EditorTabs.Tab
                          active={activeFile === "button.tsx"}
                          icon={<FileText className="h-3 w-3" />}
                          onClick={() => setActiveFile("button.tsx")}
                        >
                          button.tsx
                        </EditorTabs.Tab>
                      </EditorTabs.Root>

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
                  </VSCodeLayout.Panel>

                  <VSCodeLayout.ResizeHandle orientation="horizontal" withHandle />

                  {/* 底部面板 */}
                  <VSCodeLayout.BottomPanel ref={bottomPanel.ref}>
                    <BottomPanel.Root>
                      <BottomPanel.Tabs>
                        <BottomPanel.Tab
                          active={activeTab === "terminal"}
                          icon={<Terminal className="h-3 w-3" />}
                          onClick={() => setActiveTab("terminal")}
                        >
                          终端
                        </BottomPanel.Tab>
                        <BottomPanel.Tab
                          active={activeTab === "output"}
                          icon={<Code className="h-3 w-3" />}
                          onClick={() => setActiveTab("output")}
                        >
                          输出
                        </BottomPanel.Tab>
                        <BottomPanel.Tab
                          active={activeTab === "debug"}
                          icon={<Play className="h-3 w-3" />}
                          onClick={() => setActiveTab("debug")}
                        >
                          调试
                        </BottomPanel.Tab>
                      </BottomPanel.Tabs>
                      <BottomPanel.Content>
                        {activeTab === "terminal" && (
                          <pre className="text-xs font-mono text-muted-foreground p-2">
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
                      </BottomPanel.Content>
                    </BottomPanel.Root>
                  </VSCodeLayout.BottomPanel>
                </VSCodeLayout.Vertical>
              </VSCodeLayout.Panel>

              <VSCodeLayout.ResizeHandle withHandle />

              {/* 右侧边栏 */}
              <VSCodeLayout.RightSidebar ref={rightSidebar.ref}>
                <Sidebar.Root position="right" onToggle={rightSidebar.toggle}>
                  <Sidebar.Header>
                    <h3 className="font-semibold text-sm truncate">
                      {activeRightIcon === "outline" && "大纲"}
                      {activeRightIcon === "problems" && "问题"}
                      {activeRightIcon === "docs" && "文档"}
                      {activeRightIcon === "help" && "帮助"}
                    </h3>
                  </Sidebar.Header>
                  <Sidebar.Content>
                    {activeRightIcon === "outline" && (
                      <Outline.Root>
                        <Outline.Group title="大纲">
                          {activeFile === "index.tsx" ? (
                            <Outline.Item itemType="function">App</Outline.Item>
                          ) : (
                            <>
                              <Outline.Item itemType="interface">ButtonProps</Outline.Item>
                              <Outline.Item itemType="function">Button</Outline.Item>
                            </>
                          )}
                        </Outline.Group>
                      </Outline.Root>
                    )}
                  </Sidebar.Content>
                </Sidebar.Root>
              </VSCodeLayout.RightSidebar>
            </VSCodeLayout.Horizontal>
          </VSCodeLayout.Main>
        </VSCodeLayout.Root>
      </div>
    </div>
  );
} 
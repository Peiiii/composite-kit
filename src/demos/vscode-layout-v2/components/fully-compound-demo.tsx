import {
    ActivityBarCompound,
    BottomPanelCompound,
    EditorTabsCompound,
    FileExplorer,
    FileExplorerFolder,
    FileExplorerGroup,
    FileExplorerItem,
    Outline,
    OutlineGroup,
    OutlineItem,
    SidebarCompound,
    useResizablePanel,
    VSCodeLayoutCompound,
} from "@/components/layout";
import {
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
    <div className="h-[600px] w-full p-4">
      <VSCodeLayoutCompound.Root>
        {/* 左侧活动栏 */}
        <VSCodeLayoutCompound.ActivityBar>
          <ActivityBarCompound.Root>
            <ActivityBarCompound.Group>
              <ActivityBarCompound.Item
                active={activeLeftIcon === "explorer"}
                icon={<Folder className="h-5 w-5" />}
                onClick={() => setActiveLeftIcon("explorer")}
              />
              <ActivityBarCompound.Item
                active={activeLeftIcon === "search"}
                icon={<Search className="h-5 w-5" />}
                onClick={() => setActiveLeftIcon("search")}
              />
              <ActivityBarCompound.Item
                active={activeLeftIcon === "git"}
                icon={<GitBranch className="h-5 w-5" />}
                onClick={() => setActiveLeftIcon("git")}
              />
              <ActivityBarCompound.Item
                active={activeLeftIcon === "debug"}
                icon={<Play className="h-5 w-5" />}
                onClick={() => setActiveLeftIcon("debug")}
              />
              <ActivityBarCompound.Item
                active={activeLeftIcon === "extensions"}
                icon={<LayoutGrid className="h-5 w-5" />}
                onClick={() => setActiveLeftIcon("extensions")}
              />
            </ActivityBarCompound.Group>
            <ActivityBarCompound.Group className="mt-auto">
              <ActivityBarCompound.Item icon={<Users className="h-5 w-5" />} />
              <ActivityBarCompound.Item icon={<Settings className="h-5 w-5" />} />
            </ActivityBarCompound.Group>
          </ActivityBarCompound.Root>
        </VSCodeLayoutCompound.ActivityBar>

        {/* 主内容区域 */}
        <VSCodeLayoutCompound.Main>
          <VSCodeLayoutCompound.Horizontal>
            {/* 左侧边栏 */}
            <VSCodeLayoutCompound.LeftSidebar ref={leftSidebar.ref}>
              <SidebarCompound.Root position="left" onToggle={leftSidebar.toggle}>
                <SidebarCompound.Header>
                  <h3 className="font-semibold text-sm truncate">
                    {activeLeftIcon === "explorer" && "资源管理器"}
                    {activeLeftIcon === "search" && "搜索"}
                    {activeLeftIcon === "git" && "源代码管理"}
                    {activeLeftIcon === "debug" && "运行和调试"}
                    {activeLeftIcon === "extensions" && "扩展"}
                  </h3>
                </SidebarCompound.Header>
                <SidebarCompound.Content>
                  {activeLeftIcon === "explorer" && (
                    <FileExplorer>
                      <FileExplorerGroup title="项目">
                        <FileExplorerFolder>src</FileExplorerFolder>
                        <div className="ml-2">
                          <FileExplorerFolder>components</FileExplorerFolder>
                          <div className="ml-2">
                            <FileExplorerItem
                              active={activeFile === "button.tsx"}
                              onClick={() => setActiveFile("button.tsx")}
                            >
                              button.tsx
                            </FileExplorerItem>
                            <FileExplorerItem
                              active={activeFile === "index.tsx"}
                              onClick={() => setActiveFile("index.tsx")}
                            >
                              index.tsx
                            </FileExplorerItem>
                          </div>
                        </div>
                      </FileExplorerGroup>
                    </FileExplorer>
                  )}
                </SidebarCompound.Content>
              </SidebarCompound.Root>
            </VSCodeLayoutCompound.LeftSidebar>

            <VSCodeLayoutCompound.ResizeHandle withHandle />

            {/* 主编辑区域 */}
            <VSCodeLayoutCompound.Panel>
              <VSCodeLayoutCompound.Vertical>
                {/* 编辑器区域 */}
                <VSCodeLayoutCompound.Panel>
                  <div className="flex h-full flex-col">
                    <EditorTabsCompound.Root>
                      <EditorTabsCompound.Tab
                        active={activeFile === "index.tsx"}
                        icon={<FileText className="h-3 w-3" />}
                        onClick={() => setActiveFile("index.tsx")}
                      >
                        index.tsx
                      </EditorTabsCompound.Tab>
                      <EditorTabsCompound.Tab
                        active={activeFile === "button.tsx"}
                        icon={<FileText className="h-3 w-3" />}
                        onClick={() => setActiveFile("button.tsx")}
                      >
                        button.tsx
                      </EditorTabsCompound.Tab>
                    </EditorTabsCompound.Root>

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
                </VSCodeLayoutCompound.Panel>

                <VSCodeLayoutCompound.ResizeHandle orientation="horizontal" withHandle />

                {/* 底部面板 */}
                <VSCodeLayoutCompound.BottomPanel ref={bottomPanel.ref}>
                  <BottomPanelCompound.Root>
                    <BottomPanelCompound.Tabs>
                      <BottomPanelCompound.Tab
                        active={activeTab === "terminal"}
                        icon={<Terminal className="h-3 w-3" />}
                        onClick={() => setActiveTab("terminal")}
                      >
                        终端
                      </BottomPanelCompound.Tab>
                      <BottomPanelCompound.Tab
                        active={activeTab === "output"}
                        icon={<Code className="h-3 w-3" />}
                        onClick={() => setActiveTab("output")}
                      >
                        输出
                      </BottomPanelCompound.Tab>
                      <BottomPanelCompound.Tab
                        active={activeTab === "debug"}
                        icon={<Play className="h-3 w-3" />}
                        onClick={() => setActiveTab("debug")}
                      >
                        调试
                      </BottomPanelCompound.Tab>
                    </BottomPanelCompound.Tabs>
                    <BottomPanelCompound.Content>
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
                    </BottomPanelCompound.Content>
                  </BottomPanelCompound.Root>
                </VSCodeLayoutCompound.BottomPanel>
              </VSCodeLayoutCompound.Vertical>
            </VSCodeLayoutCompound.Panel>

            <VSCodeLayoutCompound.ResizeHandle withHandle />

            {/* 右侧边栏 */}
            <VSCodeLayoutCompound.RightSidebar ref={rightSidebar.ref}>
              <SidebarCompound.Root position="right" onToggle={rightSidebar.toggle}>
                <SidebarCompound.Header>
                  <h3 className="font-semibold text-sm truncate">
                    {activeRightIcon === "outline" && "大纲"}
                    {activeRightIcon === "problems" && "问题"}
                    {activeRightIcon === "docs" && "文档"}
                    {activeRightIcon === "help" && "帮助"}
                  </h3>
                </SidebarCompound.Header>
                <SidebarCompound.Content>
                  {activeRightIcon === "outline" && (
                    <Outline>
                      <OutlineGroup title="大纲">
                        {activeFile === "index.tsx" ? (
                          <OutlineItem itemType="function">App</OutlineItem>
                        ) : (
                          <>
                            <OutlineItem itemType="interface">ButtonProps</OutlineItem>
                            <OutlineItem itemType="function">Button</OutlineItem>
                          </>
                        )}
                      </OutlineGroup>
                    </Outline>
                  )}
                </SidebarCompound.Content>
              </SidebarCompound.Root>
            </VSCodeLayoutCompound.RightSidebar>
          </VSCodeLayoutCompound.Horizontal>
        </VSCodeLayoutCompound.Main>
      </VSCodeLayoutCompound.Root>
    </div>
  );
} 
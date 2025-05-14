import * as React from "react";
import { VSCodeConfigurator } from "@/components/layout/configurator/vscode-configurator";
import { useVSCodeLayoutState } from "@/components/layout/hooks";
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
  Maximize2,
  Minimize2,
  PanelBottomOpen,
  Play,
  Search,
  Settings,
  SidebarOpen,
  Terminal,
} from "lucide-react";

// 控制按钮组件
interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

function ControlButton({ icon, label, ...props }: ControlButtonProps) {
  return (
    <button
      className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${
        props.disabled
          ? "bg-muted/40 text-muted-foreground cursor-not-allowed"
          : "bg-muted hover:bg-muted/80"
      }`}
      {...props}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function LayoutControlsDemo() {
  const layoutState = useVSCodeLayoutState();

  return (
    <div className="flex flex-col h-[650px] w-full gap-4">
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-3">VSCode 布局控制演示</h3>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">面板显示/隐藏</h4>
            <div className="flex gap-2">
              <ControlButton
                icon={<SidebarOpen className="h-4 w-4" />}
                label={layoutState.leftSidebarVisible ? "隐藏左侧边栏" : "显示左侧边栏"}
                onClick={layoutState.toggleLeftSidebar}
              />
              <ControlButton
                icon={<SidebarOpen className="h-4 w-4 rotate-180" />}
                label={layoutState.rightSidebarVisible ? "隐藏右侧边栏" : "显示右侧边栏"}
                onClick={layoutState.toggleRightSidebar}
              />
              <ControlButton
                icon={<PanelBottomOpen className="h-4 w-4" />}
                label={layoutState.bottomPanelVisible ? "隐藏底部面板" : "显示底部面板"}
                onClick={layoutState.toggleBottomPanel}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">面板折叠/展开</h4>
            <div className="flex gap-2">
              <ControlButton
                icon={
                  layoutState.isLeftSidebarCollapsed ? 
                  <ChevronRight className="h-4 w-4" /> : 
                  <ChevronLeft className="h-4 w-4" />
                }
                label={layoutState.isLeftSidebarCollapsed ? "展开左侧边栏" : "折叠左侧边栏"}
                onClick={
                  layoutState.isLeftSidebarCollapsed
                    ? layoutState.expandLeftSidebar
                    : layoutState.collapseLeftSidebar
                }
                disabled={!layoutState.leftSidebarVisible}
              />
              <ControlButton
                icon={
                  layoutState.isRightSidebarCollapsed ? 
                  <ChevronLeft className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
                label={layoutState.isRightSidebarCollapsed ? "展开右侧边栏" : "折叠右侧边栏"}
                onClick={
                  layoutState.isRightSidebarCollapsed
                    ? layoutState.expandRightSidebar
                    : layoutState.collapseRightSidebar
                }
                disabled={!layoutState.rightSidebarVisible}
              />
              <ControlButton
                icon={
                  layoutState.isBottomPanelCollapsed ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
                label={layoutState.isBottomPanelCollapsed ? "展开底部面板" : "折叠底部面板"}
                onClick={
                  layoutState.isBottomPanelCollapsed
                    ? layoutState.expandBottomPanel
                    : layoutState.collapseBottomPanel
                }
                disabled={!layoutState.bottomPanelVisible}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">布局预设</h4>
            <div className="flex gap-2">
              <ControlButton
                icon={<Maximize2 className="h-4 w-4" />}
                label="专注模式"
                onClick={() => {
                  layoutState.collapseLeftSidebar();
                  layoutState.collapseRightSidebar();
                  layoutState.collapseBottomPanel();
                }}
              />
              <ControlButton
                icon={<Minimize2 className="h-4 w-4" />}
                label="完整视图"
                onClick={() => {
                  if (layoutState.leftSidebarVisible) layoutState.expandLeftSidebar();
                  if (layoutState.rightSidebarVisible) layoutState.expandRightSidebar();
                  if (layoutState.bottomPanelVisible) layoutState.expandBottomPanel();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4">
        <VSCodeConfigurator
          layoutState={layoutState}
          activityBar={{
            items: [
              { id: "explorer", icon: <Folder className="h-5 w-5" />, title: "资源管理器" },
              { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
              { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
              { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
              { id: "extensions", icon: <LayoutGrid className="h-5 w-5" />, title: "扩展" },
              { id: "settings", icon: <Settings className="h-5 w-5" />, title: "设置" }
            ],
            initialActiveItemId: "explorer"
          }}
          leftSidebar={layoutState.leftSidebarVisible ? {
            defaultSize: 20,
            minSize: 15,
            title: "资源管理器",
            fileExplorer: {
              title: "项目文件",
              files: [
                {
                  id: "src",
                  name: "src",
                  isFolder: true,
                  children: [
                    {
                      id: "components",
                      name: "components",
                      isFolder: true,
                      children: [
                        {
                          id: "button-tsx",
                          name: "Button-With-Long-Name.tsx",
                          content: `import * as React from "react";

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
  // 实现按钮组件
  return (
    <button className="rounded font-medium">
      {children}
    </button>
  );
}`
                        },
                        {
                          id: "layout-tsx",
                          name: "Layout.tsx",
                          content: `import * as React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="h-16 border-b">
        {/* Header content */}
      </header>
      <main>{children}</main>
      <footer className="h-16 border-t">
        {/* Footer content */}
      </footer>
    </div>
  );
}`
                        }
                      ]
                    },
                    {
                      id: "pages",
                      name: "pages",
                      isFolder: true,
                      children: [
                        {
                          id: "index-tsx",
                          name: "index.tsx",
                          content: `import * as React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
        <Button>Get Started</Button>
      </div>
    </Layout>
  );
}`
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          } : undefined}
          rightSidebar={layoutState.rightSidebarVisible ? {
            defaultSize: 20,
            minSize: 15,
            title: "大纲",
            outline: {
              title: "文件结构",
              items: [
                { id: "buttonprops", title: "ButtonProps", itemType: "interface" },
                { id: "button", title: "Button", itemType: "function" },
                { id: "layoutprops", title: "LayoutProps", itemType: "interface" },
                { id: "layout", title: "Layout", itemType: "function" },
                { id: "home", title: "Home", itemType: "function" }
              ]
            }
          } : undefined}
          editor={{
            tabs: [
              {
                id: "button-tsx",
                title: "Button.tsx",
                icon: <FileText className="h-3 w-3" />,
                content: `import * as React from "react";

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
  // 实现按钮组件
  return (
    <button className="rounded font-medium">
      {children}
    </button>
  );
}`
              },
              {
                id: "layout-tsx",
                title: "Layout.tsx",
                icon: <FileText className="h-3 w-3" />,
                content: `import * as React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="h-16 border-b">
        {/* Header content */}
      </header>
      <main>{children}</main>
      <footer className="h-16 border-t">
        {/* Footer content */}
      </footer>
    </div>
  );
}`
              },
              {
                id: "index-tsx",
                title: "index.tsx",
                icon: <FileText className="h-3 w-3" />,
                content: `import * as React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
        <Button>Get Started</Button>
      </div>
    </Layout>
  );
}`
              }
            ],
            initialActiveTabId: "button-tsx"
          }}
          bottomPanel={layoutState.bottomPanelVisible ? {
            defaultSize: 25,
            minSize: 10,
            tabs: [
              {
                id: "terminal",
                title: "终端",
                icon: <Terminal className="h-3 w-3" />,
                content: `$ npm start
> my-app@0.1.0 start
> react-scripts start

Starting the development server...

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully`
              },
              {
                id: "problems",
                title: "问题",
                icon: <Code className="h-3 w-3" />,
                content: "找不到问题。"
              },
              {
                id: "output",
                title: "输出",
                icon: <Code className="h-3 w-3" />,
                content: "[14:25:32] 构建项目完成，无错误。"
              }
            ],
            initialActiveTabId: "terminal"
          } : undefined}
        />
      </div>
    </div>
  );
} 
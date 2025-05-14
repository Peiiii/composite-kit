import { VSCodeLayout } from "@/components/layout/vscode-layout";
import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  Code,
  FileText,
  Folder,
  GitBranch,
  Info,
  LayoutGrid,
  Play,
  Search,
  Settings,
  Terminal,
  Users
} from "lucide-react";
import * as React from "react";

export function VSCodeLayoutDemo() {
  const [activeLeftIcon, setActiveLeftIcon] = React.useState("explorer");
  const [activeRightIcon, setActiveRightIcon] = React.useState("outline");
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");

  // 左侧活动栏
  const activityBar = (
    <>
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
    </>
  );

  // 左侧边栏内容
  const leftSidebarContent = (
    <div className="h-full flex flex-col border-r">
      <div className="border-b p-2 flex justify-between items-center">
        <h3 className="font-semibold text-sm truncate">
          {activeLeftIcon === "explorer" && "资源管理器"}
          {activeLeftIcon === "search" && "搜索"}
          {activeLeftIcon === "git" && "源代码管理"}
          {activeLeftIcon === "debug" && "运行和调试"}
          {activeLeftIcon === "extensions" && "扩展"}
        </h3>
      </div>
      <div className="flex-1 overflow-auto">
        {activeLeftIcon === "explorer" && (
          <div className="p-2">
            <div className="mb-2">
              <div className="flex items-center mb-1">
                <ChevronDown className="h-3 w-3 mr-1 shrink-0" />
                <span className="text-xs font-medium truncate">项目</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                  <Folder className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                  <span className="truncate">src</span>
                </div>
                <div className="ml-2">
                  <div className="flex items-center py-1 text-xs hover:bg-accent rounded px-1 cursor-pointer">
                    <Folder className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                    <span className="truncate">components</span>
                  </div>
                  <div className="ml-2">
                    <div
                      className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${
                        activeFile === "button.tsx" ? "bg-accent" : "hover:bg-accent"
                      }`}
                      onClick={() => setActiveFile("button.tsx")}
                    >
                      <FileText className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                      <span className="truncate">button.tsx</span>
                    </div>
                    <div
                      className={`flex items-center py-1 text-xs rounded px-1 cursor-pointer ${
                        activeFile === "index.tsx" ? "bg-accent" : "hover:bg-accent"
                      }`}
                      onClick={() => setActiveFile("index.tsx")}
                    >
                      <FileText className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                      <span className="truncate">index.tsx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 主内容区
  const mainContent = (
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
  );

  // 底部面板内容
  const bottomPanelContent = (
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
  );

  // 右侧边栏内容
  const rightSidebarContent = (
    <div className="flex h-full">
      <div className="flex-1 h-full flex flex-col border-l">
        <div className="border-b p-2 flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate">
            {activeRightIcon === "outline" && "大纲"}
            {activeRightIcon === "problems" && "问题"}
            {activeRightIcon === "docs" && "文档"}
            {activeRightIcon === "help" && "帮助"}
          </h3>
        </div>

        {/* 右侧活动栏图标 */}
        <div className="border-b flex items-center justify-between py-1 px-2">
          <div className="flex">
            <button
              className={`p-1 hover:bg-accent rounded-md mr-1 shrink-0 ${
                activeRightIcon === "outline" ? "bg-accent/30" : ""
              }`}
              onClick={() => setActiveRightIcon("outline")}
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              className={`p-1 hover:bg-accent rounded-md mr-1 shrink-0 ${
                activeRightIcon === "problems" ? "bg-accent/30" : ""
              }`}
              onClick={() => setActiveRightIcon("problems")}
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              className={`p-1 hover:bg-accent rounded-md mr-1 shrink-0 ${
                activeRightIcon === "docs" ? "bg-accent/30" : ""
              }`}
              onClick={() => setActiveRightIcon("docs")}
            >
              <BookOpen className="h-4 w-4" />
            </button>
            <button
              className={`p-1 hover:bg-accent rounded-md shrink-0 ${
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
                <div className="font-medium mb-1 truncate">大纲</div>
                {activeFile === "index.tsx" ? (
                  <div className="ml-2">
                    <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                      <Code className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                      <span className="truncate">App (function)</span>
                    </div>
                  </div>
                ) : (
                  <div className="ml-2">
                    <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                      <Code className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                      <span className="truncate">ButtonProps (interface)</span>
                    </div>
                    <div className="flex items-center py-1 hover:bg-accent rounded px-1 cursor-pointer">
                      <Code className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                      <span className="truncate">Button (function)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[600px] w-full p-4">
      <VSCodeLayout
        activityBar={activityBar}
        leftSidebar={{
          content: leftSidebarContent,
          defaultSize: 20,
          minSize: 15,
          maxSize: 30,
        }}
        mainContent={mainContent}
        bottomPanel={{
          content: bottomPanelContent,
          defaultSize: 30,
          minSize: 20,
        }}
        rightSidebar={{
          content: rightSidebarContent,
          defaultSize: 20,
          minSize: 15,
          maxSize: 30,
        }}
      />
    </div>
  );
} 
import * as React from "react";
import { VSCodeConfigurator } from "@/components/layout/configurator/vscode-configurator";
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

export function ConfiguratorDemo() {
  return (
    <div className="h-[600px] w-full p-4">
      <VSCodeConfigurator 
        activityBar={{
          items: [
            { id: "explorer", icon: <Folder className="h-5 w-5" />, title: "资源管理器" },
            { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
            { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
            { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
            { id: "extensions", icon: <LayoutGrid className="h-5 w-5" />, title: "扩展" }
          ],
          initialActiveItemId: "explorer"
        }}
        leftSidebar={{
          defaultSize: 20,
          minSize: 15,
          title: "资源管理器",
          fileExplorer: {
            title: "项目",
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
                        name: "button.tsx",
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
}`
                      },
                      {
                        id: "index-tsx",
                        name: "index.tsx",
                        content: `import * as React from "react";
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
}`
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }}
        rightSidebar={{
          defaultSize: 20,
          minSize: 15,
          title: "大纲",
          outline: {
            title: "大纲",
            items: [
              { id: "app", title: "App", itemType: "function" },
              { id: "buttonprops", title: "ButtonProps", itemType: "interface" },
              { id: "button", title: "Button", itemType: "function" }
            ]
          }
        }}
        editor={{
          tabs: [
            {
              id: "button-tsx",
              title: "button.tsx",
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
}`
            },
            {
              id: "index-tsx",
              title: "index.tsx",
              icon: <FileText className="h-3 w-3" />,
              content: `import * as React from "react";
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
}`
            }
          ],
          initialActiveTabId: "button-tsx"
        }}
        bottomPanel={{
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
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully`
            },
            {
              id: "output",
              title: "输出",
              icon: <Code className="h-3 w-3" />,
              content: "Task: npm start completed successfully."
            },
            {
              id: "debug",
              title: "调试",
              icon: <Play className="h-3 w-3" />,
              content: "调试会话已开始。"
            }
          ],
          initialActiveTabId: "terminal"
        }}
      />
    </div>
  );
}
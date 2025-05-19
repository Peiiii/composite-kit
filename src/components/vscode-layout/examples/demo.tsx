import {
  Bell,
  GitBranch as BranchIcon,
  CheckCircle,
  ChevronDown,
  FileText,
  Folder,
  GitBranch,
  LayoutGrid,
  Play,
  Search,
  Wifi,
} from "lucide-react";
import * as React from "react";
import {
  ActivityBar,
  ActivityItem,
  EditorContent,
  EditorHeader,
  HorizontalLayout,
  LayoutControls,
  MainContent,
  MainLayout,
  PanelContent,
  ResizablePanel,
  ResizeHandle,
  SidebarLayout,
  StatusBar,
  StatusBarGroup,
  StatusBarIconItem,
  StatusBarItem,
  Tab,
  usePanelControls,
  VerticalLayout,
  WorkspaceLayout,
  WorkspacePanel,
} from "../vscode-layout";

export function VSCodeLayoutCompoundComponentWorkingOnDemo() {
  // 使用 Hook 管理面板状态
  const leftPanel = usePanelControls();
  const rightPanel = usePanelControls();
  const bottomPanel = usePanelControls();

  const [activeFile, setActiveFile] = React.useState("file1");
  const [activeActivityItem, setActiveActivityItem] =
    React.useState("explorer");

  // 示例文件数据
  const files = [
    {
      id: "file1",
      name: "index.tsx",
      content:
        "export default function Home() {\n  return <div>Hello World</div>;\n}",
    },
    {
      id: "file2",
      name: "Button.tsx",
      content:
        'export function Button({ children }) {\n  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;\n}',
    },
  ];

  // 活动栏数据
  const activityItems = [
    {
      id: "explorer",
      icon: <Folder className="h-5 w-5" />,
      title: "资源管理器",
    },
    { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
    { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
    { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
    {
      id: "extensions",
      icon: <LayoutGrid className="h-5 w-5" />,
      title: "扩展",
    },
  ];

  return (
    <WorkspaceLayout>
      <LayoutControls
        onToggleLeftSidebar={leftPanel.toggle}
        onToggleRightSidebar={rightPanel.toggle}
        onToggleBottomPanel={bottomPanel.toggle}
        isLeftSidebarCollapsed={leftPanel.isCollapsed}
        isRightSidebarCollapsed={rightPanel.isCollapsed}
        isBottomPanelCollapsed={bottomPanel.isCollapsed}
      />
      <MainLayout>
        <ActivityBar>
          {activityItems.map((item) => (
            <ActivityItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              isActive={activeActivityItem === item.id}
              onClick={() => setActiveActivityItem(item.id)}
            />
          ))}
        </ActivityBar>

        <MainContent>
          <HorizontalLayout>
            <SidebarLayout
              ref={leftPanel.ref}
              onCollapse={leftPanel.collapse}
              onExpand={leftPanel.expand}
            >
              <WorkspacePanel
                title="资源管理器"
                isCollapsed={leftPanel.isCollapsed}
                onCollapse={leftPanel.collapse}
                onExpand={leftPanel.expand}
              >
                <PanelContent>
                  {files.map((file) => (
                    <button
                      key={file.id}
                      className={`flex items-center w-full text-sm px-2 py-1 text-left ${
                        activeFile === file.id
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveFile(file.id)}
                    >
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </PanelContent>
              </WorkspacePanel>
            </SidebarLayout>

            <ResizeHandle />

            <ResizablePanel>
              <VerticalLayout>
                <ResizablePanel>
                  <WorkspacePanel>
                    <EditorHeader>
                      {files.map((file) => (
                        <Tab
                          key={file.id}
                          title={file.name}
                          isActive={activeFile === file.id}
                          onClick={() => setActiveFile(file.id)}
                          onClose={() => {
                            if (files.length > 1) {
                              const nextFile = files.find(
                                (f) => f.id !== file.id
                              );
                              if (nextFile) setActiveFile(nextFile.id);
                            }
                          }}
                        />
                      ))}
                    </EditorHeader>
                    <EditorContent>
                      <pre className="text-sm font-mono">
                        {files.find((f) => f.id === activeFile)?.content}
                      </pre>
                    </EditorContent>
                  </WorkspacePanel>
                </ResizablePanel>

                <ResizeHandle orientation="horizontal" />

                <SidebarLayout
                  ref={bottomPanel.ref}
                  defaultSize={25}
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                >
                  <WorkspacePanel
                    title="终端"
                    isCollapsed={bottomPanel.isCollapsed}
                    onCollapse={bottomPanel.collapse}
                    onExpand={bottomPanel.expand}
                  >
                    <PanelContent>
                      <div className="bg-gray-900 text-gray-200">
                        <pre className="text-sm font-mono">
                          $ npm start{"\n"}
                          {">"} project@0.1.0 start{"\n"}
                          {">"} react-scripts start{"\n"}
                          {"\n"}
                          Starting the development server...{"\n"}
                          Compiled successfully!{"\n"}
                          {"\n"}
                          You can now view project in the browser.{"\n"}
                          Local: http://localhost:3000
                        </pre>
                      </div>
                    </PanelContent>
                  </WorkspacePanel>
                </SidebarLayout>
              </VerticalLayout>
            </ResizablePanel>

            <ResizeHandle />

            <SidebarLayout
              ref={rightPanel.ref}
              onCollapse={rightPanel.collapse}
              onExpand={rightPanel.expand}
            >
              <WorkspacePanel
                title="大纲"
                isCollapsed={rightPanel.isCollapsed}
                onCollapse={rightPanel.collapse}
                onExpand={rightPanel.expand}
              >
                <PanelContent>
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-sm font-medium truncate">
                        文件结构
                      </span>
                    </div>
                    <div className="ml-4 flex flex-col gap-1">
                      <div className="flex items-center text-sm text-purple-700">
                        <span>function</span>
                        <span className="ml-2">Button</span>
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <span>interface</span>
                        <span className="ml-2">ButtonProps</span>
                      </div>
                    </div>
                  </div>
                </PanelContent>
              </WorkspacePanel>
            </SidebarLayout>
          </HorizontalLayout>
        </MainContent>
      </MainLayout>

      <StatusBar>
        <StatusBarGroup>
          <StatusBarIconItem
            icon={<BranchIcon className="h-3.5 w-3.5" />}
            label="main"
          />
          <StatusBarIconItem
            icon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}
            label="就绪"
          />
        </StatusBarGroup>
        <StatusBarGroup>
          <StatusBarItem>UTF-8</StatusBarItem>
          <StatusBarItem>TSX</StatusBarItem>
          <StatusBarItem>
            <Wifi className="h-3.5 w-3.5 text-green-500" />
          </StatusBarItem>
          <StatusBarItem>
            <Bell className="h-3.5 w-3.5" />
          </StatusBarItem>
        </StatusBarGroup>
      </StatusBar>
    </WorkspaceLayout>
  );
}

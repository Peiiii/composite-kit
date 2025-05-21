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
  Activity,
  Controls,
  Editor,
  Layout,
  Panel,
  Status,
  Utils,
  Workspace,
} from "..";

export function VSCodeLayoutCompoundComponentNamespaceDemo() {
  // 使用 Hook 管理面板状态
  const leftPanel = Utils.usePanelControls();
  const rightPanel = Utils.usePanelControls();
  const bottomPanel = Utils.usePanelControls();

  const [activeFile, setActiveFile] = React.useState("file1");
  const [activeActivityItem, setActiveActivityItem] =
    React.useState("explorer");
  const [isActivityBarExpanded, setIsActivityBarExpanded] = React.useState(false);

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
    <Workspace.Layout>
      <Controls.Layout
        onToggleLeftSidebar={leftPanel.toggle}
        onToggleRightSidebar={rightPanel.toggle}
        onToggleBottomPanel={bottomPanel.toggle}
        isLeftSidebarCollapsed={leftPanel.isCollapsed}
        isRightSidebarCollapsed={rightPanel.isCollapsed}
        isBottomPanelCollapsed={bottomPanel.isCollapsed}
      />
      <Layout.Main>
        <Activity.Bar
          isExpanded={isActivityBarExpanded}
          onToggle={() => setIsActivityBarExpanded(!isActivityBarExpanded)}
          expandable={true}
        >
          {activityItems.map((item) => (
            <Activity.Item
              key={item.id}
              icon={item.icon}
              title={item.title}
              isActive={activeActivityItem === item.id}
              onClick={() => setActiveActivityItem(item.id)}
              isExpanded={isActivityBarExpanded}
              expandable={true}
            />
          ))}
        </Activity.Bar>

        <Layout.MainContent>
          <Layout.Horizontal>
            <Layout.Sidebar
              ref={leftPanel.ref}
              onCollapse={leftPanel.collapse}
              onExpand={leftPanel.expand}
            >
              <Workspace.Panel
                title="资源管理器"
                isCollapsed={leftPanel.isCollapsed}
                onCollapse={leftPanel.collapse}
                onExpand={leftPanel.expand}
              >
                <Panel.Content>
                  {files.map((file) => (
                    <button
                      key={file.id}
                      className={`flex items-center w-full text-sm px-2 py-1 text-left ${
                        activeFile === file.id
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveFile(file.id)}
                    >
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </Panel.Content>
              </Workspace.Panel>
            </Layout.Sidebar>

            <Layout.ResizeHandle />

            <Panel.Resizable>
              <Layout.Vertical>
                <Panel.Resizable>
                  <Workspace.Panel>
                    <Editor.Header>
                      {files.map((file) => (
                        <Editor.Tab
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
                    </Editor.Header>
                    <Editor.Content>
                      <pre className="text-sm font-mono">
                        {files.find((f) => f.id === activeFile)?.content}
                      </pre>
                    </Editor.Content>
                  </Workspace.Panel>
                </Panel.Resizable>

                <Layout.ResizeHandle orientation="horizontal" />

                <Layout.Sidebar
                  ref={bottomPanel.ref}
                  defaultSize={25}
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                >
                  <Workspace.Panel
                    title="终端"
                    isCollapsed={bottomPanel.isCollapsed}
                    onCollapse={bottomPanel.collapse}
                    onExpand={bottomPanel.expand}
                  >
                    <Panel.Content>
                      <div className="bg-muted text-muted-foreground">
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
                    </Panel.Content>
                  </Workspace.Panel>
                </Layout.Sidebar>
              </Layout.Vertical>
            </Panel.Resizable>

            <Layout.ResizeHandle />

            <Layout.Sidebar
              ref={rightPanel.ref}
              onCollapse={rightPanel.collapse}
              onExpand={rightPanel.expand}
            >
              <Workspace.Panel
                title="大纲"
                isCollapsed={rightPanel.isCollapsed}
                onCollapse={rightPanel.collapse}
                onExpand={rightPanel.expand}
              >
                <Panel.Content>
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-sm font-medium truncate">
                        文件结构
                      </span>
                    </div>
                    <div className="ml-4 flex flex-col gap-1">
                      <div className="flex items-center text-sm text-primary">
                        <span>function</span>
                        <span className="ml-2">Button</span>
                      </div>
                      <div className="flex items-center text-sm text-primary">
                        <span>interface</span>
                        <span className="ml-2">ButtonProps</span>
                      </div>
                    </div>
                  </div>
                </Panel.Content>
              </Workspace.Panel>
            </Layout.Sidebar>
          </Layout.Horizontal>
        </Layout.MainContent>
      </Layout.Main>

      <Status.Bar>
        <Status.Group>
          <Status.IconItem
            icon={<BranchIcon className="h-3.5 w-3.5" />}
            label="main"
          />
          <Status.IconItem
            icon={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}
            label="就绪"
          />
        </Status.Group>
        <Status.Group>
          <Status.Item>UTF-8</Status.Item>
          <Status.Item>TSX</Status.Item>
          <Status.Item>
            <Wifi className="h-3.5 w-3.5 text-green-500" />
          </Status.Item>
          <Status.Item>
            <Bell className="h-3.5 w-3.5" />
          </Status.Item>
        </Status.Group>
      </Status.Bar>
    </Workspace.Layout>
  );
}

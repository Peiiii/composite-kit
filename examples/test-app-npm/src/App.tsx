import * as React from "react";
import { 
  ThemeProvider, 
  ThemeSwitcher,
  VSCodeLayout
} from "composite-kit";
import { Home, Settings, FileText, HelpCircle, GitBranch, Search, Terminal } from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = React.useState("explorer");
  const [isActivityBarExpanded, setIsActivityBarExpanded] = React.useState(true);
  
  // 使用 Hook 管理面板状态
  const leftPanel = VSCodeLayout.usePanelControls();
  const rightPanel = VSCodeLayout.usePanelControls();
  const bottomPanel = VSCodeLayout.usePanelControls();

  const activityBarConfig = {
    header: {
      icon: <Home />,
      title: "开发工具",
      showSearch: true
    },
    groups: [
      {
        title: "导航",
        items: [
          {
            id: "explorer",
            icon: <FileText />,
            label: "文件浏览器",
            badge: 3
          },
          {
            id: "search",
            icon: <Search />,
            label: "搜索"
          },
          {
            id: "source-control",
            icon: <GitBranch />,
            label: "源代码管理"
          }
        ]
      },
      {
        title: "工具",
        items: [
          {
            id: "terminal",
            icon: <Terminal />,
            label: "终端"
          },
          {
            id: "settings",
            icon: <Settings />,
            label: "设置"
          }
        ]
      }
    ],
    footer: {
      items: [
        {
          id: "help",
          icon: <HelpCircle />,
          label: "帮助"
        }
      ]
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="h-screen">
        <VSCodeLayout.WorkspaceLayout>
          <VSCodeLayout.LayoutControls
            onToggleLeftSidebar={leftPanel.toggle}
            onToggleRightSidebar={rightPanel.toggle}
            onToggleBottomPanel={bottomPanel.toggle}
            isLeftSidebarCollapsed={leftPanel.isCollapsed}
            isRightSidebarCollapsed={rightPanel.isCollapsed}
            isBottomPanelCollapsed={bottomPanel.isCollapsed}
          />
          <VSCodeLayout.MainLayout>
            <VSCodeLayout.ActivityBar
              isExpanded={isActivityBarExpanded}
              onToggle={() => setIsActivityBarExpanded(!isActivityBarExpanded)}
              expandable={true}
            >
              {activityBarConfig.groups.flatMap(group => group.items).map((item) => (
                <VSCodeLayout.ActivityItem
                  key={item.id}
                  icon={item.icon}
                  title={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                  isExpanded={isActivityBarExpanded}
                  expandable={true}
                  badge={item.badge}
                />
              ))}
            </VSCodeLayout.ActivityBar>

            <VSCodeLayout.MainContent>
              <VSCodeLayout.HorizontalLayout>
                <VSCodeLayout.SidebarLayout
                  ref={leftPanel.ref}
                  onCollapse={leftPanel.collapse}
                  onExpand={leftPanel.expand}
                >
                  <VSCodeLayout.WorkspacePanel
                    title="资源管理器"
                    isCollapsed={leftPanel.isCollapsed}
                    onCollapse={leftPanel.collapse}
                    onExpand={leftPanel.expand}
                  >
                    <VSCodeLayout.PanelContent>
                      <div className="space-y-2">
                        <div className="cursor-pointer hover:bg-muted p-2 rounded">src/</div>
                        <div className="cursor-pointer hover:bg-muted p-2 rounded">public/</div>
                        <div className="cursor-pointer hover:bg-muted p-2 rounded">package.json</div>
                        <div className="cursor-pointer hover:bg-muted p-2 rounded">tsconfig.json</div>
                      </div>
                    </VSCodeLayout.PanelContent>
                  </VSCodeLayout.WorkspacePanel>
                </VSCodeLayout.SidebarLayout>

                <VSCodeLayout.ResizeHandle />

                <VSCodeLayout.ResizablePanel>
                  <VSCodeLayout.WorkspacePanel>
                    <VSCodeLayout.EditorHeader>
                      <VSCodeLayout.Tab
                        title="composite-kit 组件库示例"
                        isActive={true}
                      />
                    </VSCodeLayout.EditorHeader>
                    <VSCodeLayout.EditorContent>
                      <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">composite-kit 组件库示例</h1>
                        <div className="prose max-w-none dark:prose-invert">
                          <h2>欢迎使用组件库</h2>
                          <p>
                            这是一个基于 React 和 Tailwind CSS 构建的现代化组件库示例应用。
                            您可以通过左侧的活动栏切换不同的功能，使用侧边栏中的主题切换器更改应用主题。
                          </p>
                          <h3>主要功能</h3>
                          <ul>
                            <li>可配置的活动栏</li>
                            <li>VSCode 风格布局</li>
                            <li>主题切换</li>
                            <li>响应式设计</li>
                          </ul>
                        </div>
                      </div>
                    </VSCodeLayout.EditorContent>
                  </VSCodeLayout.WorkspacePanel>
                </VSCodeLayout.ResizablePanel>

                <VSCodeLayout.ResizeHandle />

                <VSCodeLayout.SidebarLayout
                  ref={bottomPanel.ref}
                  defaultSize={25}
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                >
                  <VSCodeLayout.WorkspacePanel
                    title="终端"
                    isCollapsed={bottomPanel.isCollapsed}
                    onCollapse={bottomPanel.collapse}
                    onExpand={bottomPanel.expand}
                  >
                    <VSCodeLayout.PanelContent>
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
                    </VSCodeLayout.PanelContent>
                  </VSCodeLayout.WorkspacePanel>
                </VSCodeLayout.SidebarLayout>
              </VSCodeLayout.HorizontalLayout>
            </VSCodeLayout.MainContent>
          </VSCodeLayout.MainLayout>
        </VSCodeLayout.WorkspaceLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;

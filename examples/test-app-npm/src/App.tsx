import * as React from "react";
import { 
  ThemeProvider, 
  ThemeSwitcher, 
  ConfigurableActivityBar,
  VSCodeLayout
} from "composite-kit";
import { Home, Settings, FileText, HelpCircle, GitBranch, Search, Terminal, PanelLeft } from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = React.useState("explorer");
  
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
        <VSCodeLayout
          activityBar={
            <ConfigurableActivityBar 
              config={activityBarConfig}
              defaultExpanded={true}
              onActiveChange={(id) => setActiveSection(id)}
            />
          }
          sideBar={
            <div className="h-full bg-card p-4 flex flex-col">
              <div className="text-lg font-medium mb-4">
                {activeSection === "explorer" && "文件浏览器"}
                {activeSection === "search" && "搜索"}
                {activeSection === "source-control" && "源代码管理"}
                {activeSection === "terminal" && "终端"}
                {activeSection === "settings" && "设置"}
                {activeSection === "help" && "帮助"}
              </div>
              <div className="flex-1 overflow-auto">
                {activeSection === "explorer" && (
                  <div className="space-y-2">
                    <div className="cursor-pointer hover:bg-muted p-2 rounded">src/</div>
                    <div className="cursor-pointer hover:bg-muted p-2 rounded">public/</div>
                    <div className="cursor-pointer hover:bg-muted p-2 rounded">package.json</div>
                    <div className="cursor-pointer hover:bg-muted p-2 rounded">tsconfig.json</div>
                  </div>
                )}
                {activeSection === "settings" && (
                  <div className="space-y-4">
                    <ThemeSwitcher
                      themes={[
                        "light",
                        "dark",
                        "material",
                        "nord",
                        "dracula",
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          }
          editor={
            <div className="h-full bg-background p-6 overflow-auto">
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
            </div>
          }
          secondarySideBar={
            <div className="h-full bg-card p-4">
              <h3 className="font-medium mb-4">属性面板</h3>
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded">
                  <div className="text-sm font-medium">大小</div>
                  <div className="text-xs text-muted-foreground">320 x 240</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="text-sm font-medium">位置</div>
                  <div className="text-xs text-muted-foreground">x: 0, y: 0</div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

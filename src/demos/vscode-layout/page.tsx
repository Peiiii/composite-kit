import { ActivityBar } from "@/components/activity-bar";
import { VSCodeLayout } from "@/components/layout/vscode-layout";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Bug, FileText, GitCommit, HelpCircle, Home, Search, Settings, PanelLeftClose, PanelRightClose, Terminal, X } from "lucide-react";
import * as React from "react";

export default function VSCodeLayoutDemo() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("explorer");
  const [showSecondarySideBar, setShowSecondarySideBar] = React.useState(true);
  const [showSideBar, setShowSideBar] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(true);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPanel(!showPanel)}
          >
            <Terminal className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSecondarySideBar(!showSecondarySideBar)}
          >
            <PanelRightClose className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStatusBar(!showStatusBar)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <VSCodeLayout
        activityBar={
          <ActivityBar.Root
            expanded={expanded}
            defaultActiveId={activeSection}
            onExpandedChange={setExpanded}
            onActiveChange={setActiveSection}
          >
            <ActivityBar.Header
              icon={<BookOpen />}
              title="VS Code"
              showSearch={true}
            />

            <ActivityBar.GroupList>
              <ActivityBar.Group title="导航">
                <ActivityBar.Item id="explorer" icon={<FileText />} label="资源管理器" />
                <ActivityBar.Item id="search" icon={<Search />} label="搜索" />
                <ActivityBar.Item id="source-control" icon={<Home />} label="源代码管理" />
                <ActivityBar.Item id="debug" icon={<Bug />} label="运行和调试" />
              </ActivityBar.Group>
            </ActivityBar.GroupList>

            <ActivityBar.Footer>
              <ActivityBar.Separator />
              <ActivityBar.Group>
                <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
                <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
              </ActivityBar.Group>
            </ActivityBar.Footer>
          </ActivityBar.Root>
        }
        sideBar={
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <Input placeholder="搜索文件..." className="w-full" />
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">file-{i + 1}.tsx</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        }
        editor={
          <div className="h-full flex flex-col overflow-hidden">
            <Tabs defaultValue="editor" className="h-full flex flex-col">
              <TabsList className="flex-shrink-0 w-full justify-start border-b rounded-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TabsTrigger value="editor" className="data-[state=active]:bg-background">editor.tsx</TabsTrigger>
                <TabsTrigger value="styles" className="data-[state=active]:bg-background">styles.css</TabsTrigger>
              </TabsList>
              <div className="flex-1 min-h-0 overflow-hidden">
                <TabsContent value="editor" className="h-full mt-0">
                  <div className="h-full p-4">
                    <ScrollArea className="h-full">
                      <div className="bg-muted/20 rounded-md p-4 border">
                        <pre className="text-sm whitespace-pre-wrap">
                          {`import * as React from "react";

export function Editor() {
  return (
    <div>
      Hello, VS Code!
    </div>
  );
}

// 添加一些额外的内容来测试滚动
const longContent = Array(50).fill(0).map((_, i) => \`// Line \${i + 1}\`).join('\\n');

export function AnotherComponent() {
  return (
    <div>
      {longContent}
    </div>
  );
}`}
                        </pre>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent value="styles" className="h-full mt-0">
                  <div className="h-full p-4">
                    <ScrollArea className="h-full">
                      <div className="bg-muted/20 rounded-md p-4 border">
                        <pre className="text-sm whitespace-pre-wrap">
                          {`.editor {
  display: flex;
  flex-direction: column;
}

// 添加一些额外的样式来测试滚动
${Array(50).fill(0).map((_, i) => `.class-${i + 1} {
  margin: ${i}px;
  padding: ${i * 2}px;
}`).join('\n\n')}`}
                        </pre>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        }
        panel={
          <div className="h-full flex flex-col">
            <Tabs defaultValue="terminal" className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TabsTrigger value="terminal" className="data-[state=active]:bg-background">终端</TabsTrigger>
                <TabsTrigger value="output" className="data-[state=active]:bg-background">输出</TabsTrigger>
                <TabsTrigger value="problems" className="data-[state=active]:bg-background">问题</TabsTrigger>
              </TabsList>
              <TabsContent value="terminal" className="flex-1 mt-0 p-4 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="bg-muted/20 rounded-md p-4 border">
                    <pre className="text-sm text-muted-foreground">
                      {`$ npm run dev
> vscode-layout@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000`}
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="output" className="flex-1 mt-0 p-4 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="bg-muted/20 rounded-md p-4 border">
                    <pre className="text-sm text-muted-foreground">
                      {`[Info] 正在编译...
[Info] 编译完成`}
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="problems" className="flex-1 mt-0 p-4 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="bg-muted/20 rounded-md p-4 border">
                    <pre className="text-sm text-muted-foreground">
                      {`没有发现问题`}
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        }
        statusBar={
          <div className="h-full flex items-center justify-between px-4 text-xs text-muted-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center space-x-4 min-w-0">
              <span className="truncate">main</span>
              <span className="truncate">TypeScript</span>
              <span className="truncate">UTF-8</span>
              <span className="truncate">Spaces: 2</span>
              <span className="truncate">Indent: 2</span>
              <span className="truncate">Line: 1</span>
              <span className="truncate">Column: 1</span>
              <span className="truncate">Selection: 0</span>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <span className="truncate">Ln 1, Col 1</span>
              <span className="truncate">Spaces: 2</span>
              <span className="truncate">UTF-8</span>
              <span className="truncate">TypeScript</span>
              <span className="truncate">Git: main</span>
              <span className="truncate">Problems: 0</span>
              <span className="truncate">Warnings: 0</span>
              <span className="truncate">Errors: 0</span>
            </div>
          </div>
        }
        secondarySideBar={
          <div className="h-full flex flex-col border-l">
            <Tabs defaultValue="outline" className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TabsTrigger value="outline" className="data-[state=active]:bg-background">大纲</TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-background">时间线</TabsTrigger>
              </TabsList>
              <TabsContent value="outline" className="flex-1 mt-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-2">
                    <div className="text-sm font-medium">Editor</div>
                    <div className="pl-4 text-sm text-muted-foreground">- Editor()</div>
                    <div className="text-sm font-medium">VSCodeLayout</div>
                    <div className="pl-4 text-sm text-muted-foreground">- Root</div>
                    <div className="pl-4 text-sm text-muted-foreground">- Header</div>
                    <div className="pl-4 text-sm text-muted-foreground">- Content</div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="timeline" className="flex-1 mt-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GitCommit className="h-4 w-4" />
                        <span className="text-sm">添加 VS Code 布局</span>
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">2 小时前</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GitCommit className="h-4 w-4" />
                        <span className="text-sm">实现活动栏组件</span>
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">3 小时前</div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        }
        showSecondarySideBar={showSecondarySideBar}
        showSideBar={showSideBar}
        showPanel={showPanel}
        showStatusBar={showStatusBar}
      />
    </div>
  );
} 
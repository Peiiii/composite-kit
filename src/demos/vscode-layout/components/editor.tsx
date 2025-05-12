import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VSCodeEditor() {
  return (
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
  );
} 
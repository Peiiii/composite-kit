import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VSCodePanel() {
  return (
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
  );
} 
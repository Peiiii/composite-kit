import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCommit } from "lucide-react";

export function VSCodeSecondarySideBar() {
  return (
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
  );
} 
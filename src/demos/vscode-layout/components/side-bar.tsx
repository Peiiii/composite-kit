import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

export function VSCodeSideBar() {
  return (
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
  );
} 
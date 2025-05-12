import { VSCodeLayout } from "@/components/layout/vscode-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Hash, Headphones, Mic, Plus, Search, Settings, Users } from "lucide-react";
import * as React from "react";

export default function ChatLayoutDemo() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("channels");

  return (
    <div className="h-[calc(100vh-4rem)]">
      <VSCodeLayout
        activityBar={
          <div className="h-full flex flex-col bg-[#1e1f22] text-white">
            <div className="p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-4 py-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                <Hash className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                <Users className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                <Bell className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </div>
        }
        sideBar={
          <div className="h-full flex flex-col bg-[#2b2d31] text-white">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">服务器名称</h2>
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                <div className="px-2 py-1 text-xs font-semibold text-gray-400">文本频道</div>
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                  <Hash className="h-4 w-4 mr-2" />
                  一般
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                  <Hash className="h-4 w-4 mr-2" />
                  公告
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                  <Hash className="h-4 w-4 mr-2" />
                  闲聊
                </Button>
              </div>
            </ScrollArea>
          </div>
        }
        editor={
          <div className="h-full flex flex-col bg-[#313338]">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://github.com/shadcn${i}.png`} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">用户 {i + 1}</span>
                          <span className="text-xs text-gray-400">今天 {i + 1}:00</span>
                        </div>
                        <p className="text-gray-300">这是一条消息内容 {i + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Plus className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="发送消息..."
                  className="flex-1 bg-[#383a40] border-none text-white placeholder:text-gray-400"
                />
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Headphones className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        }
        secondarySideBar={
          <div className="h-full flex flex-col bg-[#2b2d31] text-white">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">在线成员</h2>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://github.com/shadcn${i}.png`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">用户 {i + 1}</div>
                      <div className="text-xs text-gray-400">在线</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        }
      />
    </div>
  );
} 
import { VSCodeLayout } from "@/components/layout/vscode-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquare, Phone, Plus, Search, Settings, Users } from "lucide-react";
import * as React from "react";

export default function WeChatLayoutDemo() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("chats");

  return (
    <div className="h-[calc(100vh-4rem)]">
      <VSCodeLayout
        activityBar={
          <div className="h-full flex flex-col bg-[#ededed] text-gray-700">
            <div className="p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-4 py-4">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#07c160] hover:bg-[#07c160]/10">
                <MessageSquare className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#07c160] hover:bg-[#07c160]/10">
                <Users className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#07c160] hover:bg-[#07c160]/10">
                <Bell className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#07c160] hover:bg-[#07c160]/10">
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </div>
        }
        sideBar={
          <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="搜索"
                  className="flex-1"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                />
                <Button variant="ghost" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={`https://github.com/shadcn${i}.png`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">联系人 {i + 1}</span>
                        <span className="text-xs text-gray-500">下午 {i + 1}:00</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">最新消息内容 {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        }
        editor={
          <div className="h-full flex flex-col bg-[#f5f5f5]">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex space-x-2 max-w-[70%] ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={`https://github.com/shadcn${i}.png`} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#95ec69]'}`}>
                          <p className="text-sm">这是一条消息内容 {i + 1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Plus className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="发送消息..."
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        }
        secondarySideBar={
          <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b">
              <h2 className="font-semibold">聊天信息</h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium">联系人名称</h3>
                    <p className="text-sm text-gray-500">微信号：wxid_123456</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <Button variant="ghost" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    语音通话
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    发消息
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        }
      />
    </div>
  );
} 
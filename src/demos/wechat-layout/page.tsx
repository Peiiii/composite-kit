import * as React from "react";
import { 
  MessageSquare, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Plus,
  Users,
  Star,
  FileText,
  Settings,
  Image as ImageIcon
} from "lucide-react";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
}

interface Message {
  id: string;
  content: string;
  time: string;
  isSelf: boolean;
  type: 'text' | 'image';
}

const mockChats: ChatItem[] = [
  {
    id: "1",
    name: "张三",
    lastMessage: "好的，我知道了",
    time: "12:30",
    unread: 2,
  },
  {
    id: "2",
    name: "产品研发群",
    lastMessage: "李四: 今天的会议改到下午3点",
    time: "11:45",
  },
  {
    id: "3",
    name: "李四",
    lastMessage: "好的，我知道了",
    time: "昨天",
  },
  {
    id: "4",
    name: "前端开发群",
    lastMessage: "王五: 新版本已经发布",
    time: "昨天",
    unread: 5,
  },
  {
    id: "5",
    name: "UI设计群",
    lastMessage: "赵六: 设计稿已经更新",
    time: "周一",
  },
  {
    id: "6",
    name: "产品经理",
    lastMessage: "新需求文档已上传",
    time: "周一",
  },
  {
    id: "7",
    name: "测试团队",
    lastMessage: "发现了一个新bug",
    time: "上周",
  },
  {
    id: "8",
    name: "运维团队",
    lastMessage: "服务器维护通知",
    time: "上周",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "你好，最近怎么样？",
    time: "10:00",
    isSelf: false,
    type: 'text'
  },
  {
    id: "2",
    content: "挺好的，在忙新项目",
    time: "10:01",
    isSelf: true,
    type: 'text'
  },
  {
    id: "3",
    content: "新项目进展如何？",
    time: "10:02",
    isSelf: false,
    type: 'text'
  },
  {
    id: "4",
    content: "进展顺利，已经完成80%了",
    time: "10:03",
    isSelf: true,
    type: 'text'
  },
  {
    id: "5",
    content: "这是最新的设计稿",
    time: "10:04",
    isSelf: false,
    type: 'image'
  },
  {
    id: "6",
    content: "看起来不错！",
    time: "10:05",
    isSelf: true,
    type: 'text'
  },
  {
    id: "7",
    content: "我们什么时候可以开始开发？",
    time: "10:06",
    isSelf: false,
    type: 'text'
  },
  {
    id: "8",
    content: "下周一开始",
    time: "10:07",
    isSelf: true,
    type: 'text'
  },
  {
    id: "9",
    content: "好的，我会提前准备好环境",
    time: "10:08",
    isSelf: false,
    type: 'text'
  },
  {
    id: "10",
    content: "这是项目计划表",
    time: "10:09",
    isSelf: false,
    type: 'image'
  },
  {
    id: "11",
    content: "收到，我会仔细看看",
    time: "10:10",
    isSelf: true,
    type: 'text'
  },
  {
    id: "12",
    content: "有任何问题随时沟通",
    time: "10:11",
    isSelf: false,
    type: 'text'
  },
  {
    id: "13",
    content: "好的，谢谢！",
    time: "10:12",
    isSelf: true,
    type: 'text'
  },
];

const navItems = [
  { id: "chat", icon: <MessageSquare className="h-5 w-5" />, label: "聊天" },
  { id: "contacts", icon: <Users className="h-5 w-5" />, label: "通讯录" },
  { id: "favorites", icon: <Star className="h-5 w-5" />, label: "收藏" },
  { id: "files", icon: <FileText className="h-5 w-5" />, label: "文件传输助手" },
];

export default function WechatLayout() {
  const [activeChat, setActiveChat] = React.useState<string>("1");
  const [activeNav, setActiveNav] = React.useState<string>("chat");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  return (
    <div className="flex h-full bg-background">
      {/* 最左侧导航栏 */}
      <div className="w-16 border-r border-border flex flex-col items-center py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
              activeNav === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setActiveNav(item.id)}
          >
            {item.icon}
          </button>
        ))}
        <div className="flex-1" />
        <button className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted">
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* 左侧聊天列表 */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* 顶部搜索栏 */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索"
              className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm"
            />
          </div>
        </div>

        {/* 聊天列表 */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-muted ${
                activeChat === chat.id ? "bg-muted" : ""
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                {chat.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </span>
                  {chat.unread && (
                    <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧聊天内容 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天头部 */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center">
            <span className="font-medium">{mockChats.find(c => c.id === activeChat)?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 聊天内容区域 */}
        <div className="flex-1 overflow-y-auto p-4 bg-muted/50">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isSelf
                      ? "bg-primary text-primary-foreground"
                      : "bg-background"
                  }`}
                >
                  {message.type === 'text' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="w-48 h-32 bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 底部输入区域 */}
        <div className="h-14 border-t border-border flex items-center px-4 gap-2">
          <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
            <Plus className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="输入消息..."
            className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 
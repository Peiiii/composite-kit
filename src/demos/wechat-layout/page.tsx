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
  Image as ImageIcon,
  Newspaper,
  Bell,
  Mail,
  Menu,
  Grid,
  X,
  LogOut,
  User,
  HelpCircle,
  Camera,
  QrCode,
  Heart,
  Settings,
  Shield
} from "lucide-react";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  type: 'private' | 'group' | 'official' | 'subscription' | 'system' | 'official-articles';
}

interface Message {
  id: string;
  content: string;
  time: string;
  isSelf: boolean;
  type: 'text' | 'image';
}

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface MiniProgram {
  id: string;
  name: string;
  icon: string;
  isRecent?: boolean;
}

interface ProfileMenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const mockChats: ChatItem[] = [
  {
    id: "official-articles",
    name: "公众号",
    lastMessage: "查看公众号文章",
    time: "刚刚",
    type: 'official-articles'
  },
  {
    id: "1",
    name: "张三",
    lastMessage: "好的，我知道了",
    time: "12:30",
    unread: 2,
    type: 'private'
  },
  {
    id: "2",
    name: "产品研发群",
    lastMessage: "李四: 今天的会议改到下午3点",
    time: "11:45",
    type: 'group'
  },
  {
    id: "3",
    name: "李四",
    lastMessage: "好的，我知道了",
    time: "昨天",
    type: 'private'
  },
  {
    id: "4",
    name: "前端开发群",
    lastMessage: "王五: 新版本已经发布",
    time: "昨天",
    unread: 5,
    type: 'group'
  },
  {
    id: "5",
    name: "UI设计群",
    lastMessage: "赵六: 设计稿已经更新",
    time: "周一",
    type: 'group'
  },
  {
    id: "6",
    name: "产品经理",
    lastMessage: "新需求文档已上传",
    time: "周一",
    type: 'private'
  },
  {
    id: "7",
    name: "测试团队",
    lastMessage: "发现了一个新bug",
    time: "上周",
    type: 'group'
  },
  {
    id: "8",
    name: "运维团队",
    lastMessage: "服务器维护通知",
    time: "上周",
    type: 'group'
  },
  {
    id: "9",
    name: "微信团队",
    lastMessage: "欢迎使用微信",
    time: "昨天",
    type: 'system'
  },
  {
    id: "10",
    name: "腾讯科技",
    lastMessage: "【科技】最新科技动态",
    time: "10:30",
    type: 'official'
  },
  {
    id: "11",
    name: "前端早读课",
    lastMessage: "【早读】React 18 新特性解析",
    time: "09:15",
    type: 'subscription'
  },
  {
    id: "12",
    name: "掘金开发者社区",
    lastMessage: "【技术】2024年前端趋势",
    time: "昨天",
    type: 'subscription'
  },
  {
    id: "13",
    name: "微信支付",
    lastMessage: "您的订单已支付成功",
    time: "昨天",
    type: 'official'
  },
  {
    id: "14",
    name: "微信运动",
    lastMessage: "今日步数：8,888",
    time: "昨天",
    type: 'official'
  }
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

const menuItems: MenuItem[] = [
  { id: "profile", icon: <User className="h-4 w-4" />, label: "个人资料" },
  { id: "help", icon: <HelpCircle className="h-4 w-4" />, label: "帮助与反馈" },
  { id: "logout", icon: <LogOut className="h-4 w-4" />, label: "退出登录" },
];

const recentMiniPrograms: MiniProgram[] = [
  { id: "mp1", name: "微信支付", icon: "💰", isRecent: true },
  { id: "mp2", name: "微信运动", icon: "🏃", isRecent: true },
  { id: "mp3", name: "微信读书", icon: "📚", isRecent: true },
];

const myMiniPrograms: MiniProgram[] = [
  { id: "mp4", name: "京东购物", icon: "🛒" },
  { id: "mp5", name: "美团外卖", icon: "🍱" },
  { id: "mp6", name: "滴滴出行", icon: "🚕" },
  { id: "mp7", name: "腾讯视频", icon: "🎬" },
];

const profileMenuItems: ProfileMenuItem[] = [
  { id: "profile", icon: <User className="h-4 w-4" />, label: "个人信息" },
  { id: "moments", icon: <Heart className="h-4 w-4" />, label: "朋友圈" },
  { id: "qrcode", icon: <QrCode className="h-4 w-4" />, label: "我的二维码" },
  { id: "camera", icon: <Camera className="h-4 w-4" />, label: "扫一扫" },
  { id: "settings", icon: <Settings className="h-4 w-4" />, label: "设置" },
  { id: "privacy", icon: <Shield className="h-4 w-4" />, label: "隐私" },
];

export default function WechatLayout() {
  const [activeChat, setActiveChat] = React.useState<string>("1");
  const [activeNav, setActiveNav] = React.useState<string>("chat");
  const [showMenu, setShowMenu] = React.useState(false);
  const [showMiniPrograms, setShowMiniPrograms] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const miniProgramsRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (miniProgramsRef.current && !miniProgramsRef.current.contains(event.target as Node)) {
        setShowMiniPrograms(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getChatIcon = (chat: ChatItem) => {
    switch (chat.type) {
      case 'official':
      case 'official-articles':
        return <Newspaper className="h-5 w-5" />;
      case 'subscription':
        return <Mail className="h-5 w-5" />;
      case 'system':
        return <Bell className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* 最左侧导航栏 */}
      <div className="w-16 border-r border-border flex flex-col items-center py-4">
        {/* 头像按钮 */}
        <button 
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors"
          onClick={() => setShowProfile(!showProfile)}
        >
          <User className="h-6 w-6 text-primary" />
        </button>

        {/* 个人信息面板 */}
        {showProfile && (
          <div 
            ref={profileRef}
            className="absolute left-16 top-16 w-64 bg-popover border border-border rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">用户名</h3>
                <p className="text-sm text-muted-foreground">微信号：wxid_123456</p>
              </div>
            </div>
            <div className="space-y-1">
              {profileMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted rounded-md"
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
        <button 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted mb-2"
          onClick={() => setShowMiniPrograms(!showMiniPrograms)}
        >
          <Grid className="h-5 w-5" />
        </button>
        <button 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* 汉堡菜单面板 */}
        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute left-16 bottom-16 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-50"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted"
                onClick={item.onClick}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* 小程序面板 */}
        {showMiniPrograms && (
          <div 
            ref={miniProgramsRef}
            className="absolute left-16 bottom-32 w-64 bg-popover border border-border rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">小程序</h3>
              <button 
                className="p-1 hover:bg-muted rounded"
                onClick={() => setShowMiniPrograms(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm text-muted-foreground mb-2">最近使用</h4>
              <div className="grid grid-cols-4 gap-2">
                {recentMiniPrograms.map((mp) => (
                  <button
                    key={mp.id}
                    className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded"
                  >
                    <span className="text-2xl">{mp.icon}</span>
                    <span className="text-xs truncate w-full text-center">{mp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">我的小程序</h4>
              <div className="grid grid-cols-4 gap-2">
                {myMiniPrograms.map((mp) => (
                  <button
                    key={mp.id}
                    className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded"
                  >
                    <span className="text-2xl">{mp.icon}</span>
                    <span className="text-xs truncate w-full text-center">{mp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
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
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                  chat.type === 'official' || chat.type === 'subscription' || chat.type === 'official-articles'
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-primary/10'
                }`}>
                  {getChatIcon(chat) || chat.name[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium truncate">{chat.name}</span>
                    {chat.type === 'official' && (
                      <span className="text-xs text-blue-500">公众号</span>
                    )}
                    {chat.type === 'subscription' && (
                      <span className="text-xs text-green-500">订阅号</span>
                    )}
                  </div>
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
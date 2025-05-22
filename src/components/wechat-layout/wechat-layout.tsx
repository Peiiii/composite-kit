import {
    ChevronLeft,
    FileText,
    Grid as GridIcon,
    Heart,
    HelpCircle,
    Image,
    Image as ImageIcon,
    LogOut,
    Menu,
    MessageCircle,
    MessageSquare,
    MoreVertical,
    Phone,
    Plus,
    Search as SearchIcon,
    Share2,
    Star,
    ThumbsUp,
    User,
    Users,
    Video,
    X
} from "lucide-react";
import * as React from "react";

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

interface LayoutProps extends BaseProps {
  children: React.ReactNode;
}

interface NavItemProps extends BaseProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
  badgeStyle?: string;
}

interface ChatItemProps extends BaseProps {
  avatar?: React.ReactNode;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isActive?: boolean;
  onClick?: () => void;
  type?: string;
  typeLabel?: string;
  typeStyle?: string;
  badgeStyle?: string;
}

interface MessageProps extends BaseProps {
  content: string;
  time: string;
  isSelf: boolean;
  type: 'text' | 'image';
  imageComponent?: React.ReactNode;
}

interface ContactItemProps extends BaseProps {
  avatar: React.ReactNode;
  name: string;
  type?: string;
  typeLabel?: string;
  typeStyle?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

interface ContactDetailProps extends BaseProps {
  avatar: React.ReactNode;
  name: string;
  id?: string;
  idPrefix?: string;
  sections?: Array<{
    title: string;
    content: React.ReactNode;
  }>;
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
}

interface PopupProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  type:
    | "private"
    | "group"
    | "official"
    | "subscription"
    | "system"
    | "official-articles";
}

interface Message {
  id: string;
  content: string;
  time: string;
  isSelf: boolean;
  type: "text" | "image";
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

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface NavMenuProps extends BaseProps {
  items: Array<{
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }>;
  isOpen: boolean;
  onClose: () => void;
  position?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  width?: string;
}

interface ChatInputProps extends BaseProps {
  onSend: (message: string) => void;
  placeholder?: string;
  leftButton?: {
    icon: React.ReactNode;
    onClick: () => void;
  };
  rightButton?: {
    icon: React.ReactNode;
    onClick: () => void;
  };
  inputStyle?: string;
  buttonStyle?: string;
}

interface SearchInputProps extends BaseProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  inputStyle?: string;
  iconStyle?: string;
}

interface ActionButtonProps extends BaseProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  badge?: number;
  badgeStyle?: string;
  tooltip?: string;
}

interface ActionGroupProps extends BaseProps {
  actions: Array<{
    icon: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    badge?: number;
    badgeStyle?: string;
    tooltip?: string;
  }>;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  gap?: string;
}

interface GridProps extends BaseProps {
  items: Array<{
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }>;
  columns?: number;
  gap?: string;
  itemStyle?: string;
  iconStyle?: string;
  labelStyle?: string;
}

const mockChats: ChatItem[] = [
  {
    id: "official-articles",
    name: "公众号",
    lastMessage: "查看公众号文章",
    time: "刚刚",
    type: "official-articles",
  },
  {
    id: "1",
    name: "张三",
    lastMessage: "好的，我知道了",
    time: "12:30",
    unread: 2,
    type: "private",
  },
  {
    id: "2",
    name: "产品研发群",
    lastMessage: "李四: 今天的会议改到下午3点",
    time: "11:45",
    type: "group",
  },
  {
    id: "3",
    name: "李四",
    lastMessage: "好的，我知道了",
    time: "昨天",
    type: "private",
  },
  {
    id: "4",
    name: "前端开发群",
    lastMessage: "王五: 新版本已经发布",
    time: "昨天",
    unread: 5,
    type: "group",
  },
  {
    id: "5",
    name: "UI设计群",
    lastMessage: "赵六: 设计稿已经更新",
    time: "周一",
    type: "group",
  },
  {
    id: "6",
    name: "产品经理",
    lastMessage: "新需求文档已上传",
    time: "周一",
    type: "private",
  },
  {
    id: "7",
    name: "测试团队",
    lastMessage: "发现了一个新bug",
    time: "上周",
    type: "group",
  },
  {
    id: "8",
    name: "运维团队",
    lastMessage: "服务器维护通知",
    time: "上周",
    type: "group",
  },
  {
    id: "9",
    name: "微信团队",
    lastMessage: "欢迎使用微信",
    time: "昨天",
    type: "system",
  },
  {
    id: "10",
    name: "腾讯科技",
    lastMessage: "【科技】最新科技动态",
    time: "10:30",
    type: "official",
  },
  {
    id: "11",
    name: "前端早读课",
    lastMessage: "【早读】React 18 新特性解析",
    time: "09:15",
    type: "subscription",
  },
  {
    id: "12",
    name: "掘金开发者社区",
    lastMessage: "【技术】2024年前端趋势",
    time: "昨天",
    type: "subscription",
  },
  {
    id: "13",
    name: "微信支付",
    lastMessage: "您的订单已支付成功",
    time: "昨天",
    type: "official",
  },
  {
    id: "14",
    name: "微信运动",
    lastMessage: "今日步数：8,888",
    time: "昨天",
    type: "official",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "你好，最近怎么样？",
    time: "10:00",
    isSelf: false,
    type: "text",
  },
  {
    id: "2",
    content: "挺好的，在忙新项目",
    time: "10:01",
    isSelf: true,
    type: "text",
  },
  {
    id: "3",
    content: "新项目进展如何？",
    time: "10:02",
    isSelf: false,
    type: "text",
  },
  {
    id: "4",
    content: "进展顺利，已经完成80%了",
    time: "10:03",
    isSelf: true,
    type: "text",
  },
  {
    id: "5",
    content: "这是最新的设计稿",
    time: "10:04",
    isSelf: false,
    type: "image",
  },
  {
    id: "6",
    content: "看起来不错！",
    time: "10:05",
    isSelf: true,
    type: "text",
  },
  {
    id: "7",
    content: "我们什么时候可以开始开发？",
    time: "10:06",
    isSelf: false,
    type: "text",
  },
  {
    id: "8",
    content: "下周一开始",
    time: "10:07",
    isSelf: true,
    type: "text",
  },
  {
    id: "9",
    content: "好的，我会提前准备好环境",
    time: "10:08",
    isSelf: false,
    type: "text",
  },
  {
    id: "10",
    content: "这是项目计划表",
    time: "10:09",
    isSelf: false,
    type: "image",
  },
  {
    id: "11",
    content: "收到，我会仔细看看",
    time: "10:10",
    isSelf: true,
    type: "text",
  },
  {
    id: "12",
    content: "有任何问题随时沟通",
    time: "10:11",
    isSelf: false,
    type: "text",
  },
  {
    id: "13",
    content: "好的，谢谢！",
    time: "10:12",
    isSelf: true,
    type: "text",
  },
];

const mockContacts = [
  { id: "1", name: "张三", avatar: "张", type: "private" },
  { id: "2", name: "李四", avatar: "李", type: "private" },
  { id: "3", name: "产品研发群", avatar: "产", type: "group" },
  { id: "4", name: "前端开发群", avatar: "前", type: "group" },
  { id: "5", name: "UI设计群", avatar: "U", type: "group" },
  { id: "6", name: "测试团队", avatar: "测", type: "group" },
  { id: "7", name: "运维团队", avatar: "运", type: "group" },
  { id: "8", name: "腾讯科技", avatar: "腾", type: "official" },
  { id: "9", name: "微信团队", avatar: "微", type: "official" },
  { id: "10", name: "微信支付", avatar: "支", type: "official" },
];

const navItems = [
  { id: "chat", icon: <MessageSquare className="h-5 w-5" />, label: "聊天" },
  { id: "contacts", icon: <Users className="h-5 w-5" />, label: "通讯录" },
  { id: "moments", icon: <Heart className="h-5 w-5" />, label: "朋友圈" },
  { id: "favorites", icon: <Star className="h-5 w-5" />, label: "收藏" },
  {
    id: "files",
    icon: <FileText className="h-5 w-5" />,
    label: "文件传输助手",
  },
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

const Layout = {
  App: ({ children, className, style }: LayoutProps) => (
    <div className={`flex h-full bg-background ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Split: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 flex ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Sidebar: ({ children, className, style }: LayoutProps) => (
    <div className={`w-80 border-r border-border flex flex-col ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Main: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 flex flex-col ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Header: ({ children, className, style }: LayoutProps) => (
    <div className={`h-14 border-b border-border flex items-center justify-between px-4 ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Content: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 overflow-y-auto ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Footer: ({ children, className, style }: LayoutProps) => (
    <div className={`h-14 border-t border-border flex items-center px-4 gap-2 ${className || ''}`} style={style}>
      {children}
    </div>
  ),
};

const Nav = {
  Bar: ({ children, className, style }: LayoutProps) => (
    <div className={`w-16 border-r border-border flex flex-col items-center py-4 ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Item: ({ 
    icon, 
    label, 
    isActive, 
    onClick, 
    badge, 
    badgeStyle,
    className, 
    style 
  }: NavItemProps) => (
    <button
      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 relative ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      } ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      {icon}
      {badge && (
        <span className={`absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ${badgeStyle || ''}`}>
          {badge}
        </span>
      )}
    </button>
  ),

  Menu: ({ 
    items, 
    isOpen, 
    onClose, 
    position,
    width,
    className, 
    style 
  }: NavMenuProps) => {
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!isOpen) return null;

    const positionStyle = {
      left: position?.left,
      right: position?.right,
      top: position?.top,
      bottom: position?.bottom,
    };

    return (
      <div
        ref={menuRef}
        className={`absolute bg-popover border border-border rounded-lg shadow-lg py-2 z-50 ${className || ''}`}
        style={{ ...positionStyle, width: width || '12rem', ...style }}
      >
        {items.map((item) => (
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
    );
  },
};

const Chat = {
  List: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 overflow-y-auto ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Item: ({ 
    avatar, 
    name, 
    lastMessage, 
    time, 
    unread, 
    isActive, 
    onClick, 
    type,
    typeLabel,
    typeStyle,
    badgeStyle,
    className, 
    style 
  }: ChatItemProps) => (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-muted ${
        isActive ? "bg-muted" : ""
      } ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      <div className="relative">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${typeStyle || 'bg-primary/10'}`}>
          {avatar}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <span className="font-medium truncate">{name}</span>
            {typeLabel && (
              <span className={`text-xs ${typeStyle || ''}`}>{typeLabel}</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground truncate">
            {lastMessage}
          </span>
          {unread && (
            <span className={`ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full ${badgeStyle || ''}`}>
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  ),

  Message: ({ 
    content, 
    time, 
    isSelf, 
    type, 
    imageComponent,
    className, 
    style 
  }: MessageProps) => (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"} ${className || ''}`} style={style}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isSelf
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        }`}
      >
        {type === "text" ? (
          <p className="text-sm">{content}</p>
        ) : (
          imageComponent || (
            <div className="w-48 h-32 bg-muted rounded flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )
        )}
        <span className="text-xs opacity-70 mt-1 block">{time}</span>
      </div>
    </div>
  ),

  Input: ({ 
    onSend, 
    placeholder,
    leftButton,
    rightButton,
    inputStyle,
    buttonStyle,
    className, 
    style 
  }: ChatInputProps) => {
    const [message, setMessage] = React.useState("");

    return (
      <div className={`flex items-center gap-2 w-full ${className || ''}`} style={style}>
        {leftButton ? (
          <button 
            className={`p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors ${buttonStyle || ''}`}
            onClick={leftButton.onClick}
          >
            {leftButton.icon}
          </button>
        ) : (
          <button className={`p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors ${buttonStyle || ''}`}>
            <Plus className="h-5 w-5" />
          </button>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder || "输入消息..."}
          className={`flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${inputStyle || ''}`}
          onKeyPress={(e) => {
            if (e.key === "Enter" && message.trim()) {
              onSend(message);
              setMessage("");
            }
          }}
        />
        {rightButton ? (
          <button
            className={`p-2 rounded-full text-primary hover:bg-primary/10 transition-colors ${buttonStyle || ''}`}
            onClick={() => {
              if (message.trim()) {
                onSend(message);
                setMessage("");
              }
              rightButton.onClick();
            }}
          >
            {rightButton.icon}
          </button>
        ) : (
          <button
            className={`p-2 rounded-full text-primary hover:bg-primary/10 transition-colors ${buttonStyle || ''}`}
            onClick={() => {
              if (message.trim()) {
                onSend(message);
                setMessage("");
              }
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  },
};

const Contact = {
  List: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 overflow-y-auto ${className || ''}`} style={style}>
      {children}
    </div>
  ),

  Item: ({ 
    avatar, 
    name, 
    type,
    typeLabel,
    typeStyle,
    isSelected, 
    onClick, 
    className, 
    style 
  }: ContactItemProps) => (
    <div
      className={`flex items-center p-4 hover:bg-muted cursor-pointer ${
        isSelected ? "bg-muted" : ""
      } ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
        {avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-medium">{name}</span>
          {typeLabel && (
            <span className={`text-xs ${typeStyle || ''}`}>{typeLabel}</span>
          )}
        </div>
      </div>
    </div>
  ),

  Detail: ({ 
    avatar, 
    name, 
    id,
    idPrefix,
    sections,
    actions,
    className, 
    style 
  }: ContactDetailProps) => (
    <div className={`flex-1 overflow-y-auto ${className || ''}`} style={style}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            {avatar}
          </div>
          <div>
            <h3 className="text-xl font-medium mb-1">{name}</h3>
            {id && (
              <p className="text-sm text-muted-foreground">
                {idPrefix || ''}{id}
              </p>
            )}
          </div>
        </div>
      </div>

      {sections?.map((section, index) => (
        <div key={index} className="p-4 border-b border-border">
          {section.title && (
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">{section.title}</h4>
            </div>
          )}
          {section.content}
        </div>
      ))}

      {actions && (
        <div className="p-4 flex items-center justify-center gap-8">
          {actions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary"
              onClick={action.onClick}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {action.icon}
              </div>
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  ),
};

const Popup = {
  Container: ({ 
    isOpen, 
    onClose, 
    children, 
    width,
    height,
    className, 
    style 
  }: PopupProps) => {
    if (!isOpen) return null;

    return (
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center ${className || ''}`}
        onClick={onClose}
        style={style}
      >
        <div
          className="bg-background rounded-lg shadow-lg flex flex-col"
          style={{ width: width || '480px', height: height || '640px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  },

  Header: ({ title, onClose, className, style }: { title: string; onClose: () => void } & BaseProps) => (
    <div className={`h-14 border-b border-border flex items-center justify-between px-4 ${className || ''}`} style={style}>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          onClick={onClose}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  ),

  Content: ({ children, className, style }: LayoutProps) => (
    <div className={`flex-1 overflow-y-auto ${className || ''}`} style={style}>
      {children}
    </div>
  ),
};

const SearchInput = {
  Input: ({ 
    placeholder, 
    value, 
    onChange, 
    onSearch,
    icon,
    iconPosition = 'left',
    inputStyle,
    iconStyle,
    className, 
    style 
  }: SearchInputProps) => {
    const defaultIcon = <SearchIcon className="h-4 w-4 text-muted-foreground" />;
    const Icon = icon || defaultIcon;

    return (
      <div className={`relative ${className || ''}`} style={style}>
        {iconPosition === 'left' && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconStyle || ''}`}>
            {Icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch?.(value || '');
            }
          }}
          placeholder={placeholder || "搜索..."}
          className={`w-full ${iconPosition === 'left' ? 'pl-9' : 'pr-9'} pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${inputStyle || ''}`}
        />
        {iconPosition === 'right' && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${iconStyle || ''}`}>
            {Icon}
          </div>
        )}
      </div>
    );
  },
};

const Action = {
  Button: ({ 
    icon, 
    onClick, 
    variant = 'default',
    size = 'md',
    badge,
    badgeStyle,
    tooltip,
    className, 
    style 
  }: ActionButtonProps) => {
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    const variantClasses = {
      default: 'text-muted-foreground hover:text-primary hover:bg-muted',
      primary: 'text-primary hover:bg-primary/10',
      ghost: 'text-muted-foreground hover:bg-muted/50',
    };

    return (
      <button
        className={`rounded-full transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`}
        onClick={onClick}
        style={style}
        title={tooltip}
      >
        {icon}
        {badge && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ${badgeStyle || ''}`}>
            {badge}
          </span>
        )}
      </button>
    );
  },

  Group: ({ 
    actions, 
    variant = 'default',
    size = 'md',
    gap = '4',
    className, 
    style 
  }: ActionGroupProps) => (
    <div className={`flex items-center gap-${gap} ${className || ''}`} style={style}>
      {actions.map((action, index) => (
        <Action.Button
          key={index}
          icon={action.icon}
          onClick={action.onClick}
          variant={action.variant || variant}
          size={action.size || size}
          badge={action.badge}
          badgeStyle={action.badgeStyle}
          tooltip={action.tooltip}
        />
      ))}
    </div>
  ),
};

const GridLayout = {
  Container: ({ 
    items, 
    columns = 4,
    gap = '2',
    itemStyle,
    iconStyle,
    labelStyle,
    className, 
    style 
  }: GridProps) => (
    <div 
      className={`grid gap-${gap} ${className || ''}`} 
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style 
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors ${itemStyle || ''}`}
          onClick={item.onClick}
        >
          <span className={`text-2xl ${iconStyle || ''}`}>{item.icon}</span>
          <span className={`text-xs w-14 text-center truncate ${labelStyle || ''}`}>{item.label}</span>
        </button>
      ))}
    </div>
  ),
};

export {
  Layout,
  Nav,
  Chat,
  Contact,
  Popup,
  SearchInput,
  Action,
  GridLayout,
};

export type {
  BaseProps,
  LayoutProps,
  NavItemProps,
  ChatItemProps,
  MessageProps,
  ContactItemProps,
  ContactDetailProps,
  PopupProps,
  NavMenuProps,
  ChatInputProps,
  SearchInputProps,
  ActionButtonProps,
  ActionGroupProps,
  GridProps,
};

const wechatConfig = {
  chatTypes: {
    private: {
      label: '',
      style: '',
    },
    group: {
      label: '',
      style: '',
    },
    official: {
      label: '公众号',
      style: 'text-blue-500',
    },
    subscription: {
      label: '订阅号',
      style: 'text-green-500',
    },
    system: {
      label: '',
      style: '',
    },
    'official-articles': {
      label: '',
      style: '',
    },
  },
  contactTypes: {
    private: {
      label: '',
      style: '',
    },
    group: {
      label: '',
      style: '',
    },
    official: {
      label: '公众号',
      style: 'text-blue-500',
    },
  },
  navMenuPosition: {
    left: '4rem',
    bottom: '0',
  },
};

export default function WechatLayout() {
  const [activeChat, setActiveChat] = React.useState<string>("1");
  const [activeNav, setActiveNav] = React.useState<string>("chat");
  const [showMenu, setShowMenu] = React.useState(false);
  const [showMiniPrograms, setShowMiniPrograms] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [windows, setWindows] = React.useState<Window[]>([]);
  const [selectedContact, setSelectedContact] = React.useState<string | null>(
    null
  );
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const miniProgramsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (miniProgramsRef.current && !miniProgramsRef.current.contains(event.target as Node)) {
        setShowMiniPrograms(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    if (id === "moments") {
      setWindows((prev) => [
        ...prev,
        {
          id: "moments",
          title: "朋友圈",
          content: (
            <div className="h-full flex flex-col">
              <Popup.Header
                title="朋友圈"
                onClose={() => closeWindow("moments")}
              />
              <Popup.Content>
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">用户{i}</h4>
                          <p className="text-xs text-muted-foreground">
                            2小时前
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">这是一条朋友圈内容 #{i}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="aspect-square bg-muted rounded flex items-center justify-center"
                          >
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary">
                          <ThumbsUp className="h-4 w-4" />
                          <span>点赞</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary">
                          <MessageCircle className="h-4 w-4" />
                          <span>评论</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary">
                          <Share2 className="h-4 w-4" />
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Popup.Content>
            </div>
          ),
        },
      ]);
    }
    setActiveNav(id);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const renderRightContent = () => {
    switch (activeNav) {
      case "chat":
        return (
          <Layout.Main>
            <Layout.Header>
              <div className="flex items-center">
                <span className="font-medium">
                  {mockChats.find((c) => c.id === activeChat)?.name}
                </span>
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
            </Layout.Header>

            <Layout.Content>
              <div className="p-4 bg-muted/50">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <Chat.Message
                      key={message.id}
                      content={message.content}
                      time={message.time}
                      isSelf={message.isSelf}
                      type={message.type}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </Layout.Content>

            <Layout.Footer>
              <Chat.Input
                onSend={(message) => console.log("发送消息:", message)}
              />
            </Layout.Footer>
          </Layout.Main>
        );
      case "contacts":
        return (
          <Layout.Split>
            <Layout.Sidebar>
              <Layout.Header>
                <div className="flex items-center">
                  <span className="font-medium">通讯录</span>
                </div>
                <Action.Group
                  actions={[
                    {
                      icon: <Plus className="h-5 w-5" />,
                      onClick: () => {},
                      tooltip: '添加联系人',
                    },
                    {
                      icon: <SearchIcon className="h-5 w-5" />,
                      onClick: () => {},
                      tooltip: '搜索',
                    },
                  ]}
                />
              </Layout.Header>

              <Contact.List>
                {mockContacts.map((contact) => (
                  <Contact.Item
                    key={contact.id}
                    avatar={contact.avatar}
                    name={contact.name}
                    type={contact.type as 'private' | 'group' | 'official'}
                    isSelected={selectedContact === contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                  />
                ))}
              </Contact.List>
            </Layout.Sidebar>

            <Layout.Main>
              {selectedContact ? (
                <>
                  <Layout.Header>
                    <div className="flex items-center">
                      <span className="font-medium">详细资料</span>
                    </div>
                  </Layout.Header>
                  <Contact.Detail
                    avatar={<span className="text-2xl">{mockContacts.find((c) => c.id === selectedContact)?.avatar}</span>}
                    name={mockContacts.find((c) => c.id === selectedContact)?.name || ''}
                    id={selectedContact}
                    idPrefix="微信号：wxid_"
                    sections={[
                      {
                        title: '朋友圈',
                        content: (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <button className="text-xs text-primary hover:text-primary/80">
                                查看全部
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="aspect-square bg-muted rounded cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                  <Image className="h-full w-full object-cover rounded" />
                                </div>
                              ))}
                            </div>
                          </>
                        ),
                      },
                      {
                        title: '共同群聊',
                        content: <span className="text-sm text-muted-foreground">3个</span>,
                      },
                    ]}
                    actions={[
                      {
                        icon: <MessageSquare className="h-6 w-6" />,
                        label: '发消息',
                        onClick: () => {},
                      },
                      {
                        icon: <Phone className="h-6 w-6" />,
                        label: '语音通话',
                        onClick: () => {},
                      },
                      {
                        icon: <Video className="h-6 w-6" />,
                        label: '视频通话',
                        onClick: () => {},
                      },
                    ]}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  请选择一个联系人查看详情
                </div>
              )}
            </Layout.Main>
          </Layout.Split>
        );
      case "favorites":
        return (
          <Layout.Main>
            <Layout.Header>
              <div className="flex items-center">
                <span className="font-medium">收藏</span>
              </div>
            </Layout.Header>
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              暂无收藏内容
            </div>
          </Layout.Main>
        );
      case "files":
        return (
          <Layout.Main>
            <Layout.Header>
              <div className="flex items-center">
                <span className="font-medium">文件传输助手</span>
              </div>
            </Layout.Header>
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              暂无文件
            </div>
          </Layout.Main>
        );
      default:
        return null;
    }
  };

  return (
    <Layout.App>
      {windows.map((window) => (
        <Popup.Container
          key={window.id}
          isOpen={true}
          onClose={() => closeWindow(window.id)}
        >
          {window.content}
        </Popup.Container>
      ))}

      <Nav.Bar>
        <button
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors"
          onClick={() => setShowProfile(!showProfile)}
        >
          <User className="h-6 w-6 text-primary" />
        </button>

        {navItems.map((item) => (
          <Nav.Item
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeNav === item.id}
            onClick={() => handleNavClick(item.id)}
          />
        ))}

        <div className="flex-1" />

        <button
          className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted mb-2"
          onClick={() => setShowMiniPrograms(!showMiniPrograms)}
        >
          <GridIcon className="h-5 w-5" />
        </button>

        {showMiniPrograms && (
          <div
            ref={miniProgramsRef}
            className="absolute left-16 bottom-0 w-64 bg-popover border border-border rounded-lg shadow-lg p-4 z-50"
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
              <GridLayout.Container
                items={recentMiniPrograms.map(mp => ({
                  id: mp.id,
                  icon: mp.icon,
                  label: mp.name,
                  onClick: () => console.log('打开小程序:', mp.name),
                }))}
                columns={4}
                gap="2"
              />
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">我的小程序</h4>
              <GridLayout.Container
                items={myMiniPrograms.map(mp => ({
                  id: mp.id,
                  icon: mp.icon,
                  label: mp.name,
                  onClick: () => console.log('打开小程序:', mp.name),
                }))}
                columns={4}
                gap="2"
              />
            </div>
          </div>
        )}

        <button
          className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Nav.Menu
          items={menuItems}
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          position={wechatConfig.navMenuPosition}
        />
      </Nav.Bar>

      {activeNav === "chat" && (
        <Layout.Sidebar>
          <SearchInput.Input
            placeholder="搜索"
            onChange={(value) => console.log('搜索:', value)}
            onSearch={(value) => console.log('执行搜索:', value)}
          />

          <Chat.List>
            {mockChats.map((chat) => (
              <Chat.Item
                key={chat.id}
                avatar={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage}
                time={chat.time}
                unread={chat.unread}
                isActive={activeChat === chat.id}
                onClick={() => setActiveChat(chat.id)}
                type={chat.type}
                typeLabel={wechatConfig.chatTypes[chat.type]?.label}
                typeStyle={wechatConfig.chatTypes[chat.type]?.style}
              />
            ))}
          </Chat.List>
        </Layout.Sidebar>
      )}

      {renderRightContent()}
    </Layout.App>
  );
}

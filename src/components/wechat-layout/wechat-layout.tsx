import React from 'react';
import { 
  BellIcon,
  Camera,
  ChevronLeft,
  FileText,
  GridIcon,
  Heart,
  HelpCircle,
  Image,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Star,
  ThumbsUp,
  User,
  Users,
  Video,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BackdropProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ onClick, className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);
Backdrop.displayName = "Backdrop";

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-4 border-b border-border ${className}`}
      >
        {children}
      </div>
    );
  }
);
Section.displayName = "Section";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            icon ? 'pl-9' : 'pl-4'
          } pr-4 py-2 ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export interface ScrollAreaProps {
  className?: string;
  children?: React.ReactNode;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = '', children, onScroll }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex-1 overflow-y-auto ${className}`}
        onScroll={onScroll}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

interface ImageGridProps {
  images: {
    id: string | number;
    src?: string;
    onClick?: () => void;
  }[];
  columns?: number;
  gap?: number;
  className?: string;
}

const ImageGrid = React.forwardRef<HTMLDivElement, ImageGridProps>(
  ({ images, columns = 3, gap = 2, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-${columns} gap-${gap} ${className}`}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square bg-muted rounded cursor-pointer hover:opacity-80 transition-opacity"
            onClick={image.onClick}
          >
            {image.src ? (
              <img
                src={image.src}
                alt=""
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <Image className="h-full w-full object-cover rounded" />
            )}
          </div>
        ))}
      </div>
    );
  }
);
ImageGrid.displayName = "ImageGrid";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, onClick, className = '' }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex flex-col items-center gap-1 text-muted-foreground hover:text-primary ${className}`}
        onClick={onClick}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs">{label}</span>
      </button>
    );
  }
);
ActionButton.displayName = "ActionButton";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', icon, children, className = '', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20";
    const variantStyles = {
      default: "bg-background text-foreground hover:bg-muted",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-muted text-muted-foreground",
      link: "text-primary hover:underline"
    };
    const sizeStyles = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'size' | 'variant'> {
  icon: React.ReactNode;
  label?: string;
  variant?: 'default' | 'primary' | 'ghost' | 'link' | 'nav';
  size?: 'sm' | 'md' | 'lg' | 'nav';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20";
    const variantStyles = {
      default: "bg-background text-foreground hover:bg-muted",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-muted text-muted-foreground",
      link: "text-primary hover:underline",
      nav: "text-muted-foreground hover:bg-muted"
    };
    const sizeStyles = {
      sm: "h-8 w-8 p-2 rounded-full",
      md: "h-10 w-10 p-2 rounded-full",
      lg: "h-12 w-12 p-2 rounded-full",
      nav: "w-12 h-12 rounded-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon}
        {label && <span className="sr-only">{label}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className = '' }, ref) => {
    const sizeStyles = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16"
    };

    return (
      <div
        ref={ref}
        className={`${sizeStyles[size]} rounded-full bg-primary/10 flex items-center justify-center ${className}`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-lg font-medium">{fallback}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

interface ProfileAvatarProps extends Omit<AvatarProps, 'size'> {
  className?: string;
  onClick?: () => void;
}

const ProfileAvatar = React.forwardRef<HTMLDivElement, ProfileAvatarProps>(
  ({ className = '', onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors ${className}`}
        onClick={onClick}
      >
        <User className="h-6 w-6 text-primary" />
      </div>
    );
  }
);
ProfileAvatar.displayName = "ProfileAvatar";

export interface BadgeProps {
  count?: number;
  dot?: boolean;
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ count, dot, className = '' }, ref) => {
    if (!count && !dot) return null;

    return (
      <span
        ref={ref}
        className={`inline-flex items-center justify-center ${
          dot ? 'w-2 h-2' : 'min-w-[1.25rem] h-5 px-1.5'
        } rounded-full bg-primary text-primary-foreground text-xs ${className}`}
      >
        {!dot && count}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, className = '', position = 'top' }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const positionStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div
            className={`absolute ${positionStyles[position]} bg-popover text-popover-foreground px-2 py-1 rounded text-sm shadow-lg z-50 whitespace-nowrap ${className}`}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, className = '', size = 'md' }, ref) => {
    if (!isOpen) return null;

    const sizeStyles = {
      sm: 'w-[320px]',
      md: 'w-[480px]',
      lg: 'w-[640px]'
    };

    return (
      <Backdrop onClick={onClose}>
        <div
          ref={ref}
          className={`${sizeStyles[size]} bg-background rounded-lg shadow-lg flex flex-col ${className}`}
          onClick={e => e.stopPropagation()}
        >
          {title && (
            <Header
              title={title}
              right={
                onClose && (
                  <IconButton
                    icon={<X className="h-5 w-5" />}
                    variant="ghost"
                    onClick={onClose}
                  />
                )
              }
            />
          )}
          {children}
        </div>
      </Backdrop>
    );
  }
);
Modal.displayName = "Modal";

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onChange, children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex border-b border-border ${className}`}
      >
        {children}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export interface TabProps {
  value: string;
  label: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, label, isActive, onClick, className = '' }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        } ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
);
Tab.displayName = "Tab";

export interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: React.ReactNode;
    onClick?: () => void;
    icon?: React.ReactNode;
  }[];
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, items, isOpen, onClose, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className="relative inline-block"
      >
        {trigger}
        {isOpen && (
          <div
            className={`absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 ${className}`}
          >
            {items.map((item, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted"
                onClick={() => {
                  item.onClick?.();
                  onClose?.();
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

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

interface MessageGroup {
  id: string;
  title: string;
  messages: Message[];
  type: 'time' | 'sender';
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

const mockContacts = [
  { id: "1", name: "张三", avatar: "张", type: 'private' },
  { id: "2", name: "李四", avatar: "李", type: 'private' },
  { id: "3", name: "产品研发群", avatar: "产", type: 'group' },
  { id: "4", name: "前端开发群", avatar: "前", type: 'group' },
  { id: "5", name: "UI设计群", avatar: "U", type: 'group' },
  { id: "6", name: "测试团队", avatar: "测", type: 'group' },
  { id: "7", name: "运维团队", avatar: "运", type: 'group' },
  { id: "8", name: "腾讯科技", avatar: "腾", type: 'official' },
  { id: "9", name: "微信团队", avatar: "微", type: 'official' },
  { id: "10", name: "微信支付", avatar: "支", type: 'official' },
];

const navItems = [
  { id: "chat", icon: <MessageSquare className="h-5 w-5" />, label: "聊天" },
  { id: "contacts", icon: <Users className="h-5 w-5" />, label: "通讯录" },
  { id: "moments", icon: <Heart className="h-5 w-5" />, label: "朋友圈" },
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

export interface ListItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ icon, title, subtitle, right, onClick, isActive, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center p-4 cursor-pointer hover:bg-muted ${
          isActive ? "bg-muted" : ""
        } ${className}`}
        onClick={onClick}
      >
        {icon && (
          <div className="mr-3">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1">
              {title}
            </div>
            {right}
          </div>
          {subtitle && (
            <div className="flex justify-between items-center">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ListItem.displayName = "ListItem";

export interface ChatListItemProps {
  chat: ChatItem;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  ({ chat, isActive, onClick }, ref) => {
    return (
      <ListItem
        ref={ref}
        icon={
          <div className="relative">
            <Avatar
              fallback={chat.name[0]}
              className={`${
                chat.type === 'official' || chat.type === 'subscription' || chat.type === 'official-articles'
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-primary/10'
              }`}
            />
          </div>
        }
        title={
          <div className="flex items-center gap-1">
            <span className="font-medium truncate">{chat.name}</span>
            {chat.type === 'official' && (
              <span className="text-xs text-blue-500">公众号</span>
            )}
            {chat.type === 'subscription' && (
              <span className="text-xs text-green-500">订阅号</span>
            )}
          </div>
        }
        subtitle={
          <span className="text-sm text-muted-foreground truncate">
            {chat.lastMessage}
          </span>
        }
        right={
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{chat.time}</span>
            {chat.unread && <Badge count={chat.unread} />}
          </div>
        }
        isActive={isActive}
        onClick={onClick}
      />
    );
  }
);
ChatListItem.displayName = "ChatListItem";

export interface MiniProgramListProps {
  title: string;
  programs: MiniProgram[];
  onClose?: () => void;
}

export const MiniProgramList = React.forwardRef<HTMLDivElement, MiniProgramListProps>(
  ({ title, programs, onClose }, ref) => {
    return (
      <div ref={ref} className="absolute left-16 bottom-0 w-64 bg-popover border border-border rounded-lg shadow-lg p-4 z-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">{title}</h3>
          {onClose && (
            <button 
              className="p-1 hover:bg-muted rounded"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm text-muted-foreground mb-2">最近使用</h4>
          <div className="grid grid-cols-4 gap-2">
            {programs.map((mp) => (
              <button
                key={mp.id}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-2xl">{mp.icon}</span>
                <span className="text-xs w-14 text-center truncate">{mp.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
MiniProgramList.displayName = "MiniProgramList";

export interface MenuListProps {
  items: MenuItem[];
  onClose?: () => void;
}

export const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ items, onClose }, ref) => {
    return (
      <div 
        ref={ref}
        className="absolute left-16 bottom-0 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-50"
      >
        {items.map((item) => (
          <ListItem
            key={item.id}
            icon={item.icon}
            title={item.label}
            onClick={() => {
              item.onClick?.();
              onClose?.();
            }}
          />
        ))}
      </div>
    );
  }
);
MenuList.displayName = "MenuList";

export interface ChatListProps {
  chats: ChatItem[];
  activeChat: string;
  onChatSelect: (chatId: string) => void;
}

export const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
  ({ chats, activeChat, onChatSelect }, ref) => {
    return (
      <div ref={ref} className="w-80 border-r border-border flex flex-col">
        <Section>
          <Input
            icon={<Search className="h-4 w-4 text-muted-foreground" />}
            placeholder="搜索"
          />
        </Section>

        <ScrollArea>
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={activeChat === chat.id}
              onClick={() => onChatSelect(chat.id)}
            />
          ))}
        </ScrollArea>
      </div>
    );
  }
);
ChatList.displayName = "ChatList";

export interface ChatHeaderProps {
  title: string;
  actions?: {
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }[];
  className?: string;
}

export const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  ({ title, actions = [], className = '' }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`h-14 border-b border-border flex items-center justify-between px-4 ${className}`}
      >
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
        </div>
        {actions.length > 0 && (
          <div className="flex items-center gap-4">
            {actions.map((action, index) => (
              <IconButton
                key={index}
                icon={action.icon}
                className={`text-muted-foreground hover:text-primary hover:bg-muted ${action.className || ''}`}
                onClick={action.onClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
ChatHeader.displayName = "ChatHeader";

export interface MessageBubbleProps {
  content: string;
  time: string;
  isSelf: boolean;
  type: 'text' | 'image';
  className?: string;
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ content, time, isSelf, type, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-[70%] rounded-lg p-3 ${
          isSelf
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        } ${className}`}
      >
        {type === 'text' ? (
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="w-48 h-32 bg-muted rounded flex items-center justify-center">
            <Image className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <span className="text-xs opacity-70 mt-1 block">
          {time}
        </span>
      </div>
    );
  }
);
MessageBubble.displayName = "MessageBubble";

export interface MessageItemProps {
  message: Message;
  className?: string;
}

export const MessageItem = React.forwardRef<HTMLDivElement, MessageItemProps>(
  ({ message, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex ${message.isSelf ? "justify-end" : "justify-start"} ${className}`}
      >
        <MessageBubble
          content={message.content}
          time={message.time}
          isSelf={message.isSelf}
          type={message.type}
        />
      </div>
    );
  }
);
MessageItem.displayName = "MessageItem";

const groupMessagesByTime = (messages: Message[]): MessageGroup[] => {
  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message) => {
    const date = new Date(message.time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupTitle = '';
    if (date.toDateString() === today.toDateString()) {
      groupTitle = '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupTitle = '昨天';
    } else {
      groupTitle = date.toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric'
      });
    }

    if (!currentGroup || currentGroup.title !== groupTitle) {
      currentGroup = {
        id: `time-${groupTitle}`,
        title: groupTitle,
        messages: [],
        type: 'time'
      };
      groups.push(currentGroup);
    }

    currentGroup.messages.push(message);
  });

  return groups;
};

const groupMessagesBySender = (messages: Message[]): MessageGroup[] => {
  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message) => {
    const senderId = message.isSelf ? 'self' : 'other';
    const groupTitle = message.isSelf ? '我' : '对方';

    if (!currentGroup || currentGroup.title !== groupTitle) {
      currentGroup = {
        id: `sender-${senderId}`,
        title: groupTitle,
        messages: [],
        type: 'sender'
      };
      groups.push(currentGroup);
    }

    currentGroup.messages.push(message);
  });

  return groups;
};

export interface MessageGroupProps {
  group: MessageGroup;
  className?: string;
}

export const MessageGroup = React.forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ group, className = '' }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
      <div
        ref={ref}
        className={`space-y-2 ${className}`}
      >
        <div 
          className="flex items-center justify-center py-2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
            {group.title}
          </div>
        </div>
        {!isCollapsed && (
          <div className="space-y-4">
            {group.messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
MessageGroup.displayName = "MessageGroup";

export interface MessageListProps {
  messages: Message[];
  className?: string;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  groupBy?: 'time' | 'sender' | 'none';
}

export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, className = '', onScroll, groupBy = 'time' }, ref) => {
    const groups = React.useMemo(() => {
      if (groupBy === 'time') {
        return groupMessagesByTime(messages);
      } else if (groupBy === 'sender') {
        return groupMessagesBySender(messages);
      }
      return [{
        id: 'all',
        title: '',
        messages,
        type: 'time' as const
      }];
    }, [messages, groupBy]);

    return (
      <ScrollArea 
        ref={ref}
        className={`p-4 bg-muted/50 ${className}`}
        onScroll={onScroll}
      >
        <div className="space-y-4">
          {groups.map((group) => (
            <MessageGroup
              key={group.id}
              group={group}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }
);
MessageList.displayName = "MessageList";

export interface ChatInputProps {
  onSend?: (message: string) => void;
  className?: string;
}

export const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  ({ onSend, className = '' }, ref) => {
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
      if (message.trim() && onSend) {
        onSend(message.trim());
        setMessage('');
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div 
        ref={ref}
        className={`h-14 border-t border-border flex items-center px-4 gap-2 ${className}`}
      >
        <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
          <Plus className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            className="rounded-full"
          />
        </div>
        <button 
          className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
          onClick={handleSend}
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>
    );
  }
);
ChatInput.displayName = "ChatInput";

export interface NavBarProps {
  className?: string;
  children?: React.ReactNode;
}

export const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(
  ({ className = '', children }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`w-16 border-r border-border flex flex-col items-center py-4 ${className}`}
      >
        {children}
      </div>
    );
  }
);
NavBar.displayName = "NavBar";

export interface NavBarItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavBarItem = React.forwardRef<HTMLButtonElement, NavBarItemProps>(
  ({ icon, isActive, onClick, className = '' }, ref) => {
    return (
      <IconButton
        ref={ref}
        icon={icon}
        variant="nav"
        size="nav"
        className={`mb-2 ${
          isActive ? "bg-primary text-primary-foreground" : ""
        } ${className}`}
        onClick={onClick}
      />
    );
  }
);
NavBarItem.displayName = "NavBarItem";

export interface NavBarGroupProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const NavBarGroup = React.forwardRef<HTMLDivElement, NavBarGroupProps>(
  ({ title, children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center ${className}`}
      >
        {title && (
          <div className="text-xs text-muted-foreground mb-2">
            {title}
          </div>
        )}
        {children}
      </div>
    );
  }
);
NavBarGroup.displayName = "NavBarGroup";

export interface NavBarSectionProps {
  children?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
}

export const NavBarSection = React.forwardRef<HTMLDivElement, NavBarSectionProps>(
  ({ children, className = '', position = 'top' }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center ${position === 'bottom' ? 'mt-auto' : ''} ${className}`}
      >
        {children}
      </div>
    );
  }
);
NavBarSection.displayName = "NavBarSection";

export interface PopoverProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  offset?: number;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ isOpen, onClose, className = '', children, position = 'left', offset = 16 }, ref) => {
    if (!isOpen) return null;

    const positionStyles = {
      left: `left-${offset}`,
      right: `right-${offset}`,
      top: `top-${offset}`,
      bottom: `bottom-${offset}`
    };

    return (
      <div 
        ref={ref}
        className={`absolute ${positionStyles[position]} bg-popover border border-border rounded-lg shadow-lg p-4 z-50 ${className}`}
      >
        {children}
      </div>
    );
  }
);
Popover.displayName = "Popover";

export interface HeaderProps {
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ title, left, right, className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`h-14 border-b border-border flex items-center justify-between px-4 ${className}`}
      >
        <div className="flex items-center">
          {left}
          {title && <span className="font-medium">{title}</span>}
        </div>
        {right && (
          <div className="flex items-center gap-4">
            {right}
          </div>
        )}
      </div>
    );
  }
);
Header.displayName = "Header";

export interface PageHeaderProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, actions, className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`h-14 border-b border-border flex items-center justify-between px-4 ${className}`}
      >
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
        </div>
        {actions && (
          <div className="flex items-center gap-4">
            {actions}
          </div>
        )}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ message, className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`flex-1 flex items-center justify-center text-muted-foreground ${className}`}
      >
        {message}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export interface ContactDetailProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
  };
  onMomentsClick?: () => void;
  onActionClick?: (action: 'message' | 'voice' | 'video') => void;
  className?: string;
}

export const ContactDetail = React.forwardRef<HTMLDivElement, ContactDetailProps>(
  ({ contact, onMomentsClick, onActionClick, className = '' }, ref) => {
    return (
      <div ref={ref} className={`flex-1 flex flex-col ${className}`}>
        <PageHeader title="详细资料" />

        <ScrollArea>
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">{contact.avatar}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-1">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">微信号：wxid_{contact.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>备注：</span>
              <span className="text-foreground">未设置</span>
            </div>
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">朋友圈</h4>
              <button 
                className="text-xs text-primary hover:text-primary/80"
                onClick={onMomentsClick}
              >
                查看全部
              </button>
            </div>
            <ImageGrid
              images={[1, 2, 3].map(i => ({
                id: i,
                onClick: onMomentsClick
              }))}
            />
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">共同群聊</h4>
              <span className="text-sm text-muted-foreground">3个</span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-center gap-8">
            <ActionButton
              icon={<MessageSquare className="h-6 w-6" />}
              label="发消息"
              onClick={() => onActionClick?.('message')}
            />
            <ActionButton
              icon={<Phone className="h-6 w-6" />}
              label="语音通话"
              onClick={() => onActionClick?.('voice')}
            />
            <ActionButton
              icon={<Video className="h-6 w-6" />}
              label="视频通话"
              onClick={() => onActionClick?.('video')}
            />
          </div>
        </ScrollArea>
      </div>
    );
  }
);
ContactDetail.displayName = "ContactDetail";

export interface WindowManagerProps {
  windows: Window[];
  onBackdropClick: (e: React.MouseEvent) => void;
}

export const WindowManager = React.forwardRef<HTMLDivElement, WindowManagerProps>(
  ({ windows, onBackdropClick }, ref) => {
    return (
      <>
        {windows.map((window) => (
          <Backdrop
            key={window.id}
            onClick={onBackdropClick}
          >
            <div className="w-[480px] h-[640px] bg-background rounded-lg shadow-lg flex flex-col">
              {window.content}
            </div>
          </Backdrop>
        ))}
      </>
    );
  }
);
WindowManager.displayName = "WindowManager";

export interface ProfilePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (id: string) => void;
  className?: string;
}

export const ProfilePopover = React.forwardRef<HTMLDivElement, ProfilePopoverProps>(
  ({ isOpen, onClose, onNavClick, className = '' }, ref) => {
    return (
      <Popover
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        className={className}
      >
        <div className="flex items-center gap-3 mb-4">
          <Avatar fallback="用" />
          <div>
            <h3 className="font-medium">用户名</h3>
            <p className="text-sm text-muted-foreground">微信号：wxid_123456</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">朋友圈</h4>
            <button 
              className="text-xs text-primary hover:text-primary/80"
              onClick={() => onNavClick("moments")}
            >
              查看全部
            </button>
          </div>
          <ImageGrid
            images={[1, 2, 3].map(i => ({
              id: i,
              onClick: () => onNavClick("moments")
            }))}
          />
        </div>

        <button 
          className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => {
            onClose();
            onNavClick("chat");
          }}
        >
          发消息
        </button>
      </Popover>
    );
  }
);
ProfilePopover.displayName = "ProfilePopover";

const getChatIcon = (chat: ChatItem) => {
  switch (chat.type) {
    case 'official':
    case 'official-articles':
      return <FileText className="h-5 w-5" />;
    case 'subscription':
      return <MessageSquare className="h-5 w-5" />;
    case 'system':
      return <BellIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

export interface PageContainerProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ header, children, className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`flex-1 flex flex-col ${className}`}
      >
        {header}
        {children}
      </div>
    );
  }
);
PageContainer.displayName = "PageContainer";

export interface WechatLayoutProps {
  className?: string;
}

export const WechatLayout: React.FC<WechatLayoutProps> = ({ className = '' }) => {
  const [activeChat, setActiveChat] = React.useState<string>("1");
  const [activeNav, setActiveNav] = React.useState<string>("chat");
  const [showMenu, setShowMenu] = React.useState(false);
  const [showMiniPrograms, setShowMiniPrograms] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [windows, setWindows] = React.useState<Window[]>([]);
  const [selectedContact, setSelectedContact] = React.useState<string | null>(null);
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

  const handleNavClick = (id: string) => {
    if (id === "moments") {
      setWindows(prev => [...prev, {
        id: "moments",
        title: "朋友圈",
        content: (
          <div className="h-full flex flex-col">
            <div className="h-14 border-b border-border flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                  onClick={() => closeWindow("moments")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-medium">朋友圈</h3>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                  <BellIcon className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">用户{i}</h4>
                      <p className="text-xs text-muted-foreground">2小时前</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3">这是一条朋友圈内容 #{i}</p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="aspect-square bg-muted rounded flex items-center justify-center">
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
          </div>
        )
      }]);
    }
    setActiveNav(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setWindows([]);
    }
  };

  const renderRightContent = () => {
    switch (activeNav) {
      case "chat":
        return (
          <PageContainer
            header={
              <PageHeader
                title={mockChats.find(c => c.id === activeChat)?.name}
                actions={[
                  <IconButton
                    key="phone"
                    icon={<Phone className="h-5 w-5" />}
                    variant="ghost"
                    onClick={() => {}}
                  />,
                  <IconButton
                    key="video"
                    icon={<Video className="h-5 w-5" />}
                    variant="ghost"
                    onClick={() => {}}
                  />,
                  <IconButton
                    key="more"
                    icon={<MoreVertical className="h-5 w-5" />}
                    variant="ghost"
                    onClick={() => {}}
                  />
                ]}
              />
            }
          >
            <MessageList
              messages={mockMessages}
              onScroll={(e) => {
                // 处理滚动事件
              }}
            />
            <div ref={messagesEndRef} />
            <ChatInput
              onSend={(message) => {
                // 处理发送消息
                console.log('发送消息:', message);
              }}
            />
          </PageContainer>
        );
      case "contacts":
        return (
          <>
            <PageContainer
              header={
                <PageHeader
                  title="通讯录"
                  actions={[
                    <IconButton
                      key="add"
                      icon={<Plus className="h-5 w-5" />}
                      variant="ghost"
                      onClick={() => {}}
                    />,
                    <IconButton
                      key="search"
                      icon={<Search className="h-5 w-5" />}
                      variant="ghost"
                      onClick={() => {}}
                    />
                  ]}
                />
              }
            >
              <ScrollArea>
                {mockContacts.map((contact) => (
                  <ListItem
                    key={contact.id}
                    icon={
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {contact.avatar}
                      </div>
                    }
                    title={
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{contact.name}</span>
                        {contact.type === 'official' && (
                          <span className="text-xs text-blue-500">公众号</span>
                        )}
                      </div>
                    }
                    isActive={selectedContact === contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                  />
                ))}
              </ScrollArea>
            </PageContainer>

            {selectedContact ? (
              <ContactDetail
                contact={mockContacts.find(c => c.id === selectedContact)!}
                onMomentsClick={() => handleNavClick("moments")}
                onActionClick={(action) => {
                  // 处理操作点击
                  console.log('Action clicked:', action);
                }}
              />
            ) : (
              <EmptyState message="请选择一个联系人查看详情" />
            )}
          </>
        );
      case "favorites":
        return (
          <PageContainer
            header={<PageHeader title="收藏" />}
          >
            <EmptyState message="暂无收藏内容" />
          </PageContainer>
        );
      case "files":
        return (
          <PageContainer
            header={<PageHeader title="文件传输助手" />}
          >
            <EmptyState message="暂无文件" />
          </PageContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-background">
      <WindowManager
        windows={windows}
        onBackdropClick={handleBackdropClick}
      />

      <NavBar>
        <NavBarSection>
          <NavBarGroup>
            <ProfileAvatar onClick={() => setShowProfile(!showProfile)} />
          </NavBarGroup>

          <NavBarGroup>
        {navItems.map((item) => (
              <NavBarItem
            key={item.id}
                icon={item.icon}
                isActive={activeNav === item.id}
            onClick={() => handleNavClick(item.id)}
              />
            ))}
          </NavBarGroup>
        </NavBarSection>

        <NavBarSection position="bottom">
          <NavBarGroup>
            <NavBarItem
              icon={<GridIcon className="h-5 w-5" />}
          onClick={() => setShowMiniPrograms(!showMiniPrograms)}
            />

            <NavBarItem
              icon={<Menu className="h-5 w-5" />}
          onClick={() => setShowMenu(!showMenu)}
            />
          </NavBarGroup>
        </NavBarSection>

        {showMenu && (
          <MenuList
            ref={menuRef}
            items={menuItems}
            onClose={() => setShowMenu(false)}
          />
        )}

        {showMiniPrograms && (
          <MiniProgramList
            ref={miniProgramsRef}
            title="小程序"
            programs={[...recentMiniPrograms, ...myMiniPrograms]}
            onClose={() => setShowMiniPrograms(false)}
          />
        )}

        <ProfilePopover
          ref={profileRef}
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          onNavClick={handleNavClick}
        />
      </NavBar>

      {activeNav === "chat" && (
        <ChatList
          chats={mockChats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
        />
      )}

      {renderRightContent()}
    </div>
  );
};

export default WechatLayout;
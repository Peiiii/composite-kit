import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  MoreHorizontal, 
  Star, 
  Clock, 
  Smile, 
  Paperclip, 
  Send,
  Phone,
  Video,
  UserPlus,
  FileText,
  Image,
  Mic
} from "lucide-react";
import { IconButton } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";

// =============== 类型定义 ===============
type BaseProps = {
  className?: string;
};

export type Conversation = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unread?: boolean;
  online?: boolean;
};

export type Message = {
  id: string;
  content: string;
  time: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
};

type ConversationHeaderProps = BaseProps & {
  onSearch: (value: string) => void;
};

type ConversationListProps = BaseProps & {
  conversations: Conversation[];
  activeFilter: "all" | "unread" | "read";
  onFilterChange: (filter: "all" | "unread" | "read") => void;
  onConversationClick: (conversation: Conversation) => void;
};

type ConversationDetailProps = BaseProps & {
  conversation: Conversation | null;
  messages: Message[];
  onSendMessage?: (message: string) => void;
};

type MessageInputProps = BaseProps & {
  onSend?: (message: string) => void;
};

// =============== 主题配置 ===============
const THEME = {
  header: {
    base: "h-14 border-b flex items-center px-4 gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm flex-shrink-0",
  },
  filters: {
    base: "flex items-center gap-2 px-4 py-2 border-b",
    item: "px-3 py-1.5 text-sm rounded-full transition-all duration-300",
    active: "bg-[#1890FF] text-white shadow-lg shadow-[#1890FF]/20",
    inactive: "text-gray-500 hover:bg-gray-100",
  },
  input: {
    base: "border-t p-4 bg-background",
    toolbar: "flex items-center gap-2 mb-2",
    editor: "flex items-end gap-2",
    actions: "flex items-center gap-1",
    send: "bg-[#1890FF] text-white hover:bg-[#1890FF]/90",
  },
  list: {
    base: "flex-1 overflow-y-auto",
    item: "flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200",
    content: "flex-1 min-w-0",
    name: "text-sm font-medium text-gray-900",
    preview: "text-sm text-gray-500 truncate",
    time: "text-xs text-gray-400",
    unread: "bg-[#1890FF] text-white",
    badge: "ml-2 px-1.5 py-0.5 text-xs rounded-full",
  },
  detail: {
    base: "flex-1 border-l",
    header: "h-14 border-b flex items-center justify-between px-4",
    content: "p-4",
  },
} as const;

// =============== 组件 ===============
export const ConversationHeader = React.forwardRef<HTMLDivElement, ConversationHeaderProps>(
  ({ className, onSearch }, ref) => (
    <div ref={ref} className={cn(THEME.header.base, className)}>
      <Input
        icon={Search}
        placeholder="搜索"
        onChange={onSearch}
        className="flex-1"
      />
      <IconButton icon={MoreHorizontal} variant="ghost" />
    </div>
  )
);

export const ConversationFilters = React.forwardRef<HTMLDivElement, Pick<ConversationListProps, "activeFilter" | "onFilterChange">>(
  ({ activeFilter, onFilterChange }, ref) => (
    <div ref={ref} className={THEME.filters.base}>
      <button
        onClick={() => onFilterChange("all")}
        className={cn(
          THEME.filters.item,
          activeFilter === "all" ? THEME.filters.active : THEME.filters.inactive
        )}
      >
        全部
      </button>
      <button
        onClick={() => onFilterChange("unread")}
        className={cn(
          THEME.filters.item,
          activeFilter === "unread" ? THEME.filters.active : THEME.filters.inactive
        )}
      >
        未读
      </button>
      <button
        onClick={() => onFilterChange("read")}
        className={cn(
          THEME.filters.item,
          activeFilter === "read" ? THEME.filters.active : THEME.filters.inactive
        )}
      >
        已读
      </button>
    </div>
  )
);

export const MessageInput = React.forwardRef<HTMLDivElement, MessageInputProps>(
  ({ className, onSend }, ref) => {
    const [message, setMessage] = React.useState("");

    const handleSend = () => {
      if (message.trim() && onSend) {
        onSend(message.trim());
        setMessage("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div ref={ref} className={cn(THEME.input.base, className)}>
        <div className={THEME.input.toolbar}>
          <IconButton icon={Smile} variant="ghost" size="sm" title="表情" />
          <IconButton icon={Paperclip} variant="ghost" size="sm" title="附件" />
          <IconButton icon={Image} variant="ghost" size="sm" title="图片" />
          <IconButton icon={FileText} variant="ghost" size="sm" title="文件" />
        </div>
        <div className={THEME.input.editor}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            className="flex-1 min-h-[80px] max-h-[200px] p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1890FF] resize-none"
          />
          <div className={THEME.input.actions}>
            <IconButton icon={Mic} variant="ghost" size="sm" title="语音" />
            <IconButton 
              icon={Send} 
              variant="primary" 
              size="sm" 
              title="发送"
              onClick={handleSend}
              className={cn(!message.trim() && "opacity-50 cursor-not-allowed")}
            />
          </div>
        </div>
      </div>
    );
  }
);

export const ConversationList = React.forwardRef<HTMLDivElement, ConversationListProps>(
  ({ className, conversations, activeFilter, onFilterChange, onConversationClick }, ref) => (
    <div ref={ref} className={cn("w-80 flex flex-col border-r", className)}>
      <ConversationFilters activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <div className={THEME.list.base}>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={THEME.list.item}
            onClick={() => onConversationClick(conversation)}
          >
            <Avatar
              text={conversation.avatar}
              size="md"
              online={conversation.online}
            />
            <div className={THEME.list.content}>
              <div className="flex items-center justify-between">
                <span className={THEME.list.name}>
                  {conversation.name}
                  {conversation.unread && (
                    <span className={cn(THEME.list.badge, THEME.list.unread)}>
                      新消息
                    </span>
                  )}
                </span>
                <span className={THEME.list.time}>{conversation.lastMessageTime}</span>
              </div>
              <p className={THEME.list.preview}>{conversation.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

export const ConversationDetail = React.forwardRef<HTMLDivElement, ConversationDetailProps>(
  ({ className, conversation, messages, onSendMessage }, ref) => (
    <div ref={ref} className={cn("flex-1 flex flex-col", className)}>
      {conversation ? (
        <>
          <div className={THEME.detail.header}>
            <div className="flex items-center gap-3">
              <Avatar text={conversation.avatar} size="md" />
              <div>
                <h3 className="font-medium">{conversation.name}</h3>
                <p className="text-sm text-gray-500">{conversation.online ? "在线" : "离线"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconButton icon={Phone} variant="ghost" title="语音通话" />
              <IconButton icon={Video} variant="ghost" title="视频通话" />
              <IconButton icon={UserPlus} variant="ghost" title="添加成员" />
              <IconButton icon={Star} variant="ghost" title="收藏" />
              <IconButton icon={MoreHorizontal} variant="ghost" title="更多" />
            </div>
          </div>
          <div className={cn(THEME.detail.content, "flex-1 overflow-y-auto")}>
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{message.time}</span>
                </div>
                <div className="flex items-start gap-2 mt-1">
                  <Avatar text={message.sender.avatar} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{message.sender.name}</p>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <MessageInput onSend={onSendMessage} />
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          请选择一个会话
        </div>
      )}
    </div>
  )
); 
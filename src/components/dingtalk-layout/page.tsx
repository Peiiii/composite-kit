"use client";

import {
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  MessageCircle,
  MoreHorizontal,
  Search,
  Settings,
  Users,
} from "lucide-react";
import * as React from "react";
import { Header, Layout, Nav } from "./components/layout";
import {
  Conversation,
  ConversationDetail,
  ConversationList,
} from "./components/message";
import { useConversationState } from "./hooks/use-conversation-state";

// =============== 导航配置 ===============
const NAV_ITEMS = [
  { id: "message", icon: MessageCircle, label: "消息" },
  { id: "contacts", icon: Users, label: "联系人" },
  { id: "calendar", icon: Calendar, label: "日历" },
  { id: "docs", icon: FileText, label: "文档" },
  { id: "settings", icon: Settings, label: "设置" },
] as const;

const NAV_BOTTOM_ITEMS = [
  { id: "help", icon: HelpCircle, label: "帮助" },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];
/**
 *   id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unread?: boolean;
  online?: boolean;
 */
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    lastMessage: "Hello, how are you?",
    lastMessageTime: "2021-01-01",
    unread: true,
    online: true,
  },
  {
    id: "2",
    avatar: "https://via.placeholder.com/150",
    name: "Jane Smith",
    lastMessage: "I'm good, thank you!",
    lastMessageTime: "2021-01-02",
    unread: false,
    online: false,
  },
] as const;

// =============== 主组件 ===============
export default function DingTalkLayout() {
  const [activeNav, setActiveNav] = React.useState<NavId>(NAV_ITEMS[0].id);
  const {
    activeFilter,
    setActiveFilter,
    setActiveConversation,
    getFilteredConversations,
    getActiveConversation,
  } = useConversationState([...MOCK_CONVERSATIONS]);

  const handleNavClick = React.useCallback((id: string) => {
    setActiveNav(id as NavId);
  }, []);

  const handleConversationClick = React.useCallback(
    (conversation: Conversation) => {
      setActiveConversation(conversation.id);
    },
    [setActiveConversation]
  );

  return (
    <Layout
      nav={
        <Nav
          items={NAV_ITEMS}
          bottomItems={NAV_BOTTOM_ITEMS}
          activeId={activeNav}
          onItemClick={handleNavClick}
        />
      }
      header={
        <Header
          title="消息"
          actions={[
            { icon: Search, title: "搜索" },
            { icon: Bell, title: "通知" },
            { icon: MoreHorizontal, title: "更多" },
          ]}
        />
      }
    >
      <ConversationList
        conversations={getFilteredConversations()}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onConversationClick={handleConversationClick}
      />
      <ConversationDetail
        conversation={getActiveConversation()}
        messages={[]}
      />
    </Layout>
  );
}

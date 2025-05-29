"use client";

import {
  Calendar,
  FileText,
  HelpCircle,
  MessageCircle,
  Settings,
  Users,
  Bell,
  Search,
  MoreHorizontal,
} from "lucide-react";
import * as React from "react";
import { Header, Layout, Nav } from "./components/layout";
import { MessageDetail, MessageList } from "./components/message";
import { useMessageState } from "./hooks/useMessageState";

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

// =============== 主组件 ===============
export default function DingTalkLayout() {
  const [activeNav, setActiveNav] = React.useState<NavId>(NAV_ITEMS[0].id);
  const {
    filteredMessages,
    activeMessage,
    activeFilter,
    handleFilterChange,
    handleMessageClick,
  } = useMessageState();

  const handleNavClick = React.useCallback((id: string) => {
    setActiveNav(id as NavId);
  }, []);

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
      <MessageList
        messages={filteredMessages}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onMessageClick={handleMessageClick}
      />
      <MessageDetail message={activeMessage} />
    </Layout>
  );
}

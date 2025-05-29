import * as React from "react";
import { MOCK_MESSAGES } from "../constants";

type Message = {
  id: string;
  avatar: string;
  name: string;
  content: string;
  time: string;
  unread?: boolean;
};

type MessageFilter = "all" | "unread" | "read";

export function useMessageState() {
  const [messages] = React.useState<Message[]>([...MOCK_MESSAGES]);
  const [activeMessage, setActiveMessage] = React.useState<Message | null>(
    null
  );
  const [activeFilter, setActiveFilter] = React.useState<MessageFilter>("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredMessages = React.useMemo(() => {
    let filtered = messages;

    // 应用过滤器
    if (activeFilter === "unread") {
      filtered = filtered.filter((msg) => msg.unread);
    } else if (activeFilter === "read") {
      filtered = filtered.filter((msg) => !msg.unread);
    }

    // 应用搜索
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(query) ||
          msg.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [messages, activeFilter, searchQuery]);

  const handleSearch = React.useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleFilterChange = React.useCallback((filter: MessageFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleMessageClick = React.useCallback((message: Message) => {
    setActiveMessage(message);
  }, []);

  return {
    messages,
    filteredMessages,
    activeMessage,
    activeFilter,
    searchQuery,
    handleSearch,
    handleFilterChange,
    handleMessageClick,
  };
}

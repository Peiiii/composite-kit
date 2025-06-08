import { useState, useCallback } from "react";
import { Conversation } from "../components/conversation";

export interface ConversationState {
  activeFilter: "all" | "unread" | "read";
  activeConversationId: string | null;
  conversations: Conversation[];
}

export function useConversationState(initialConversations: Conversation[] = []) {
  const [state, setState] = useState<ConversationState>({
    activeFilter: "all",
    activeConversationId: null,
    conversations: initialConversations,
  });

  const setActiveFilter = useCallback((filter: ConversationState["activeFilter"]) => {
    setState(prev => ({ ...prev, activeFilter: filter }));
  }, []);

  const setActiveConversation = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, activeConversationId: id }));
  }, []);

  const getFilteredConversations = useCallback(() => {
    switch (state.activeFilter) {
      case "unread":
        return state.conversations.filter(conv => conv.unread);
      case "read":
        return state.conversations.filter(conv => !conv.unread);
      default:
        return state.conversations;
    }
  }, [state.activeFilter, state.conversations]);

  const getActiveConversation = useCallback(() => {
    if (!state.activeConversationId) return null;
    return state.conversations.find(conv => conv.id === state.activeConversationId) || null;
  }, [state.activeConversationId, state.conversations]);

  return {
    ...state,
    setActiveFilter,
    setActiveConversation,
    getFilteredConversations,
    getActiveConversation,
  };
} 
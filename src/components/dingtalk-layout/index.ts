import { Header, Layout, Nav, type NavItem } from "./components/layout";
import { ConversationList, ConversationDetail } from "./components/conversation";
import { Avatar } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Switch, type SwitchItem } from "./components/switch";
export { useConversationState } from "./hooks/use-conversation-state";

export const Dtl = {
  Header,
  Layout,
  Nav,
  ConversationList,
  ConversationDetail,
  Avatar,
  Button,
  Input,
  Switch,
};

export type { NavItem, SwitchItem };
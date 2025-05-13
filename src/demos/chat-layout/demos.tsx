import { DemoConfig } from "@/components/demo-gallery";
import ChatLayoutDemo from "./page";
import WeChatLayoutDemo from "../wechat-layout/page";
import QQLayoutDemo from "../qq-layout/page";

export const chatLayoutDemos: DemoConfig[] = [
  {
    id: "wechat-layout",
    title: "微信布局",
    component: <WeChatLayoutDemo />,
    description: "一个类似微信的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化", "微信"],
  },
  {
    id: "qq-layout",
    title: "QQ 布局",
    component: <QQLayoutDemo />,
    description: "一个类似 QQ 的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化", "QQ"],
  },
  {
    id: "chat-layout",
    title: "聊天应用布局",
    component: <ChatLayoutDemo />,
    description: "一个类似 Discord/微信的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化"],
  },
]; 
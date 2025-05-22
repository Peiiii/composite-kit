import * as React from "react";
import WechatLayout from "./page";
import WechatLayout2 from "@/components/wechat-layout/wechat-layout";

export const wechatLayoutDemos = [
  {
    id: "wechat-layout",
    title: "微信布局",
    component: <WechatLayout />,
    description: "模拟微信桌面版的布局界面，包含聊天列表和聊天内容区域",
    category: "布局组件",
    tags: ["wechat", "聊天", "布局"],
  },
  {
    id: "wechat-layout-2",
    title: "微信布局2",
    component: <WechatLayout2 />,
    description: "模拟微信桌面版的布局界面，包含聊天列表和聊天内容区域",
  },
];

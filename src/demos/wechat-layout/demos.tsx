import * as React from "react";
import WechatLayout from "./page";
import WechatLayout2 from "@/components/wechat-layout/wechat-layout";
import BasicDemo from "@/components/wechat-layout/examples/basic-demo";

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
    category: "布局组件",
    tags: ["wechat", "聊天", "布局"],
  },
  {
    id: "wechat-layout-3",
    title: "微信风格笔记应用",
    component: <BasicDemo />,
    description: "一个微信风格的笔记应用，包含笔记列表、笔记详情、笔记编辑等功能",
    category: "笔记应用",
    tags: ["wechat", "笔记", "应用"],
  },
];

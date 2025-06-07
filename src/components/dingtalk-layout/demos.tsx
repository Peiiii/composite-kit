import { DtlBasicDemo } from "@/components/dingtalk-layout/examples/basic-demo";
import DingTalkLayoutDemo from "./page";

export const dingtalkLayoutDemos = [
  {
    id: "dingtalk-layout",
    title: "钉钉布局",
    component: <DingTalkLayoutDemo />,
    description: "模仿钉钉的界面布局，包含工作台、消息、通讯录等功能模块",
    category: "布局组件",
    tags: ["dingtalk", "布局", "企业应用"],
  },
  {
    id: "dingtalk-layout-basic",
    title: "钉钉布局基础示例",
    component: <DtlBasicDemo />,
    description: "基础的钉钉布局示例，包含工作台、消息、通讯录等功能模块",
    category: "布局组件",
    tags: ["dingtalk", "布局", "企业应用"],
  },
];

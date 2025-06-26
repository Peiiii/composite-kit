import { DemoConfig } from "@/components/demo-gallery";
import ActivityBarComposite from "./page";
import ActivityBarConfigurable from "../activity-bar-configurable/page";
import ControlledUncontrolledDemo from "./controlled-uncontrolled-demo";

export const activityBarDemos: DemoConfig[] = [
  {
    id: "activity-bar-configurable",
    title: "Activity Bar (配置模式)",
    component: <ActivityBarConfigurable />,
    description: "使用配置对象的方式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "配置模式"],
  },
  {
    id: "activity-bar-composite",
    title: "Activity Bar (复合组件模式)",
    component: <ActivityBarComposite />,
    description: "使用复合组件模式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "复合组件"],
  },
  {
    id: "activity-bar-controlled-uncontrolled",
    title: "Activity Bar (受控/不受控模式)",
    component: <ControlledUncontrolledDemo />,
    description: "展示受控和不受控两种模式的使用方法",
    category: "布局组件",
    tags: ["activity-bar", "受控模式", "不受控模式"],
  },
]; 
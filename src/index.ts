// 导出样式
import "./index.css";

// 导出所有组件
export * from "./components/activity-bar";
export * from "./components/demo-gallery";
export * from "./components/theme";
export * from "./components/resizable-panel";
export * from "./components/mobile-nav";
export { VSCodeLayout } from "./components/vscode-layout";
// 导出类型
export type { DemoConfig } from "./components/demo-gallery";
export type {
  ActivityItemConfig,
  ActivityGroupConfig,
  ActivityHeaderConfig,
  ActivityBarConfig,
} from "./components/activity-bar";
export type { Theme, ThemeSwitcherProps } from "./components/theme";

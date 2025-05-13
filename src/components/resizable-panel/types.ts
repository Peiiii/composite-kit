import { ReactNode } from "react";
import type { ImperativePanelHandle, ImperativePanelGroupHandle } from "react-resizable-panels";

export interface ResizablePanelRef {
  /**
   * 展开面板
   */
  expand: () => void;
  /**
   * 折叠面板
   */
  collapse: () => void;
  /**
   * 调整面板大小
   */
  resize: (size: number) => void;
  /**
   * 获取面板是否已折叠
   */
  isCollapsed: () => boolean;
  /**
   * 获取面板当前大小
   */
  getSize: () => number;
}

export interface ResizablePanelProps {
  /**
   * 面板的唯一标识
   */
  id?: string;
  /**
   * 面板的默认大小（百分比）
   */
  defaultSize?: number;
  /**
   * 面板的最小大小（百分比）
   */
  minSize?: number;
  /**
   * 面板的最大大小（百分比）
   */
  maxSize?: number;
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  /**
   * 折叠时的最小大小
   */
  collapsedSize?: number;
  /**
   * 面板内容
   */
  children: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 是否显示折叠按钮
   */
  showCollapseButton?: boolean;
  /**
   * 折叠按钮的位置
   */
  collapseButtonPosition?: "start" | "end";
  /**
   * 折叠按钮的图标
   */
  collapseButtonIcon?: ReactNode;
  /**
   * 折叠时的动画持续时间（毫秒）
   */
  collapseAnimationDuration?: number;
  /**
   * 是否启用双击重置大小
   */
  enableDoubleClickReset?: boolean;
  /**
   * 双击重置时的大小
   */
  doubleClickResetSize?: number;
  /**
   * 面板大小变化时的回调
   */
  onResize?: (size: number) => void;
  /**
   * 拖拽状态变化时的回调
   */
  onDragging?: (isDragging: boolean) => void;
  /**
   * 面板展开时的回调
   */
  onExpand?: () => void;
  /**
   * 面板折叠时的回调
   */
  onCollapse?: () => void;
}

export interface ResizablePanelGroupProps {
  /**
   * 面板组的方向
   */
  direction?: "horizontal" | "vertical";
  /**
   * 面板组内容
   */
  children: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 是否自动保存面板大小
   */
  autoSaveId?: string;
  /**
   * 布局变化时的回调
   */
  onLayout?: (sizes: number[]) => void;
  /**
   * 是否启用网格对齐
   */
  enableGridSnap?: boolean;
  /**
   * 网格大小（像素）
   */
  gridSize?: number;
  /**
   * 拖拽时的步进值（像素）
   */
  stepSize?: number;
  /**
   * 是否启用键盘操作
   */
  enableKeyboard?: boolean;
  /**
   * 是否显示拖拽时的预览
   */
  showDragPreview?: boolean;
  /**
   * 拖拽时的预览样式
   */
  dragPreviewStyle?: React.CSSProperties;
}

export interface ResizableHandleProps {
  /**
   * 是否禁用拖拽
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 拖拽时的视觉反馈样式
   */
  dragStyle?: React.CSSProperties;
  /**
   * 是否显示拖拽时的视觉反馈
   */
  showDragFeedback?: boolean;
}

export type ResizablePanelGroupRef = ImperativePanelGroupHandle; 
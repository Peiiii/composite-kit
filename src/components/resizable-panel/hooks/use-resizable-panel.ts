import * as React from "react";
import type { ResizablePanelRef } from "../types";

type ResizablePanelToggleOptions = {
  /**
   * 面板折叠时的回调函数
   */
  onCollapse?: () => void;
  /**
   * 面板展开时的回调函数
   */
  onExpand?: () => void;
  /**
   * 面板初始是否折叠
   */
  defaultCollapsed?: boolean;
};

/**
 * 用于管理可调整大小面板的折叠状态的Hook
 * 
 * @param options 配置选项
 * @returns 面板引用、折叠状态和处理函数
 * 
 * @example
 * ```tsx
 * const { ref, isCollapsed, toggle, expand, collapse } = useResizablePanel();
 * 
 * return (
 *   <ResizablePanel.Panel
 *     ref={ref}
 *     collapsible
 *     onExpand={() => setIsExpanded(true)}
 *     onCollapse={() => setIsExpanded(false)}
 *   >
 *     <div>
 *       <button onClick={toggle}>
 *         {isCollapsed ? "展开" : "折叠"}
 *       </button>
 *     </div>
 *   </ResizablePanel.Panel>
 * );
 * ```
 */
export function useResizablePanel(options: ResizablePanelToggleOptions = {}) {
  const { onCollapse, onExpand, defaultCollapsed = false } = options;
  const panelRef = React.useRef<ResizablePanelRef>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const expand = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.expand();
      setIsCollapsed(false);
      onExpand?.();
    }
  }, [onExpand]);

  const collapse = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.collapse();
      setIsCollapsed(true);
      onCollapse?.();
    }
  }, [onCollapse]);

  const toggle = React.useCallback(() => {
    if (isCollapsed) {
      expand();
    } else {
      collapse();
    }
  }, [isCollapsed, expand, collapse]);

  const handleExpand = React.useCallback(() => {
    setIsCollapsed(false);
    onExpand?.();
  }, [onExpand]);

  const handleCollapse = React.useCallback(() => {
    setIsCollapsed(true);
    onCollapse?.();
  }, [onCollapse]);

  return {
    ref: panelRef,
    isCollapsed,
    toggle,
    expand,
    collapse,
    handleExpand,
    handleCollapse,
  };
} 
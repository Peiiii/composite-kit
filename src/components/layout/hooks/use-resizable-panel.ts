import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export function useResizablePanel() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const ref = React.useRef<ImperativePanelHandle>(null);

  const toggle = React.useCallback(() => {
    if (ref.current) {
      if (isCollapsed) {
        ref.current.expand();
      } else {
        ref.current.collapse();
      }
    }
    setIsCollapsed((prev) => !prev);
  }, [isCollapsed]);

  const handleExpand = React.useCallback(() => {
    if (ref.current) {
      ref.current.expand();
    }
    setIsCollapsed(false);
  }, []);

  const handleCollapse = React.useCallback(() => {
    if (ref.current) {
      ref.current.collapse();
    }
    setIsCollapsed(true);
  }, []);

  return {
    ref: ref as React.RefObject<ImperativePanelHandle>,
    isCollapsed,
    toggle,
    handleExpand,
    handleCollapse,
  };
} 
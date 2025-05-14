import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

interface PanelState {
  isCollapsed: boolean;
  panelRef: React.RefObject<ImperativePanelHandle>;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
}

export function usePanelState(): PanelState {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const panelRef = React.useRef<ImperativePanelHandle>(null);

  const collapse = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.collapse();
      setIsCollapsed(true);
    }
  }, []);

  const expand = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.expand();
      setIsCollapsed(false);
    }
  }, []);

  const toggle = React.useCallback(() => {
    if (isCollapsed) {
      expand();
    } else {
      collapse();
    }
  }, [isCollapsed, collapse, expand]);

  return {
    isCollapsed,
    panelRef: panelRef as React.RefObject<ImperativePanelHandle>,
    toggle,
    collapse,
    expand,
  };
} 
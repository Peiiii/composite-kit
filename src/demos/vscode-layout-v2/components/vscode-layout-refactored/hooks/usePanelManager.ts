import { useState, useRef, useCallback } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { PanelState } from "../config/layoutTypes";

export function usePanelManager() {
  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanelRef = useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = useRef<ImperativePanelHandle>(null);

  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = useState(false);

  const createPanelState = (
    ref: React.RefObject<ImperativePanelHandle>,
    isCollapsed: boolean,
    setIsCollapsed: (value: boolean) => void
  ): PanelState => ({
    isCollapsed,
    ref,
    expand: useCallback(() => {
      if (ref.current) {
        ref.current.expand();
        setIsCollapsed(false);
      }
    }, [ref, setIsCollapsed]),
    collapse: useCallback(() => {
      if (ref.current) {
        ref.current.collapse();
        setIsCollapsed(true);
      }
    }, [ref, setIsCollapsed]),
    toggle: useCallback(() => {
      if (isCollapsed) {
        if (ref.current) {
          ref.current.expand();
          setIsCollapsed(false);
        }
      } else {
        if (ref.current) {
          ref.current.collapse();
          setIsCollapsed(true);
        }
      }
    }, [ref, isCollapsed, setIsCollapsed]),
  });

  const leftPanel = createPanelState(
    leftPanelRef as React.RefObject<ImperativePanelHandle>,
    isLeftSidebarCollapsed,
    setIsLeftSidebarCollapsed
  );

  const rightPanel = createPanelState(
    rightPanelRef as React.RefObject<ImperativePanelHandle>,
    isRightSidebarCollapsed,
    setIsRightSidebarCollapsed
  );

  const bottomPanel = createPanelState(
    bottomPanelRef as React.RefObject<ImperativePanelHandle>,
    isBottomPanelCollapsed,
    setIsBottomPanelCollapsed
  );

  return {
    leftPanel,
    rightPanel,
    bottomPanel,
  };
} 
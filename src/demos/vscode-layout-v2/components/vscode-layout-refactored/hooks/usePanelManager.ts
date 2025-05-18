import { useState, useRef, useCallback, useEffect } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { PanelState } from "../config/layoutTypes";

const PANEL_STATE_KEY = "vscode-layout-panel-state";

interface PanelStateStorage {
  leftPanel: boolean;
  rightPanel: boolean;
  bottomPanel: boolean;
}

export interface PanelManagerState {
  leftPanel: PanelState;
  rightPanel: PanelState;
  bottomPanel: PanelState;
}

export interface PanelManagerActions {
  resetPanels: () => void;
  savePanelState: () => void;
  loadPanelState: () => void;
}

export type UsePanelManagerReturn = PanelManagerState & PanelManagerActions;

export function usePanelManager(): UsePanelManagerReturn {
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
  ): PanelState => {
    const expand = () => {
      if (ref.current) {
        ref.current.expand();
        setIsCollapsed(false);
      }
    };

    const collapse = () => {
      if (ref.current) {
        ref.current.collapse();
        setIsCollapsed(true);
      }
    };

    const toggle = () => {
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
    };

    return {
      isCollapsed,
      ref,
      expand,
      collapse,
      toggle,
    };
  };

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

  const savePanelState = useCallback(() => {
    const state: PanelStateStorage = {
      leftPanel: isLeftSidebarCollapsed,
      rightPanel: isRightSidebarCollapsed,
      bottomPanel: isBottomPanelCollapsed,
    };
    localStorage.setItem(PANEL_STATE_KEY, JSON.stringify(state));
  }, [isLeftSidebarCollapsed, isRightSidebarCollapsed, isBottomPanelCollapsed]);

  const loadPanelState = useCallback(() => {
    const savedState = localStorage.getItem(PANEL_STATE_KEY);
    if (savedState) {
      const state: PanelStateStorage = JSON.parse(savedState);
      setIsLeftSidebarCollapsed(state.leftPanel);
      setIsRightSidebarCollapsed(state.rightPanel);
      setIsBottomPanelCollapsed(state.bottomPanel);
    }
  }, []);

  const resetPanels = useCallback(() => {
    setIsLeftSidebarCollapsed(false);
    setIsRightSidebarCollapsed(false);
    setIsBottomPanelCollapsed(false);
    localStorage.removeItem(PANEL_STATE_KEY);
  }, []);

  // 在组件挂载时加载保存的面板状态
  useEffect(() => {
    loadPanelState();
  }, [loadPanelState]);

  // 在面板状态改变时保存
  useEffect(() => {
    savePanelState();
  }, [savePanelState]);

  return {
    leftPanel,
    rightPanel,
    bottomPanel,
    resetPanels,
    savePanelState,
    loadPanelState,
  };
} 
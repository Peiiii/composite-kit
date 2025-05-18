import type { ImperativePanelHandle } from "react-resizable-panels";

export interface PanelState {
  isCollapsed: boolean;
  ref: React.RefObject<ImperativePanelHandle>;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
}

export const createPanelState = (
  ref: React.RefObject<ImperativePanelHandle>,
  isCollapsed: boolean = false
): PanelState => {
  const expand = () => {
    if (ref.current) {
      ref.current.expand();
    }
  };

  const collapse = () => {
    if (ref.current) {
      ref.current.collapse();
    }
  };

  const toggle = () => {
    if (ref.current) {
      if (isCollapsed) {
        ref.current.expand();
      } else {
        ref.current.collapse();
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

export const savePanelState = (panelId: string, state: PanelState): void => {
  localStorage.setItem(
    `panel-${panelId}`,
    JSON.stringify({
      isCollapsed: state.isCollapsed,
    })
  );
};

export const loadPanelState = (
  panelId: string
): { isCollapsed: boolean } | null => {
  const state = localStorage.getItem(`panel-${panelId}`);
  return state ? JSON.parse(state) : null;
};

export const getStoredPanelState = (): Record<
  string,
  { isCollapsed: boolean }
> | null => {
  const stored = localStorage.getItem("vscode-layout-panel-state");
  return stored ? JSON.parse(stored) : null;
};

export const setStoredPanelState = (
  state: Record<string, { isCollapsed: boolean }>
): void => {
  localStorage.setItem("vscode-layout-panel-state", JSON.stringify(state));
};

export const resizePanelState = (state: PanelState, newSize: number): void => {
  if (state.ref.current) {
    state.ref.current.resize(newSize);
  }
};

// getDefaultPanelState 已被移除，如需默认面板状态请在业务层自行定义类型安全对象。

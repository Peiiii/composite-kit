export const SHORTCUTS = {
  // 文件操作
  NEW_FILE: { key: 'n', ctrlKey: true },
  OPEN_FILE: { key: 'o', ctrlKey: true },
  SAVE_FILE: { key: 's', ctrlKey: true },
  SAVE_ALL: { key: 's', ctrlKey: true, shiftKey: true },
  CLOSE_FILE: { key: 'w', ctrlKey: true },
  CLOSE_ALL: { key: 'w', ctrlKey: true, shiftKey: true },

  // 编辑操作
  UNDO: { key: 'z', ctrlKey: true },
  REDO: { key: 'y', ctrlKey: true },
  CUT: { key: 'x', ctrlKey: true },
  COPY: { key: 'c', ctrlKey: true },
  PASTE: { key: 'v', ctrlKey: true },
  SELECT_ALL: { key: 'a', ctrlKey: true },

  // 视图操作
  TOGGLE_SIDEBAR: { key: 'b', ctrlKey: true },
  TOGGLE_TERMINAL: { key: '`', ctrlKey: true },
  TOGGLE_FULLSCREEN: { key: 'f11' },
  ZOOM_IN: { key: '+', ctrlKey: true },
  ZOOM_OUT: { key: '-', ctrlKey: true },
  RESET_ZOOM: { key: '0', ctrlKey: true },

  // 搜索和导航
  FIND: { key: 'f', ctrlKey: true },
  FIND_REPLACE: { key: 'h', ctrlKey: true },
  GO_TO_FILE: { key: 'p', ctrlKey: true },
  GO_TO_LINE: { key: 'g', ctrlKey: true },
  GO_TO_SYMBOL: { key: 'o', ctrlKey: true, shiftKey: true },

  // 命令面板
  COMMAND_PALETTE: { key: 'p', ctrlKey: true, shiftKey: true },
  QUICK_OPEN: { key: 'p', ctrlKey: true },

  // 主题切换
  TOGGLE_THEME: { key: 'k', ctrlKey: true, shiftKey: true },
} as const;

export type ShortcutKey = keyof typeof SHORTCUTS; 
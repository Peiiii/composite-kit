export const THEMES = {
  LIGHT: {
    name: 'light',
    colors: {
      // 基础颜色
      background: '#ffffff',
      foreground: '#000000',
      primary: '#007acc',
      secondary: '#6c757d',
      accent: '#3794ff',
      muted: '#6c757d',
      border: '#e9ecef',

      // 文本颜色
      text: {
        primary: '#000000',
        secondary: '#6c757d',
        muted: '#adb5bd',
        inverse: '#ffffff',
      },

      // 状态颜色
      status: {
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8',
      },

      // 面板颜色
      panel: {
        background: '#f8f9fa',
        border: '#e9ecef',
        header: {
          background: '#f1f3f5',
          text: '#495057',
        },
      },

      // 编辑器颜色
      editor: {
        background: '#ffffff',
        foreground: '#000000',
        lineHighlight: '#f8f9fa',
        selection: '#add6ff',
        findMatch: '#ffd700',
        findMatchHighlight: '#ffd70080',
        gutter: {
          background: '#f8f9fa',
          foreground: '#6c757d',
        },
      },

      // 活动栏颜色
      activityBar: {
        background: '#f8f9fa',
        foreground: '#6c757d',
        active: '#007acc',
        inactive: '#adb5bd',
      },

      // 状态栏颜色
      statusBar: {
        background: '#007acc',
        foreground: '#ffffff',
        debug: '#ffc107',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
    },
  },

  DARK: {
    name: 'dark',
    colors: {
      // 基础颜色
      background: '#1e1e1e',
      foreground: '#ffffff',
      primary: '#007acc',
      secondary: '#6c757d',
      accent: '#3794ff',
      muted: '#6c757d',
      border: '#2d2d2d',

      // 文本颜色
      text: {
        primary: '#ffffff',
        secondary: '#adb5bd',
        muted: '#6c757d',
        inverse: '#000000',
      },

      // 状态颜色
      status: {
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8',
      },

      // 面板颜色
      panel: {
        background: '#252526',
        border: '#2d2d2d',
        header: {
          background: '#333333',
          text: '#ffffff',
        },
      },

      // 编辑器颜色
      editor: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        lineHighlight: '#2d2d2d',
        selection: '#264f78',
        findMatch: '#ffd700',
        findMatchHighlight: '#ffd70080',
        gutter: {
          background: '#1e1e1e',
          foreground: '#858585',
        },
      },

      // 活动栏颜色
      activityBar: {
        background: '#333333',
        foreground: '#858585',
        active: '#007acc',
        inactive: '#6c757d',
      },

      // 状态栏颜色
      statusBar: {
        background: '#007acc',
        foreground: '#ffffff',
        debug: '#ffc107',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
    },
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = typeof THEMES[ThemeKey]; 
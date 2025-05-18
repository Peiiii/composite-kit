import type { KeyboardShortcut, ModifierKey } from '../types/keyboard';

export const parseShortcut = (shortcut: string): KeyboardShortcut => {
  const parts = shortcut.toLowerCase().split('+');
  return {
    key: parts.pop() || '',
    modifiers: parts.map(mod => mod.trim() as ModifierKey),
  };
};

export const formatShortcut = (shortcut: KeyboardShortcut): string => {
  const { key, modifiers } = shortcut;
  return [...modifiers, key].join('+');
};

export const isShortcutMatch = (
  event: KeyboardEvent,
  shortcut: KeyboardShortcut
): boolean => {
  const { key, modifiers } = shortcut;
  
  // 检查修饰键
  const hasModifiers = modifiers.every((mod: ModifierKey) => {
    switch (mod) {
      case 'ctrl':
        return event.ctrlKey;
      case 'alt':
        return event.altKey;
      case 'shift':
        return event.shiftKey;
      case 'meta':
        return event.metaKey;
      default:
        return false;
    }
  });
  
  // 检查主键
  const keyMatch = event.key.toLowerCase() === key.toLowerCase();
  
  return hasModifiers && keyMatch;
};

export const getPlatformModifier = (): string => {
  return navigator.platform.includes('Mac') ? '⌘' : 'Ctrl';
};

export const formatShortcutForDisplay = (shortcut: string): string => {
  return shortcut
    .split('+')
    .map(part => {
      switch (part.trim().toLowerCase()) {
        case 'ctrl':
          return getPlatformModifier();
        case 'alt':
          return '⌥';
        case 'shift':
          return '⇧';
        case 'meta':
          return '⌘';
        default:
          return part.trim();
      }
    })
    .join(' ');
}; 
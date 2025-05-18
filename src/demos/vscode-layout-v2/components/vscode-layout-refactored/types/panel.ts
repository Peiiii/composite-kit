import React from 'react';

export interface PanelConfig {
  isCollapsed: boolean;
  size: number;
}

export interface PanelState {
  left: PanelConfig;
  right: PanelConfig;
  bottom: PanelConfig;
}

export interface PanelActions {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  resize: (size: number) => void;
}

export type PanelPosition = 'left' | 'right' | 'bottom';

export interface PanelProps {
  position: PanelPosition;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
} 
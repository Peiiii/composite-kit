import React from 'react';
import { Icon } from '../Icon';

interface PanelProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  isCollapsed,
  onToggle,
  children,
  position = 'left',
  className = '',
}) => {
  const getToggleIcon = () => {
    switch (position) {
      case 'left':
        return isCollapsed ? 'CHEVRON_RIGHT' : 'CHEVRON_LEFT';
      case 'right':
        return isCollapsed ? 'CHEVRON_LEFT' : 'CHEVRON_RIGHT';
      case 'bottom':
        return isCollapsed ? 'CHEVRON_UP' : 'CHEVRON_DOWN';
      default:
        return 'CHEVRON_LEFT';
    }
  };

  return (
    <div className={`h-full flex flex-col border-r ${className}`}>
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">{title}</span>
        <button
          className="p-1 rounded hover:bg-gray-200"
          onClick={onToggle}
          title={isCollapsed ? "展开面板" : "折叠面板"}
        >
          <Icon name={getToggleIcon()} />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}; 
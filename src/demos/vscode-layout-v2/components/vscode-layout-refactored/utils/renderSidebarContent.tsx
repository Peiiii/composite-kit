import React from 'react';
import { Folder, Search, GitBranch, Play, LayoutGrid } from 'lucide-react';
import type { SidebarViewProps, ExplorerViewProps } from '../types/layout';
import { ExplorerView } from '../views/ExplorerView';
import { SearchView } from '../views/SearchView';
import { GitView } from '../views/GitView';
import { DebugView } from '../views/DebugView';
import { ExtensionsView } from '../views/ExtensionsView';

interface CommonSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const renderSidebarContent = (
  activeActivityItem: string,
  props: SidebarViewProps,
  isCollapsed: boolean,
  onToggle: () => void
): React.ReactNode => {
  switch (activeActivityItem) {
    case 'explorer':
      if ('files' in props && 'activeFile' in props && 'openFile' in props) {
        return <ExplorerView {...(props as ExplorerViewProps)} isCollapsed={isCollapsed} onToggle={onToggle} />;
      }
      return null;
    case 'search':
      if ('onSearch' in props) {
        return <SearchView {...props} isCollapsed={isCollapsed} onToggle={onToggle} />;
      }
      return null;
    case 'git':
      if ('changes' in props) {
        return <GitView {...props} isCollapsed={isCollapsed} onToggle={onToggle} />;
      }
      return null;
    case 'debug':
      if ('breakpoints' in props) {
        return <DebugView {...props} isCollapsed={isCollapsed} onToggle={onToggle} />;
      }
      return null;
    case 'extensions':
      if ('extensions' in props) {
        return <ExtensionsView {...props} isCollapsed={isCollapsed} onToggle={onToggle} />;
      }
      return null;
    default:
      return null;
  }
};

export const getSidebarTitle = (activeActivityItem: string): string => {
  switch (activeActivityItem) {
    case 'explorer':
      return '资源管理器';
    case 'search':
      return '搜索';
    case 'git':
      return '源代码管理';
    case 'debug':
      return '运行和调试';
    case 'extensions':
      return '扩展';
    default:
      return '';
  }
};

export const getSidebarIcon = (activeActivityItem: string): React.ReactNode => {
  switch (activeActivityItem) {
    case 'explorer':
      return <Folder className="h-5 w-5" />;
    case 'search':
      return <Search className="h-5 w-5" />;
    case 'git':
      return <GitBranch className="h-5 w-5" />;
    case 'debug':
      return <Play className="h-5 w-5" />;
    case 'extensions':
      return <LayoutGrid className="h-5 w-5" />;
    default:
      return null;
  }
}; 
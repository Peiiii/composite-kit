import * as React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { X } from "lucide-react";

export interface MainPanelTab {
  /**
   * 标签ID
   */
  id: string;
  /**
   * 标签标题
   */
  label: string;
  /**
   * 标签图标
   */
  icon?: React.ReactNode;
  /**
   * 标签内容
   */
  content: React.ReactNode;
  /**
   * 是否可关闭
   */
  closable?: boolean;
}

export interface MainPanelAreaProps {
  /**
   * 标签列表
   */
  tabs: MainPanelTab[];
  /**
   * 当前活动标签ID
   */
  activeTabId: string;
  /**
   * 标签切换回调
   */
  onTabChange: (tabId: string) => void;
  /**
   * 标签关闭回调
   */
  onTabClose?: (tabId: string) => void;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 标签栏类名
   */
  tabBarClassName?: string;
  /**
   * 内容区域类名
   */
  contentClassName?: string;
  /**
   * 无标签时显示的内容
   */
  emptyContent?: React.ReactNode;
  /**
   * 底部面板组件
   */
  bottomPanel?: React.ReactNode;
  /**
   * 是否使用垂直面板分组
   */
  useVerticalPanelGroup?: boolean;
  /**
   * 面板分隔线类名
   */
  panelResizeHandleClassName?: string;
}

/**
 * VSCode风格的主面板区域组件
 */
export function MainPanelArea({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  className = "",
  tabBarClassName = "bg-gray-50",
  contentClassName = "",
  emptyContent,
  bottomPanel,
  useVerticalPanelGroup = true,
  panelResizeHandleClassName = "bg-gray-200 hover:bg-blue-500",
}: MainPanelAreaProps) {
  // 获取当前活动标签的内容
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  // 处理标签点击
  const handleTabClick = React.useCallback((tabId: string) => {
    onTabChange(tabId);
  }, [onTabChange]);
  
  // 处理标签关闭
  const handleTabClose = React.useCallback((e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose?.(tabId);
  }, [onTabClose]);
  
  // 渲染标签栏
  const renderTabBar = () => (
    <div className={`border-b flex ${tabBarClassName}`}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`px-3 py-2 flex items-center gap-1 text-sm relative group cursor-pointer ${
            activeTabId === tab.id
              ? 'bg-white'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.icon && (
            <span className="mr-1">{tab.icon}</span>
          )}
          <span>{tab.label}</span>
          
          {tab.closable !== false && onTabClose && (
            <button
              className="ml-1 p-1 rounded-sm hover:bg-gray-200 opacity-60 group-hover:opacity-100"
              onClick={(e) => handleTabClose(e, tab.id)}
              title="关闭"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          
          {activeTabId === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </div>
      ))}
    </div>
  );
  
  // 渲染内容区域
  const renderContent = () => {
    if (tabs.length === 0) {
      return emptyContent || (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>没有打开的文件</p>
        </div>
      );
    }
    
    if (!activeTab) {
      return null;
    }
    
    return (
      <div className={`h-full overflow-auto ${contentClassName}`}>
        {activeTab.content}
      </div>
    );
  };
  
  // 如果有底部面板，使用PanelGroup
  if (bottomPanel && useVerticalPanelGroup) {
    return (
      <div className={`h-full flex flex-col ${className}`}>
        {renderTabBar()}
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="vertical" className="h-full">
            <Panel className="overflow-hidden">
              {renderContent()}
            </Panel>
            {bottomPanel}
          </PanelGroup>
        </div>
      </div>
    );
  }
  
  // 基本渲染
  return (
    <div className={`h-full flex flex-col ${className}`}>
      {renderTabBar()}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      {bottomPanel && !useVerticalPanelGroup && bottomPanel}
    </div>
  );
} 
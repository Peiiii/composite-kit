import * as React from "react";
import { TopBar, TopBarProps } from "./top-bar";
import { ActivityBar, ActivityBarProps, ActivityBarItem } from "./activity-bar";
import { StatusBar, StatusBarProps } from "./status-bar";
import { CommandPalette, CommandPaletteProps, CommandPaletteItem } from "./command-palette";
import { Dialog, DialogProps, InputDialogProps, SelectDialogProps, DialogOption } from "./dialog";
import { PanelLayout, PanelLayoutProps } from "./panel-layout";
import { LeftSidebar, LeftSidebarGroup, LeftSidebarItem, LeftSidebarProps } from "./left-sidebar";
import { RightSidebar, RightSidebarGroup, RightSidebarItem, RightSidebarProps } from "./right-sidebar";
import { BottomPanel, BottomPanelTab, BottomPanelTabGroup, BottomPanelProps, BottomPanelTabProps } from "./bottom-panel";
import { MainPanelArea, MainPanelTab, MainPanelAreaProps } from "./main-panel-area";

/**
 * VSCodeLayout复合组件 - 渐进式重构
 * 
 * 这是一个渐进式重构的复合组件，目标是将纯演示组件拆分为可复用的组件集合
 */

export interface VSCodeLayoutRootProps {
  /**
   * 组件内容 - 已废弃，请使用panelLayoutProps代替
   * @deprecated
   */
  children?: React.ReactNode;
  /**
   * 顶部控制栏的属性
   */
  topBarProps?: Omit<TopBarProps, 'className'>;
  /**
   * 是否显示顶部控制栏
   */
  showTopBar?: boolean;
  /**
   * 顶部控制栏的className
   */
  topBarClassName?: string;
  /**
   * 活动栏的属性
   */
  activityBarProps?: Omit<ActivityBarProps, 'className'>;
  /**
   * 是否显示活动栏
   */
  showActivityBar?: boolean;
  /**
   * 活动栏的className
   */
  activityBarClassName?: string;
  /**
   * 状态栏的属性
   */
  statusBarProps?: Omit<StatusBarProps, 'className'>;
  /**
   * 是否显示状态栏
   */
  showStatusBar?: boolean;
  /**
   * 状态栏的className
   */
  statusBarClassName?: string;
  /**
   * 命令面板的属性
   */
  commandPaletteProps?: Omit<CommandPaletteProps, 'className'>;
  /**
   * 命令面板的className
   */
  commandPaletteClassName?: string;
  /**
   * 对话框的属性
   */
  dialogProps?: Omit<InputDialogProps, 'className'> | Omit<SelectDialogProps, 'className'>;
  /**
   * 对话框的className
   */
  dialogClassName?: string;
  /**
   * 面板布局的属性
   */
  panelLayoutProps?: Omit<PanelLayoutProps, 'className'>;
  /**
   * 面板布局的className
   */
  panelLayoutClassName?: string;
}

// 组件导出
const VSCodeLayoutComposite = {
  /**
   * 布局根组件
   */
  Root: ({
    children,
    topBarProps,
    showTopBar = true,
    topBarClassName,
    activityBarProps,
    showActivityBar = true,
    activityBarClassName,
    statusBarProps,
    showStatusBar = true,
    statusBarClassName,
    commandPaletteProps,
    commandPaletteClassName,
    dialogProps,
    dialogClassName,
    panelLayoutProps,
    panelLayoutClassName,
  }: VSCodeLayoutRootProps) => {
    return (
      <div className="h-full w-full border rounded-md bg-white overflow-hidden flex flex-col">
        {showTopBar && topBarProps && (
          <TopBar {...topBarProps} className={topBarClassName} />
        )}
        <div className="flex-1 flex overflow-hidden">
          {showActivityBar && activityBarProps && (
            <ActivityBar {...activityBarProps} className={activityBarClassName} />
          )}
          <div className="flex-1 overflow-hidden">
            {/* 使用面板布局系统，优先级高于children */}
            {panelLayoutProps ? (
              <PanelLayout {...panelLayoutProps} className={panelLayoutClassName} />
            ) : (
              children
            )}
          </div>
        </div>
        {showStatusBar && statusBarProps && (
          <StatusBar {...statusBarProps} className={statusBarClassName} />
        )}
        
        {/* 浮动组件 */}
        {commandPaletteProps && (
          <CommandPalette {...commandPaletteProps} className={commandPaletteClassName} />
        )}
        
        {dialogProps && (
          <Dialog {...dialogProps} className={dialogClassName} />
        )}
      </div>
    );
  },
  
  /**
   * 顶部控制栏组件
   */
  TopBar,
  
  /**
   * 活动栏组件
   */
  ActivityBar,
  
  /**
   * 状态栏组件
   */
  StatusBar,
  
  /**
   * 命令面板组件
   */
  CommandPalette,
  
  /**
   * 对话框组件
   */
  Dialog,
  
  /**
   * 面板布局系统组件
   */
  PanelLayout,
  
  /**
   * 左侧边栏组件
   */
  LeftSidebar,
  
  /**
   * 左侧边栏分组组件
   */
  LeftSidebarGroup,
  
  /**
   * 左侧边栏项目组件
   */
  LeftSidebarItem,
  
  /**
   * 右侧边栏组件
   */
  RightSidebar,
  
  /**
   * 右侧边栏分组组件
   */
  RightSidebarGroup,
  
  /**
   * 右侧边栏项目组件
   */
  RightSidebarItem,
  
  /**
   * 底部面板组件
   */
  BottomPanel,
  
  /**
   * 底部面板选项卡组件
   */
  BottomPanelTab,
  
  /**
   * 底部面板选项卡组组件
   */
  BottomPanelTabGroup,
  
  /**
   * 主面板区域组件
   */
  MainPanelArea,
};

// 重导出类型，方便使用
export type {
  TopBarProps,
  ActivityBarProps,
  ActivityBarItem,
  StatusBarProps,
  CommandPaletteProps,
  CommandPaletteItem,
  DialogProps,
  InputDialogProps,
  SelectDialogProps,
  DialogOption,
  PanelLayoutProps,
  LeftSidebarProps,
  RightSidebarProps,
  BottomPanelProps,
  BottomPanelTabProps,
  MainPanelAreaProps,
  MainPanelTab,
};

export { VSCodeLayoutComposite }; 
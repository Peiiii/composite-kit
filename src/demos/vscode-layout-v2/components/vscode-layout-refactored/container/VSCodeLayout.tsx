import { Command, Paintbrush } from "lucide-react";
import * as React from "react";
import { Panel, PanelResizeHandle, PanelGroup } from "react-resizable-panels";

import { appConfig } from "../config/appConfig";
import { CommandPaletteItem } from "../config/layoutTypes";
import { ActivityBar } from "../components/layout/ActivityBar";
import { CommandPalette } from "../components/features/CommandPalette";
import { EditorContent } from "../components/layout/EditorContent";
import { EditorTabs } from "../components/layout/EditorTabs";
import { PromptDialog } from "../components/features/PromptDialog";
import { StatusBar } from "../components/layout/StatusBar";
import {
  useCommandPalette,
  useFileManager,
  usePanelManager,
  usePromptDialog,
} from "../hooks";
import type { FileConfig } from "../types/file";
import type { 
  SidebarViewProps, 
  ExplorerViewProps,
  SearchViewProps,
  GitViewProps,
  DebugViewProps,
  ExtensionsViewProps 
} from "../types/layout";
import { renderSidebarContent } from '../utils/renderSidebarContent';

export function VSCodeLayout() {
  // 使用自定义 hooks 管理状态
  const [activeActivityItem, setActiveActivityItem] = React.useState<string>(
    appConfig.activityItems[0]?.id || ""
  );

  const {
    allAvailableFiles,
    openFiles,
    activeFile,
    getActiveFile,
    openFile,
    closeFile,
    setActiveFile,
  } = useFileManager(appConfig.initialFiles);

  const { leftPanel, rightPanel, bottomPanel } = usePanelManager();

  const {
    isOpen: isCommandPaletteOpen,
    input: commandPaletteInput,
    openCommandPalette,
    closeCommandPalette,
    handleInputChange: handleCommandPaletteInputChange,
    handleItemClick: handleCommandItemClick,
    getFilteredItems,
  } = useCommandPalette(
    allAvailableFiles,
    appConfig.commands as CommandPaletteItem[],
    (command) => {
      if (command.type === "file") {
        openFile(command.id);
      } else if (command.type === "command" && command.action) {
        command.action();
      }
    }
  );

  const {
    dialog: promptDialog,
    value: promptValue,
    selectedOption,
    showInputDialog,
    showSelectDialog,
    handleValueChange: handlePromptValueChange,
    handleOptionSelect: handlePromptOptionSelect,
    handleConfirm: handlePromptConfirm,
    handleCancel: handlePromptCancel,
  } = usePromptDialog();

  // 处理命令面板命令
  const handleCommandExecute = React.useCallback(
    (command: CommandPaletteItem) => {
      if (command.type === "file") {
        openFile(command.id);
      } else if (command.type === "command" && command.action) {
        command.action();
      }
      closeCommandPalette();
    },
    [openFile, closeCommandPalette]
  );

  // 显示主题选择器
  const showThemeSelector = React.useCallback(() => {
    const themes = [
      { id: "dark", label: "深色主题" },
      { id: "light", label: "浅色主题" },
      { id: "highContrast", label: "高对比度" },
    ];
    showSelectDialog("选择颜色主题", themes, (value) => {
      console.log(`设置主题为: ${value}`);
      // Future: Implement theme switching logic here
    });
  }, [showSelectDialog]);

  // 渲染侧边栏内容
  const getSidebarViewProps = React.useCallback((): SidebarViewProps => {
    const baseProps = {
      isLeftSidebarCollapsed: leftPanel.isCollapsed,
      expandLeftPanel: leftPanel.expand,
      collapseLeftPanel: leftPanel.collapse,
    };

    switch (activeActivityItem) {
      case 'explorer':
        return {
          ...baseProps,
          files: allAvailableFiles,
          activeFile,
          openFile,
        } as ExplorerViewProps;
      
      case 'search':
        return {
          ...baseProps,
          onSearch: (query: string) => {
            console.log('Search query:', query);
            // TODO: 实现搜索功能
          },
        } as SearchViewProps;
      
      case 'git':
        return {
          ...baseProps,
          changes: [], // TODO: 实现 Git 变更列表
        } as GitViewProps;
      
      case 'debug':
        return {
          ...baseProps,
          breakpoints: [], // TODO: 实现断点列表
        } as DebugViewProps;
      
      case 'extensions':
        return {
          ...baseProps,
          extensions: [], // TODO: 实现扩展列表
        } as ExtensionsViewProps;
      
      default:
        return baseProps as ExplorerViewProps; // 默认返回 ExplorerViewProps
    }
  }, [activeActivityItem, leftPanel.isCollapsed, leftPanel.expand, leftPanel.collapse, allAvailableFiles, activeFile, openFile]);

  const handleSidebarToggle = React.useCallback(() => {
    if (leftPanel.isCollapsed) {
      leftPanel.expand();
    } else {
      leftPanel.collapse();
    }
  }, [leftPanel]);

  // 传递 isCollapsed/onToggle 给所有 SidebarView
  const sidebarContent = renderSidebarContent(
    activeActivityItem,
    getSidebarViewProps(),
    leftPanel.isCollapsed,
    handleSidebarToggle
  );

  return (
    <div className="h-full w-full border rounded-md bg-white overflow-hidden flex flex-col">
      {/* 顶部控制栏 */}
      <div className="flex items-center p-2 border-b bg-gray-50 justify-between">
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={leftPanel.toggle}
          >
            {leftPanel.isCollapsed ? "显示左侧栏" : "隐藏左侧栏"}
          </button>
          <button
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={rightPanel.toggle}
          >
            {rightPanel.isCollapsed ? "显示右侧栏" : "隐藏右侧栏"}
          </button>
          <button
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={bottomPanel.toggle}
          >
            {bottomPanel.isCollapsed ? "显示底部面板" : "隐藏底部面板"}
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-1 text-sm rounded flex items-center gap-1 hover:bg-gray-200 text-gray-700"
            onClick={openCommandPalette}
            title="打开命令面板 (Ctrl+P)"
          >
            <Command className="h-3.5 w-3.5" />
            <span>命令面板</span>
          </button>

          <button
            className="px-3 py-1 text-sm rounded flex items-center gap-1 hover:bg-gray-200 text-gray-700"
            onClick={() => {
              showInputDialog("输入用户名", "请输入您的用户名", (value) => {
                console.log(`输入的用户名: ${value}`);
              });
            }}
            title="用户名输入示例"
          >
            <span>用户名输入</span>
          </button>

          <button
            className="px-3 py-1 text-sm rounded flex items-center gap-1 hover:bg-gray-200 text-gray-700"
            onClick={showThemeSelector}
            title="选择主题"
          >
            <Paintbrush className="h-3.5 w-3.5" />
            <span>选择主题</span>
          </button>
        </div>
      </div>

      {/* 主布局区域 */}
      <div className="flex-1 flex">
        {/* 左侧活动栏 */}
        <ActivityBar
          items={appConfig.activityItems}
          activeItemId={activeActivityItem}
          onItemClick={setActiveActivityItem}
        />

        {/* 主面板组 */}
        <PanelGroup direction="horizontal" className="flex-1">
          {/* 左侧面板 */}
          <Panel
            ref={leftPanel.ref}
            defaultSize={20}
            minSize={15}
            maxSize={30}
            collapsible
            collapsedSize={0}
            onCollapse={leftPanel.collapse}
            onExpand={leftPanel.expand}
          >
            {sidebarContent}
          </Panel>

          {/* 左侧面板调整手柄 */}
          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

          {/* 主编辑区域 */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical" className="h-full">
              <Panel className="flex-1">
                <div className="h-full flex flex-col">
                  {/* 编辑器标签页 */}
                  <EditorTabs
                    files={openFiles}
                    activeFileId={activeFile}
                    onFileSelect={setActiveFile}
                    onFileClose={closeFile}
                  />

                  {/* 编辑器内容 */}
                  <div className="flex-1 overflow-auto">
                    <EditorContent activeFile={getActiveFile()} />
                  </div>
                </div>
              </Panel>

              {/* 底部面板调整手柄 */}
              <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-gray-300" />

              {/* 底部面板 */}
              <Panel
                ref={bottomPanel.ref}
                defaultSize={20}
                minSize={15}
                maxSize={30}
                collapsible
                collapsedSize={0}
                onCollapse={bottomPanel.collapse}
                onExpand={bottomPanel.expand}
              >
                <div className="h-full p-4">
                  <h3 className="text-lg font-medium mb-4">底部面板</h3>
                  <p className="text-gray-600">
                    这里可以放置终端、输出、调试控制台等视图
                  </p>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          {/* 右侧面板调整手柄 */}
          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

          {/* 右侧面板 */}
          <Panel
            ref={rightPanel.ref}
            defaultSize={20}
            minSize={15}
            maxSize={30}
            collapsible
            collapsedSize={0}
            onCollapse={rightPanel.collapse}
            onExpand={rightPanel.expand}
          >
            <div className="h-full p-4">
              <h3 className="text-lg font-medium mb-4">右侧面板</h3>
              <p className="text-gray-600">这里可以放置大纲、问题等视图</p>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* 状态栏 */}
      <StatusBar
        branchName="main"
        hasErrors={false}
        hasWarnings={true}
        warningsCount={3}
        isConnected={true}
      />

      {/* 命令面板 */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        input={commandPaletteInput}
        items={getFilteredItems()}
        onInputChange={handleCommandPaletteInputChange}
        onItemClick={handleCommandExecute}
        onClose={closeCommandPalette}
      />

      {/* 提示对话框 */}
      {promptDialog && (
        <PromptDialog
          config={promptDialog}
          value={promptValue}
          selectedOption={selectedOption}
          onValueChange={handlePromptValueChange}
          onOptionSelect={handlePromptOptionSelect}
          onConfirm={handlePromptConfirm}
          onCancel={handlePromptCancel}
        />
      )}
    </div>
  );
} 
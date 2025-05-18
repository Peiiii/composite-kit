import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  Command,
  Paintbrush,
  Settings,
  Terminal,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { appConfig } from "../config/appConfig";
import {
  ActivityBar,
  EditorTabs,
  EditorContent,
  StatusBar,
  CommandPalette,
  PromptDialog,
} from "../core/components";
import {
  useFileManager,
  usePanelManager,
  useCommandPalette,
  usePromptDialog,
} from "../hooks";
import { CommandPaletteItem } from "../config/layoutTypes";

export function VSCodeLayout() {
  // 使用自定义 hooks 管理状态
  const [activeActivityItem, setActiveActivityItem] = React.useState<string>(appConfig.activityItems[0]?.id || "");
  
  const {
    allAvailableFiles,
    openFiles,
    activeFile,
    getActiveFile,
    openFile,
    closeFile,
    setActiveFile,
  } = useFileManager(appConfig.initialFiles);

  const {
    leftPanel,
    rightPanel,
    bottomPanel,
  } = usePanelManager();

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
  const handleCommandExecute = React.useCallback((command: any) => {
    if (command.type === "file") {
      openFile(command.id);
    } else if (command.type === "command" && command.action) {
      command.action();
    }
    closeCommandPalette();
  }, [openFile, closeCommandPalette]);

  // 显示主题选择器
  const showThemeSelector = React.useCallback(() => {
    const themes = [
      { id: "dark", label: "深色主题" },
      { id: "light", label: "浅色主题" },
      { id: "highContrast", label: "高对比度" },
    ];
    showSelectDialog(
      "选择颜色主题",
      themes,
      (value) => {
        console.log(`设置主题为: ${value}`);
        // Future: Implement theme switching logic here
      }
    );
  }, [showSelectDialog]);

  // 渲染侧边栏内容
  const renderSidebarContent = React.useCallback(() => {
    const currentActivityConfig = appConfig.activityItems.find(item => item.id === activeActivityItem);
    if (!currentActivityConfig) return <div>活动项 "{activeActivityItem}" 未找到配置</div>;

    const viewConfig = appConfig.sidebarViews.find(view => view.id === currentActivityConfig.sidebarViewId);
    if (!viewConfig) return <div>侧边栏视图 "{currentActivityConfig.sidebarViewId}" 未找到配置</div>;

    const ViewComponent = viewConfig.component;
    
    let componentProps: any = {
      isLeftSidebarCollapsed: leftPanel.isCollapsed,
      expandLeftPanel: leftPanel.expand,
      collapseLeftPanel: leftPanel.collapse,
    };

    if (currentActivityConfig.id === "explorer") {
      componentProps = {
        ...componentProps,
        files: allAvailableFiles,
        activeFile,
        openFile,
      };
    }

    return <ViewComponent {...componentProps} />;
  }, [activeActivityItem, leftPanel.isCollapsed, leftPanel.expand, leftPanel.collapse, allAvailableFiles, activeFile, openFile]);

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
              showInputDialog(
                "输入用户名",
                "请输入您的用户名",
                (value) => {
                  console.log(`输入的用户名: ${value}`);
                }
              );
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
      <div className="flex-1 flex overflow-hidden">
        {/* 活动栏 */}
        <ActivityBar
          items={appConfig.activityItems}
          activeItemId={activeActivityItem}
          onItemClick={(itemId) => {
            setActiveActivityItem(itemId);
            if (leftPanel.isCollapsed) {
              leftPanel.expand();
            }
          }}
        />
        
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            {/* 左侧边栏 */}
            <Panel 
              ref={leftPanel.ref}
              defaultSize={20}
              minSize={10}
              collapsible={true}
              onCollapse={leftPanel.collapse}
              onExpand={leftPanel.expand}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="h-full flex flex-col border-r">
                {renderSidebarContent()}
              </div>
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 relative group">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </PanelResizeHandle>
            
            {/* 主编辑区域 */}
            <Panel>
              <PanelGroup direction="vertical" className="h-full">
                <Panel className="overflow-hidden">
                  <div className="h-full flex flex-col">
                    <EditorTabs
                      files={openFiles}
                      activeFileId={activeFile}
                      onFileSelect={setActiveFile}
                      onFileClose={closeFile}
                    />
                    <EditorContent activeFile={getActiveFile()} />
                  </div>
                </Panel>
                
                <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-blue-500 relative group">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </PanelResizeHandle>
                
                {/* 底部面板 */}
                <Panel 
                  ref={bottomPanel.ref}
                  defaultSize={25} 
                  minSize={10}
                  collapsible={true}
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                  className="overflow-hidden"
                >
                  <div className="h-full flex flex-col border-t">
                    <div className="h-10 flex items-center justify-between px-4 bg-gray-50 border-b">
                      <div className="flex items-center">
                        <Terminal className="h-4 w-4 mr-2" />
                        <span className="font-medium">终端</span>
                      </div>
                      <button 
                        className="p-1 rounded hover:bg-gray-200"
                        onClick={bottomPanel.toggle}
                        title={bottomPanel.isCollapsed ? "展开底部面板" : "折叠底部面板"}
                      >
                        {bottomPanel.isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex-1 p-2 overflow-auto bg-gray-900 text-gray-200">
                      <pre className="text-sm font-mono">
                        $ npm start{"\n"}
                        {">"} project@0.1.0 start{"\n"}
                        {">"} react-scripts start{"\n"}
                        {"\n"}
                        Starting the development server...{"\n"}
                        Compiled successfully!{"\n"}
                      </pre>
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 relative group">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </PanelResizeHandle>
            
            {/* 右侧边栏 */}
            <Panel 
              ref={rightPanel.ref}
              defaultSize={20} 
              minSize={10}
              collapsible={true}
              onCollapse={rightPanel.collapse}
              onExpand={rightPanel.expand}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="h-full flex flex-col border-l">
                <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
                  <span className="font-medium truncate">大纲</span>
                  <button 
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={rightPanel.toggle}
                    title={rightPanel.isCollapsed ? "展开右侧边栏" : "折叠右侧边栏"}
                  >
                    {rightPanel.isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-sm font-medium truncate">文件结构 (示例)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
      
      {/* 状态栏 */}
      <StatusBar
        branchName="main"
        hasErrors={false}
        hasWarnings={true}
        warningsCount={2}
        isConnected={true}
      />
      
      {/* 命令面板 */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        input={commandPaletteInput}
        items={getFilteredItems()}
        onInputChange={handleCommandPaletteInputChange}
        onItemClick={handleCommandItemClick}
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
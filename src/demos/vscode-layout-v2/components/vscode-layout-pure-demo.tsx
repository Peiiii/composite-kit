import {
  AlertCircle,
  Bell,
  GitBranch as BranchIcon,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  Eye,
  FileText,
  Folder,
  GitBranch,
  LayoutGrid,
  Paintbrush,
  Play,
  RefreshCw,
  Save,
  Search,
  Settings,
  Terminal,
  Wifi,
  X
} from "lucide-react";
import * as React from "react";
import { ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

/**
 * 简化版VSCode布局Demo，仅使用react-resizable-panels实现
 * 包含活动栏、左侧边栏、编辑区域、右侧边栏和底部面板
 */
export function VSCodeLayoutPureDemo() {
  // 改为使用折叠状态代替可见性状态
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = React.useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = React.useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = React.useState(false);
  
  // 命令面板状态
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [commandPaletteInput, setCommandPaletteInput] = React.useState("");
  
  // 提示对话框状态
  const [promptDialog, setPromptDialog] = React.useState<{
    type: "input" | "select";
    title: string;
    placeholder?: string;
    options?: { id: string; label: string }[];
    onConfirm: (value: string) => void;
  } | null>(null);
  const [promptValue, setPromptValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  
  // 状态管理：活动项
  const [activeFile, setActiveFile] = React.useState("file1");
  const [activeActivityItem, setActiveActivityItem] = React.useState("explorer");
  
  // 面板引用 - 用于控制折叠/展开
  const leftPanelRef = React.useRef<ImperativePanelHandle>(null);
  const rightPanelRef = React.useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = React.useRef<ImperativePanelHandle>(null);
  
  // 添加打开的文件状态管理
  const [openFiles, setOpenFiles] = React.useState([
    { id: "file1", name: "index.tsx", content: "export default function Home() {\n  return <div>Hello World</div>;\n}" },
    { id: "file2", name: "Button.tsx", content: "export function Button({ children }) {\n  return <button className=\"px-4 py-2 bg-blue-500 text-white rounded\">{children}</button>;\n}" },
  ]);
  
  // 折叠/展开处理函数
  const collapseLeftPanel = React.useCallback(() => {
    if (leftPanelRef.current) {
      leftPanelRef.current.collapse();
      setIsLeftSidebarCollapsed(true);
    }
  }, []);
  
  const expandLeftPanel = React.useCallback(() => {
    if (leftPanelRef.current) {
      leftPanelRef.current.expand();
      setIsLeftSidebarCollapsed(false);
    }
  }, []);
  
  const collapseRightPanel = React.useCallback(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.collapse();
      setIsRightSidebarCollapsed(true);
    }
  }, []);
  
  const expandRightPanel = React.useCallback(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.expand();
      setIsRightSidebarCollapsed(false);
    }
  }, []);
  
  const collapseBottomPanel = React.useCallback(() => {
    if (bottomPanelRef.current) {
      bottomPanelRef.current.collapse();
      setIsBottomPanelCollapsed(true);
    }
  }, []);
  
  const expandBottomPanel = React.useCallback(() => {
    if (bottomPanelRef.current) {
      bottomPanelRef.current.expand();
      setIsBottomPanelCollapsed(false);
    }
  }, []);
  
  // 切换面板可见性 - 使用折叠/展开代替显示/隐藏
  const toggleLeftSidebar = React.useCallback(() => {
    if (isLeftSidebarCollapsed) {
      expandLeftPanel();
    } else {
      collapseLeftPanel();
    }
  }, [isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel]);
  
  const toggleRightSidebar = React.useCallback(() => {
    if (isRightSidebarCollapsed) {
      expandRightPanel();
    } else {
      collapseRightPanel();
    }
  }, [isRightSidebarCollapsed, expandRightPanel, collapseRightPanel]);
  
  const toggleBottomPanel = React.useCallback(() => {
    if (isBottomPanelCollapsed) {
      expandBottomPanel();
    } else {
      collapseBottomPanel();
    }
  }, [isBottomPanelCollapsed, expandBottomPanel, collapseBottomPanel]);
  
  // 活动栏数据
  const activityItems = [
    { id: "explorer", icon: <Folder className="h-5 w-5" />, title: "资源管理器" },
    { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
    { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
    { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
    { id: "extensions", icon: <LayoutGrid className="h-5 w-5" />, title: "扩展" },
  ];
  
  // 示例文件数据
  const files = [
    { id: "file1", name: "index.tsx", content: "export default function Home() {\n  return <div>Hello World</div>;\n}" },
    { id: "file2", name: "Button.tsx", content: "export function Button({ children }) {\n  return <button className=\"px-4 py-2 bg-blue-500 text-white rounded\">{children}</button>;\n}" },
    { id: "file3", name: "Card.tsx", content: "export function Card({ title, children }) {\n  return (\n    <div className=\"border rounded p-4\">\n      <h3 className=\"text-lg font-bold\">{title}</h3>\n      <div>{children}</div>\n    </div>\n  );\n}" },
  ];
  
  // 打开文件处理函数
  const openFile = React.useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;
    
    // 检查文件是否已打开，如果没有则添加到openFiles
    if (!openFiles.some(f => f.id === fileId)) {
      setOpenFiles(prev => [...prev, file]);
    }
    
    // 设置为活动文件
    setActiveFile(fileId);
  }, [files, openFiles]);
  
  // 关闭文件处理函数
  const closeFile = React.useCallback((fileId: string, e?: React.MouseEvent) => {
    // 阻止事件冒泡，避免触发标签点击事件
    if (e) {
      e.stopPropagation();
    }
    
    setOpenFiles(prev => {
      const newOpenFiles = prev.filter(f => f.id !== fileId);
      
      // 如果关闭的是当前活动文件，则切换到另一个文件
      if (fileId === activeFile && newOpenFiles.length > 0) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1].id);
      } else if (newOpenFiles.length === 0) {
        // 如果没有打开的文件，清除活动文件
        setActiveFile("");
      }
      
      return newOpenFiles;
    });
  }, [activeFile]);
  
  // 渲染文件列表
  const renderFiles = React.useCallback(() => {
    return files.map(file => (
      <button
        key={file.id}
        className={`flex items-center w-full text-sm px-2 py-1 text-left ${activeFile === file.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
        onClick={() => {
          // 使用requestAnimationFrame延迟状态更新，避免立即触发布局变化
          requestAnimationFrame(() => {
            openFile(file.id);
          });
        }}
      >
        <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
        <span className="truncate">{file.name}</span>
      </button>
    ));
  }, [activeFile, openFile]);
  
  // 渲染左侧边栏内容
  const renderSidebarContent = React.useCallback(() => {
    switch (activeActivityItem) {
      case "explorer":
        return (
          <div className="h-full flex flex-col">
            <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
              <span className="font-medium truncate">资源管理器</span>
              <button 
                className="p-1 rounded hover:bg-gray-200"
                onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <div className="mb-2">
                <div className="flex items-center mb-1">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  <span className="text-sm font-medium truncate">项目文件</span>
                </div>
                <div className="ml-4">
                  {renderFiles()}
                </div>
              </div>
            </div>
          </div>
        );
      case "search":
        return (
          <div className="h-full flex flex-col">
            <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
              <span className="font-medium">搜索</span>
              <button 
                className="p-1 rounded hover:bg-gray-200"
                onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <input 
                type="text" 
                placeholder="搜索..." 
                className="w-full p-2 text-sm border rounded mb-2"
              />
              <div className="text-sm text-gray-500">输入搜索词开始搜索</div>
            </div>
          </div>
        );
      case "git":
        return (
          <div className="h-full flex flex-col">
            <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
              <span className="font-medium">源代码管理</span>
              <button 
                className="p-1 rounded hover:bg-gray-200"
                onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <div className="text-sm">暂无更改</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex flex-col">
            <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
              <span className="font-medium">{activityItems.find(item => item.id === activeActivityItem)?.title || "侧边栏"}</span>
              <button 
                className="p-1 rounded hover:bg-gray-200"
                onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <div className="text-sm text-center mt-4">
                {activityItems.find(item => item.id === activeActivityItem)?.title || "未知"} 内容
              </div>
            </div>
          </div>
        );
    }
  }, [activeActivityItem, isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel, renderFiles]);
  
  // 设置初始状态
  React.useEffect(() => {
    // 组件初始化时执行，确保面板状态与实际显示一致
    if (leftPanelRef.current && isLeftSidebarCollapsed) {
      leftPanelRef.current.collapse();
    }
    
    if (rightPanelRef.current && isRightSidebarCollapsed) {
      rightPanelRef.current.collapse();
    }
    
    if (bottomPanelRef.current && isBottomPanelCollapsed) {
      bottomPanelRef.current.collapse();
    }
  }, [isLeftSidebarCollapsed, isRightSidebarCollapsed, isBottomPanelCollapsed]);
  
  // 状态栏数据
  const branchName = "main";
  const isConnected = true;
  const hasErrors = false;
  const hasWarnings = true;
  const warningsCount = 2;
  
  // 命令面板和快速搜索处理函数
  const openCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(true);
    setCommandPaletteInput("");
  }, []);
  
  const closeCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(false);
    setCommandPaletteInput("");
  }, []);
  
  // 显示主题选择器
  const showThemeSelector = React.useCallback(() => {
    const themes = [
      { id: "dark", label: "深色主题" },
      { id: "light", label: "浅色主题" },
      { id: "highContrast", label: "高对比度" },
    ];
    
    setPromptDialog({
      type: "select",
      title: "选择颜色主题",
      options: themes,
      onConfirm: (value) => {
        console.log(`设置主题为: ${value}`);
        setPromptDialog(null);
      }
    });
    setSelectedOption(themes[0].id);
    closeCommandPalette();
  }, [closeCommandPalette]);
  
  // 处理命令项点击
  const handleCommandItemClick = React.useCallback((item: any) => {
    if (item.type === "file") {
      openFile(item.id);
      closeCommandPalette();
    } else if (item.type === "command" && item.action) {
      item.action();
      closeCommandPalette();
    } else {
      closeCommandPalette();
    }
  }, [openFile, closeCommandPalette]);
  
  // 处理键盘快捷键
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 处理命令面板快捷键 (Cmd+P / Ctrl+P)
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        openCommandPalette();
      }
      
      // ESC键关闭命令面板或提示对话框
      if (e.key === "Escape") {
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        }
        if (promptDialog) {
          setPromptDialog(null);
          setPromptValue("");
          setSelectedOption(null);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, openCommandPalette, closeCommandPalette, promptDialog]);
  
  // 命令和文件搜索结果
  const getFilteredItems = React.useCallback(() => {
    const input = commandPaletteInput.toLowerCase().trim();
    
    // 显示命令模式
    if (input.startsWith(">")) {
      const commandQuery = input.slice(1).trim();
      
      // 示例命令列表
      const commands = [
        { id: "cmd1", type: "command", name: "设置: 打开设置", icon: <Settings className="h-4 w-4" />, action: () => console.log("打开设置") },
        { id: "cmd2", type: "command", name: "设置: 键盘快捷键", icon: <Command className="h-4 w-4" />, action: () => console.log("键盘快捷键") },
        { id: "cmd3", type: "command", name: "重新加载窗口", icon: <RefreshCw className="h-4 w-4" />, action: () => console.log("重新加载窗口") },
        { id: "cmd4", type: "command", name: "查看: 切换侧边栏", icon: <ChevronLeft className="h-4 w-4" />, action: () => toggleLeftSidebar() },
        { id: "cmd5", type: "command", name: "查看: 切换终端", icon: <Terminal className="h-4 w-4" />, action: () => toggleBottomPanel() },
        { id: "cmd6", type: "command", name: "文件: 保存", icon: <Save className="h-4 w-4" />, action: () => console.log("保存文件") },
        { id: "cmd7", type: "command", name: "颜色主题", icon: <Paintbrush className="h-4 w-4" />, action: () => showThemeSelector() },
        { id: "cmd8", type: "command", name: "查看: 切换全屏", icon: <Eye className="h-4 w-4" />, action: () => console.log("切换全屏") },
      ];
      
      if (!commandQuery) {
        return commands.map(cmd => ({
          ...cmd,
          name: cmd.name,
        }));
      }
      
      // 过滤命令
      return commands
        .filter(cmd => cmd.name.toLowerCase().includes(commandQuery))
        .map(cmd => ({
          ...cmd,
          name: cmd.name,
        }));
    }
    
    // 默认文件搜索模式
    if (!input) {
      return [{
        id: "default",
        type: "info",
        name: "输入 > 可执行命令, # 搜索符号, @ 查找定义",
        icon: <Search className="h-4 w-4" />
      }];
    }
    
    // 过滤文件
    return files
      .filter(file => file.name.toLowerCase().includes(input))
      .map(file => ({ 
        id: file.id, 
        type: "file", 
        name: file.name,
        icon: <FileText className="h-4 w-4" />
      }));
  }, [commandPaletteInput, files, toggleLeftSidebar, toggleBottomPanel, showThemeSelector]);
  
  return (
    <div className="h-full w-full border rounded-md bg-white overflow-hidden flex flex-col">
      {/* 顶部控制栏 */}
      <div className="flex items-center p-2 border-b bg-gray-50 justify-between">
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={toggleLeftSidebar}
          >
            {isLeftSidebarCollapsed ? "显示左侧栏" : "隐藏左侧栏"}
          </button>
          <button 
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={toggleRightSidebar}
          >
            {isRightSidebarCollapsed ? "显示右侧栏" : "隐藏右侧栏"}
          </button>
          <button 
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={toggleBottomPanel}
          >
            {isBottomPanelCollapsed ? "显示底部面板" : "隐藏底部面板"}
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
              setPromptDialog({
                type: "input",
                title: "输入用户名",
                placeholder: "请输入您的用户名",
                onConfirm: (value) => {
                  console.log(`输入的用户名: ${value}`);
                }
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
      <div className="flex-1 flex overflow-hidden">
        {/* 活动栏 */}
        <div className="w-12 bg-gray-100 flex flex-col items-center py-2 border-r shrink-0">
          {activityItems.map(item => (
            <button
              key={item.id}
              className={`w-10 h-10 mb-2 flex items-center justify-center rounded ${
                activeActivityItem === item.id ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title={item.title}
              onClick={() => {
                setActiveActivityItem(item.id);
                if (isLeftSidebarCollapsed) {
                  expandLeftPanel();
                }
              }}
            >
              {item.icon}
            </button>
          ))}
          
          <div className="mt-auto">
            <button
              className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200"
              title="设置"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            {/* 左侧边栏 - 始终渲染，但可折叠 */}
            <Panel 
              ref={leftPanelRef}
              defaultSize={20}
              minSize={10}
              collapsible={true}
              onCollapse={() => setIsLeftSidebarCollapsed(true)}
              onExpand={() => setIsLeftSidebarCollapsed(false)}
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
                    <div className="border-b bg-gray-50 flex">
                      {openFiles.map(file => (
                        <button
                          key={file.id}
                          className={`px-3 py-2 flex items-center gap-1 text-sm relative group ${
                            activeFile === file.id
                              ? 'bg-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveFile(file.id)}
                        >
                          <FileText className="h-4 w-4" />
                          <span>{file.name}</span>
                          <button
                            className="ml-1 p-1 rounded-sm hover:bg-gray-200 opacity-60 group-hover:opacity-100"
                            onClick={(e) => closeFile(file.id, e)}
                            title="关闭"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {activeFile === file.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 p-4 overflow-auto">
                      {activeFile ? (
                        <pre className="text-sm font-mono">
                          {openFiles.find(f => f.id === activeFile)?.content || files.find(f => f.id === activeFile)?.content}
                        </pre>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                          <p>没有打开的文件</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Panel>
                
                <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-blue-500 relative group">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </PanelResizeHandle>
                
                {/* 底部面板 - 始终渲染，但可折叠 */}
                <Panel 
                  ref={bottomPanelRef}
                  defaultSize={25} 
                  minSize={10}
                  collapsible={true}
                  onCollapse={() => setIsBottomPanelCollapsed(true)}
                  onExpand={() => setIsBottomPanelCollapsed(false)}
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
                        onClick={isBottomPanelCollapsed ? expandBottomPanel : collapseBottomPanel}
                      >
                        <ChevronDown className="h-4 w-4" />
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
                        {"\n"}
                        You can now view project in the browser.{"\n"}
                          Local:            http://localhost:3000
                      </pre>
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 relative group">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </PanelResizeHandle>
            
            {/* 右侧边栏 - 始终渲染，但可折叠 */}
            <Panel 
              ref={rightPanelRef}
              defaultSize={20} 
              minSize={10}
              collapsible={true}
              onCollapse={() => setIsRightSidebarCollapsed(true)}
              onExpand={() => setIsRightSidebarCollapsed(false)}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="h-full flex flex-col border-l">
                <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
                  <span className="font-medium truncate">大纲</span>
                  <button 
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={isRightSidebarCollapsed ? expandRightPanel : collapseRightPanel}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-sm font-medium truncate">文件结构</span>
                    </div>
                    <div className="ml-4 flex flex-col gap-1">
                      <div className="flex items-center text-sm text-purple-700">
                        <span>function</span>
                        <span className="ml-2">Button</span>
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <span>interface</span>
                        <span className="ml-2">ButtonProps</span>
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <span>variable</span>
                        <span className="ml-2">styles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
      
      {/* 状态栏 - 更新为VSCode中性颜色 */}
      <div className="h-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs flex items-center px-2 justify-between border-t border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            <BranchIcon className="h-3.5 w-3.5 mr-1" />
            <span>{branchName}</span>
          </div>
          
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            {hasErrors ? (
              <AlertCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
            ) : hasWarnings ? (
              <AlertCircle className="h-3.5 w-3.5 mr-1 text-yellow-500" />
            ) : (
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
            )}
            <span>
              {hasErrors ? "错误" : hasWarnings ? `${warningsCount} 警告` : "就绪"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            UTF-8
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            TSX
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            <Wifi className={`h-3.5 w-3.5 ${isConnected ? "text-green-500" : "text-red-500"}`} />
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            <Bell className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
      
      {/* 命令面板/搜索 */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-start justify-center pt-[10%] z-50">
          <div className="w-[600px] max-w-[80%] bg-white rounded shadow-lg overflow-hidden">
            <div className="bg-gray-100 p-2 flex items-center border-b">
              <Command className="h-5 w-5 mr-2 text-gray-500" />
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-sm"
                placeholder="输入命令或搜索文件..."
                value={commandPaletteInput}
                onChange={(e) => setCommandPaletteInput(e.target.value)}
                autoFocus
              />
              <button
                className="ml-2 p-1 rounded hover:bg-gray-200"
                onClick={closeCommandPalette}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {getFilteredItems().map((item) => (
                <div 
                  key={item.id} 
                  className="px-4 py-2 flex items-center text-sm hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleCommandItemClick(item)}
                >
                  <span className="mr-2 text-gray-500">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 提示对话框 */}
      {promptDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="w-[400px] max-w-[80%] bg-white rounded shadow-lg p-4">
            <h3 className="text-base font-medium mb-4">{promptDialog.title}</h3>
            
            {promptDialog.type === "input" && (
              <input
                type="text"
                className="w-full px-3 py-2 border rounded mb-4 text-sm"
                placeholder={promptDialog.placeholder}
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                autoFocus
              />
            )}
            
            {promptDialog.type === "select" && promptDialog.options && (
              <div className="mb-4 max-h-[300px] overflow-y-auto">
                {promptDialog.options.map(option => (
                  <div 
                    key={option.id} 
                    className={`flex items-center p-2 rounded cursor-pointer ${selectedOption === option.id ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      {selectedOption === option.id && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <button 
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                onClick={() => setPromptDialog(null)}
              >
                取消
              </button>
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                onClick={() => {
                  if (promptDialog.type === "select" && selectedOption) {
                    promptDialog.onConfirm(selectedOption);
                  } else if (promptDialog.type === "input") {
                    promptDialog.onConfirm(promptValue);
                  }
                  setPromptDialog(null);
                  setPromptValue("");
                  setSelectedOption(null);
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
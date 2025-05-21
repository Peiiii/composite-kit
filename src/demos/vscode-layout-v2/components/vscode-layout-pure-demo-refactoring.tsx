import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  Folder,
  Terminal,
  Search,
  GitBranch,
  Settings,
  Play,
  LayoutGrid,
  X,
  GitBranch as BranchIcon,
  AlertCircle,
  CheckCircle,
  Bell,
  Wifi,
  Command,
  Check,
  Paintbrush,
  Save,
  RefreshCw,
  Eye,
} from "lucide-react";

// --- Configuration Interfaces ---
interface ActivityItemConfig {
  id: string;
  icon: React.ReactElement;
  title: string;
  sidebarViewId: string; // ID to map to a sidebar view
}

interface FileConfig {
  id: string;
  name: string;
  content: string;
  // icon?: React.ReactElement; // For file type specific icons - future enhancement
}

interface SidebarViewSharedProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
}

interface ExplorerViewSpecificProps extends SidebarViewSharedProps {
  files: FileConfig[];
  activeFile: string;
  openFile: (fileId: string) => void;
}

type SearchViewSpecificProps = SidebarViewSharedProps
type GitViewSpecificProps = SidebarViewSharedProps
type DebugViewSpecificProps = SidebarViewSharedProps
type ExtensionsViewSpecificProps = SidebarViewSharedProps


// Union type for all possible sidebar view props
type SidebarViewProps = 
  | ExplorerViewSpecificProps 
  | SearchViewSpecificProps 
  | GitViewSpecificProps
  | DebugViewSpecificProps
  | ExtensionsViewSpecificProps;

interface SidebarViewConfig {
  id: string; // Matches ActivityItemConfig.sidebarViewId
  title: string; // Title for the sidebar header (can be used if view wants to render its own header)
  component: React.FC<any>; // The component to render for this view, 'any' for now to simplify prop matching
}


// --- Business Layer: View Implementations (Components) ---

const ExplorerView: React.FC<ExplorerViewSpecificProps> = ({ 
  isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel, files, activeFile, openFile 
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">资源管理器</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
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
            {files.map(file => (
              <button
                key={file.id}
                className={`flex items-center w-full text-sm px-2 py-1 text-left ${activeFile === file.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                onClick={() => {
                  requestAnimationFrame(() => { // Keep RAF for potential layout shifts
                    openFile(file.id);
                  });
                }}
              >
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchView: React.FC<SearchViewSpecificProps> = ({ isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium">搜索</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
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
};

const GitView: React.FC<GitViewSpecificProps> = ({ isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel }) => {
   return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium">源代码管理</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="text-sm">暂无更改</div>
      </div>
    </div>
  );
};

const DebugView: React.FC<DebugViewSpecificProps> = ({ isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">运行和调试</span>
        <button className="p-1 rounded hover:bg-gray-200" onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel} title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}>
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 text-sm">运行和调试内容区</div>
    </div>
  );
};

const ExtensionsView: React.FC<ExtensionsViewSpecificProps> = ({ isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">扩展</span>
        <button className="p-1 rounded hover:bg-gray-200" onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel} title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}>
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 text-sm">扩展内容区</div>
    </div>
  );
};


// --- Application Configuration ---
const appConfig = {
  activityItems: [
    { id: "explorer", icon: <Folder className="h-5 w-5" />, title: "资源管理器", sidebarViewId: "explorerView" },
    { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索", sidebarViewId: "searchView" },
    { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理", sidebarViewId: "gitView" },
    { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试", sidebarViewId: "debugView" },
    { id: "extensions", icon: <LayoutGrid className="h-5 w-5" />, title: "扩展", sidebarViewId: "extensionsView" },
  ] as ActivityItemConfig[],
  
  initialFiles: [
    { id: "file1", name: "index.tsx", content: "export default function Home() {\n  return <div>Hello World</div>;\n}" },
    { id: "file2", name: "Button.tsx", content: "export function Button({ children }) {\n  return <button className=\"px-4 py-2 bg-blue-500 text-white rounded\">{children}</button>;\n}" },
    { id: "file3", name: "Card.tsx", content: "export function Card({ title, children }) {\n  return (\n    <div className=\"border rounded p-4\">\n      <h3 className=\"text-lg font-bold\">{title}</h3>\n      <div>{children}</div>\n    </div>\n  );\n}" },
  ] as FileConfig[],

  sidebarViews: [
    { id: "explorerView", title: "资源管理器", component: ExplorerView },
    { id: "searchView", title: "搜索", component: SearchView },
    { id: "gitView", title: "源代码管理", component: GitView },
    { id: "debugView", title: "运行和调试", component: DebugView },
    { id: "extensionsView", title: "扩展", component: ExtensionsView },
  ] as SidebarViewConfig[],
  
  // Placeholder for command palette commands configuration
  commands: [
    { id: "cmd1", type: "command", name: "设置: 打开设置", icon: <Settings className="h-4 w-4" />, action: () => console.log("打开设置") },
    { id: "cmd2", type: "command", name: "设置: 键盘快捷键", icon: <Command className="h-4 w-4" />, action: () => console.log("键盘快捷键") },
    { id: "cmd3", type: "command", name: "重新加载窗口", icon: <RefreshCw className="h-4 w-4" />, action: () => console.log("重新加载窗口") },
    // toggleLeftSidebar and toggleBottomPanel will be methods of the main component
    // { id: "cmd4", type: "command", name: "查看: 切换侧边栏", icon: <ChevronLeft className="h-4 w-4" />, action: () => {} /* Managed by component */ },
    // { id: "cmd5", type: "command", name: "查看: 切换终端", icon: <Terminal className="h-4 w-4" />, action: () => {} /* Managed by component */ },
    { id: "cmd6", type: "command", name: "文件: 保存", icon: <Save className="h-4 w-4" />, action: () => console.log("保存文件") },
    // showThemeSelector will be a method of the main component
    // { id: "cmd7", type: "command", name: "颜色主题", icon: <Paintbrush className="h-4 w-4" />, action: () => {} /* Managed by component */ },
    { id: "cmd8", type: "command", name: "查看: 切换全屏", icon: <Eye className="h-4 w-4" />, action: () => console.log("切换全屏") },
  ]
};

/**
 * 简化版VSCode布局Demo，已重构为配置驱动（进行中）
 * 包含活动栏、左侧边栏、编辑区域、右侧边栏和底部面板
 */
export function VSCodeLayoutPureDemo() { // Original name kept, but it's the refactored version
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = React.useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = React.useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = React.useState(false);
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [commandPaletteInput, setCommandPaletteInput] = React.useState("");
  
  const [promptDialog, setPromptDialog] = React.useState<{
    type: "input" | "select";
    title: string;
    placeholder?: string;
    options?: { id: string; label: string }[];
    onConfirm: (value: string) => void;
  } | null>(null);
  const [promptValue, setPromptValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  
  const [allAvailableFiles] = React.useState<FileConfig[]>(appConfig.initialFiles);
  const [activeFile, setActiveFile] = React.useState<string>(allAvailableFiles[0]?.id || "");
  const [activeActivityItem, setActiveActivityItem] = React.useState<string>(appConfig.activityItems[0]?.id || "");
  
  const leftPanelRef = React.useRef<ImperativePanelHandle>(null);
  const rightPanelRef = React.useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = React.useRef<ImperativePanelHandle>(null);
  
  const [openFiles, setOpenFiles] = React.useState<FileConfig[]>(() => {
    if (allAvailableFiles.length > 0 && activeFile) {
      const initialActiveFile = allAvailableFiles.find(f => f.id === activeFile);
      return initialActiveFile ? [initialActiveFile] : [];
    }
    return [];
  });
  
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
  
  const toggleLeftSidebar = React.useCallback(() => {
    if (isLeftSidebarCollapsed) expandLeftPanel();
    else collapseLeftPanel();
  }, [isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel]);
  
  const toggleRightSidebar = React.useCallback(() => {
    if (isRightSidebarCollapsed) expandRightPanel();
    else collapseRightPanel();
  }, [isRightSidebarCollapsed, expandRightPanel, collapseRightPanel]);
  
  const toggleBottomPanel = React.useCallback(() => {
    if (isBottomPanelCollapsed) expandBottomPanel();
    else collapseBottomPanel();
  }, [isBottomPanelCollapsed, expandBottomPanel, collapseBottomPanel]);
  
  const openFile = React.useCallback((fileId: string) => {
    const fileToOpen = allAvailableFiles.find(f => f.id === fileId);
    if (!fileToOpen) return;
    
    if (!openFiles.some(f => f.id === fileId)) {
      setOpenFiles(prev => [...prev, fileToOpen]);
    }
    setActiveFile(fileId);
  }, [allAvailableFiles, openFiles]);
  
  const closeFile = React.useCallback((fileId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenFiles(prev => {
      const newOpenFiles = prev.filter(f => f.id !== fileId);
      if (fileId === activeFile && newOpenFiles.length > 0) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1].id);
      } else if (newOpenFiles.length === 0) {
        setActiveFile("");
      }
      return newOpenFiles;
    });
  }, [activeFile]);
  
  const renderSidebarContent = React.useCallback(() => {
    const currentActivityConfig = appConfig.activityItems.find(item => item.id === activeActivityItem);
    if (!currentActivityConfig) return <div>活动项 "{activeActivityItem}" 未找到配置</div>;

    const viewConfig = appConfig.sidebarViews.find(view => view.id === currentActivityConfig.sidebarViewId);
    if (!viewConfig) return <div>侧边栏视图 "{currentActivityConfig.sidebarViewId}" 未找到配置</div>;

    const ViewComponent = viewConfig.component;
    
    // Prepare props for the specific view component
    // This is a bit manual; a more advanced system might use a prop mapping or context
    const componentProps: SidebarViewProps = {
        isLeftSidebarCollapsed,
        expandLeftPanel,
        collapseLeftPanel,
    };

    if (viewConfig.id === "explorerView") {
        (componentProps as ExplorerViewSpecificProps).files = allAvailableFiles;
        (componentProps as ExplorerViewSpecificProps).activeFile = activeFile;
        (componentProps as ExplorerViewSpecificProps).openFile = openFile;
    }
    // Add similar prop spreading for other view types if they have specific props beyond shared ones

    return <ViewComponent {...componentProps} />;
  }, [activeActivityItem, isLeftSidebarCollapsed, expandLeftPanel, collapseLeftPanel, allAvailableFiles, activeFile, openFile]);
  
  React.useEffect(() => {
    if (leftPanelRef.current && isLeftSidebarCollapsed) leftPanelRef.current.collapse();
    else if (leftPanelRef.current && !isLeftSidebarCollapsed) leftPanelRef.current.expand(); // ensure expand is called if not collapsed
  }, [isLeftSidebarCollapsed]);

  React.useEffect(() => {
    if (rightPanelRef.current && isRightSidebarCollapsed) rightPanelRef.current.collapse();
    else if (rightPanelRef.current && !isRightSidebarCollapsed) rightPanelRef.current.expand();
  }, [isRightSidebarCollapsed]);

  React.useEffect(() => {
    if (bottomPanelRef.current && isBottomPanelCollapsed) bottomPanelRef.current.collapse();
    else if (bottomPanelRef.current && !isBottomPanelCollapsed) bottomPanelRef.current.expand();
  }, [isBottomPanelCollapsed]);
  
  const branchName = "main";
  const isConnected = true;
  const hasErrors = false;
  const hasWarnings = true;
  const warningsCount = 2;
  
  const openCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(true);
    setCommandPaletteInput("");
  }, []);
  
  const closeCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(false);
    setCommandPaletteInput("");
  }, []);
  
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
        // Future: Implement theme switching logic here
        setPromptDialog(null);
      }
    });
    setSelectedOption(themes[0].id); // Default selection
    closeCommandPalette(); // Close palette after initiating dialog
  }, [closeCommandPalette]);
  
  const handleCommandItemClick = React.useCallback((item: any) => {
    if (item.type === "file") {
      openFile(item.id);
    } else if (item.type === "command" && item.action) {
      item.action();
    }
    closeCommandPalette();
  }, [openFile, closeCommandPalette]);
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        openCommandPalette();
      }
      if (e.key === "Escape") {
        if (isCommandPaletteOpen) closeCommandPalette();
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
  
  const getFilteredItems = React.useCallback(() => {
    const input = commandPaletteInput.toLowerCase().trim();
    
    if (input.startsWith(">")) {
      const commandQuery = input.slice(1).trim();
      const dynamicCommands = [ // Dynamically create commands that need component methods
        ...appConfig.commands,
        { id: "cmd-toggle-sidebar", type: "command", name: "查看: 切换左侧边栏", icon: <ChevronLeft className="h-4 w-4" />, action: toggleLeftSidebar },
        { id: "cmd-toggle-terminal", type: "command", name: "查看: 切换终端", icon: <Terminal className="h-4 w-4" />, action: toggleBottomPanel },
        { id: "cmd-color-theme", type: "command", name: "颜色主题", icon: <Paintbrush className="h-4 w-4" />, action: showThemeSelector },
      ];
      
      if (!commandQuery) return dynamicCommands;
      return dynamicCommands.filter(cmd => cmd.name.toLowerCase().includes(commandQuery));
    }
    
    if (!input) {
      return [{
        id: "default-info",
        type: "info",
        name: "输入 > 可执行命令, # 搜索符号, @ 查找定义",
        icon: <Search className="h-4 w-4" />
      }];
    }
    
    return allAvailableFiles
      .filter(file => file.name.toLowerCase().includes(input))
      .map(file => ({ 
        id: file.id, 
        type: "file", 
        name: file.name,
        icon: <FileText className="h-4 w-4" /> // Default icon
      }));
  }, [commandPaletteInput, allAvailableFiles, toggleLeftSidebar, toggleBottomPanel, showThemeSelector]);
  
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
            onClick={toggleRightSidebar} // Kept for now
          >
            {isRightSidebarCollapsed ? "显示右侧栏" : "隐藏右侧栏"}
          </button>
          <button 
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={toggleBottomPanel} // Kept for now
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
                  setPromptDialog(null);
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
          {appConfig.activityItems.map(item => (
            <button
              key={item.id}
              className={`w-10 h-10 mb-2 flex items-center justify-center rounded ${
                activeActivityItem === item.id ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title={item.title}
              onClick={() => {
                setActiveActivityItem(item.id);
                if (isLeftSidebarCollapsed) { // If an item is clicked on a collapsed sidebar, expand it
                  expandLeftPanel();
                }
              }}
            >
              {item.icon}
            </button>
          ))}
          
          <div className="mt-auto"> {/* Settings Icon */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200"
              title="设置"
              // onClick={() => console.log("Open settings view or dialog")} // TODO: Implement settings action
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            {/* 左侧边栏 - Config driven */}
            <Panel 
              ref={leftPanelRef}
              defaultSize={20}
              minSize={10}
              collapsible={true}
              onCollapse={collapseLeftPanel} // Use direct handlers
              onExpand={expandLeftPanel}     // Use direct handlers
              className="overflow-hidden flex-shrink-0"
              // collapsedSize={0} // react-resizable-panels might not hide it completely, CSS might be needed
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
                    {/* Editor Tabs from openFiles */}
                    <div className="border-b bg-gray-50 flex">
                      {openFiles.map(file => (
                        <button
                          key={file.id}
                          className={`px-3 py-2 flex items-center gap-1 text-sm relative group ${
                            activeFile === file.id
                              ? 'bg-white' // Active tab
                              : 'hover:bg-gray-100' // Inactive tab hover
                          }`}
                          onClick={() => setActiveFile(file.id)}
                        >
                          <FileText className="h-4 w-4 mr-1 flex-shrink-0" /> {/* Default icon */}
                          <span className="truncate">{file.name}</span>
                          <button
                            className="ml-2 p-0.5 rounded-sm hover:bg-gray-300 opacity-60 group-hover:opacity-100"
                            onClick={(e) => closeFile(file.id, e)}
                            title="关闭"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          {activeFile === file.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Editor Content */}
                    <div className="flex-1 p-4 overflow-auto">
                      {activeFile && openFiles.find(f => f.id === activeFile) ? (
                        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                          {openFiles.find(f => f.id === activeFile)?.content}
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
                
                {/* 底部面板 - Kept for now, can be configured */}
                <Panel 
                  ref={bottomPanelRef}
                  defaultSize={25} 
                  minSize={10}
                  collapsible={true}
                  onCollapse={collapseBottomPanel}
                  onExpand={expandBottomPanel}
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
                        onClick={toggleBottomPanel}
                        title={isBottomPanelCollapsed ? "展开底部面板" : "折叠底部面板"}
                      >
                        {isBottomPanelCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
            
            {/* 右侧边栏 - Kept for now, can be configured */}
            <Panel 
              ref={rightPanelRef}
              defaultSize={20} 
              minSize={10}
              collapsible={true}
              onCollapse={collapseRightPanel}
              onExpand={expandRightPanel}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="h-full flex flex-col border-l">
                <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
                  <span className="font-medium truncate">大纲</span> {/* Example, can be config driven */}
                  <button 
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={toggleRightSidebar}
                    title={isRightSidebarCollapsed ? "展开右侧边栏" : "折叠右侧边栏"}
                  >
                    {isRightSidebarCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="text-sm font-medium truncate">文件结构 (示例)</span>
                    </div>
                    {/* Static content for now */}
                      </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
      
      {/* 状态栏 - Kept for now, can be configured */}
      <div className="h-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs flex items-center px-2 justify-between border-t border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            <BranchIcon className="h-3.5 w-3.5 mr-1" />
            <span>{branchName}</span>
          </div>
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
            {hasErrors ? <AlertCircle className="h-3.5 w-3.5 mr-1 text-red-500" /> : hasWarnings ? <AlertCircle className="h-3.5 w-3.5 mr-1 text-yellow-500" /> : <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />}
            <span>{hasErrors ? "错误" : hasWarnings ? `${warningsCount} 警告` : "就绪"}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Other status bar items */}
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">UTF-8</div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">TSX</div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"><Wifi className={`h-3.5 w-3.5 ${isConnected ? "text-green-500" : "text-red-500"}`} /></div>
          <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"><Bell className="h-3.5 w-3.5" /></div>
        </div>
      </div>
      
      {/* 命令面板/搜索 */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-start justify-center pt-[10%] z-50" onClick={closeCommandPalette}>
          <div className="w-[600px] max-w-[80%] bg-white rounded shadow-lg overflow-hidden" onClick={e => e.stopPropagation()}>
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
              <button className="ml-2 p-1 rounded hover:bg-gray-200" onClick={closeCommandPalette}>
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {getFilteredItems().map((item: any) => ( // Added 'any' for item type from getFilteredItems
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
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" /* onClick={() => setPromptDialog(null)} */>
          <div className="w-[400px] max-w-[80%] bg-white rounded shadow-lg p-4" /* onClick={e => e.stopPropagation()} */>
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
                      {selectedOption === option.id && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button 
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                onClick={() => {
                  setPromptDialog(null);
                  setPromptValue("");
                  setSelectedOption(null);
                }}
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
                  // No need to setPromptDialog(null) here as onConfirm should handle it or it's done above.
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
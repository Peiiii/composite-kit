import * as React from "react";
import { VSCodeLayoutComposite, MainPanelTab } from "@/components/vscode-layout-composite";
import {
  Folder,
  Search,
  GitBranch,
  Play,
  LayoutGrid,
  Settings,
  Command,
  FileText,
  Save,
  RefreshCw,
  Paintbrush,
  Eye,
  ChevronLeft,
  Terminal,
  Code,
  Package,
  Users,
  Coffee,
  AlertCircle,
} from "lucide-react";

/**
 * VSCodeLayout面板布局系统演示
 * 
 * 这个演示展示了使用拆分出的面板布局系统构建完整的VSCode布局
 */
export function VSCodeLayoutPanelDemo() {
  // 状态管理
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = React.useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = React.useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = React.useState(false);
  
  // 活动栏状态
  const [activeActivityItem, setActiveActivityItem] = React.useState("explorer");
  
  // 命令面板状态
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [commandPaletteInput, setCommandPaletteInput] = React.useState("");
  
  // 对话框状态
  const [isInputDialogOpen, setIsInputDialogOpen] = React.useState(false);
  const [isSelectDialogOpen, setIsSelectDialogOpen] = React.useState(false);
  
  // 文件管理状态
  const [activeFileId, setActiveFileId] = React.useState("file1");
  const [openFiles, setOpenFiles] = React.useState<MainPanelTab[]>([
    {
      id: "file1",
      label: "index.tsx",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <pre className="text-sm font-mono p-4">
          {`export default function Home() {\n  return <div>Hello World</div>;\n}`}
        </pre>
      ),
      closable: true,
    },
    {
      id: "file2",
      label: "Button.tsx",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <pre className="text-sm font-mono p-4">
          {`export function Button({ children }) {\n  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;\n}`}
        </pre>
      ),
      closable: true,
    },
  ]);
  
  // 底部面板状态
  const [activeTerminalTab, setActiveTerminalTab] = React.useState("terminal1");
  const [isBottomPanelMaximized, setIsBottomPanelMaximized] = React.useState(false);
  
  // 切换面板可见性
  const toggleLeftSidebar = React.useCallback(() => {
    setIsLeftSidebarCollapsed(prev => !prev);
  }, []);
  
  const toggleRightSidebar = React.useCallback(() => {
    setIsRightSidebarCollapsed(prev => !prev);
  }, []);
  
  const toggleBottomPanel = React.useCallback(() => {
    setIsBottomPanelCollapsed(prev => !prev);
  }, []);
  
  // 展开侧边栏
  const expandLeftSidebar = React.useCallback(() => {
    setIsLeftSidebarCollapsed(false);
  }, []);
  
  // 命令面板处理函数
  const handleOpenCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(true);
    setCommandPaletteInput("");
  }, []);
  
  const handleCloseCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);
  
  const handleCommandInputChange = React.useCallback((value: string) => {
    setCommandPaletteInput(value);
  }, []);
  
  // 对话框处理函数
  const handleOpenInputDialog = React.useCallback(() => {
    setIsInputDialogOpen(true);
  }, []);
  
  const handleCloseInputDialog = React.useCallback(() => {
    setIsInputDialogOpen(false);
  }, []);
  
  const handleOpenSelectDialog = React.useCallback(() => {
    setIsSelectDialogOpen(true);
  }, []);
  
  const handleCloseSelectDialog = React.useCallback(() => {
    setIsSelectDialogOpen(false);
  }, []);
  
  // 对话框确认回调
  const handleInputConfirm = React.useCallback((value: string) => {
    alert(`您输入的用户名是: ${value}`);
  }, []);
  
  const handleSelectConfirm = React.useCallback((value: string) => {
    alert(`您选择了主题: ${value}`);
  }, []);
  
  // 设置按钮点击
  const handleSettingsClick = React.useCallback(() => {
    alert("打开设置");
  }, []);
  
  // 命令项目点击处理
  const handleCommandItemClick = React.useCallback((item: any) => {
    if (item.type === "command" && item.action) {
      item.action();
    } else if (item.type === "file") {
      alert(`打开文件: ${item.name}`);
    } else {
      alert(`点击了: ${item.name}`);
    }
    setIsCommandPaletteOpen(false);
  }, []);
  
  // 文件操作
  const handleTabChange = React.useCallback((tabId: string) => {
    setActiveFileId(tabId);
  }, []);
  
  const handleTabClose = React.useCallback((tabId: string) => {
    setOpenFiles(prev => {
      const newFiles = prev.filter(file => file.id !== tabId);
      
      // 如果关闭的是当前活动文件，则切换到另一个文件
      if (tabId === activeFileId && newFiles.length > 0) {
        setActiveFileId(newFiles[newFiles.length - 1].id);
      } else if (newFiles.length === 0) {
        setActiveFileId("");
      }
      
      return newFiles;
    });
  }, [activeFileId]);
  
  // 底部面板操作
  const handleMaximizeBottomPanel = React.useCallback(() => {
    setIsBottomPanelMaximized(prev => !prev);
  }, []);
  
  const handleCloseBottomPanel = React.useCallback(() => {
    setIsBottomPanelCollapsed(true);
  }, []);
  
  // 示例文件列表
  const files = [
    { id: "file1", name: "index.tsx", icon: <FileText className="h-4 w-4" /> },
    { id: "file2", name: "Button.tsx", icon: <FileText className="h-4 w-4" /> },
    { id: "file3", name: "Card.tsx", icon: <FileText className="h-4 w-4" /> },
    { id: "file4", name: "NavBar.tsx", icon: <FileText className="h-4 w-4" /> },
    { id: "file5", name: "Footer.tsx", icon: <FileText className="h-4 w-4" /> },
  ];
  
  // 活动栏项目数据
  const activityItems = [
    { id: "explorer", icon: <Folder className="h-5 w-5" />, title: "资源管理器" },
    { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
    { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
    { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
    { id: "extensions", icon: <LayoutGrid className="h-5 w-5" />, title: "扩展" },
  ];

  // 状态栏属性
  const statusBarProps = {
    branchName: "main",
    hasErrors: false,
    hasWarnings: true,
    warningsCount: 2,
    isConnected: true,
    encoding: "UTF-8",
    fileType: "TSX",
  };
  
  // 命令面板项目 - 根据输入值过滤
  const getFilteredCommandItems = () => {
    const input = commandPaletteInput.toLowerCase().trim();
    
    // 显示命令模式
    if (input.startsWith(">")) {
      const commandQuery = input.slice(1).trim();
      
      // 示例命令列表
      const commands = [
        { id: "cmd1", type: "command", name: "设置: 打开设置", icon: <Settings className="h-4 w-4" />, action: () => alert("打开设置") },
        { id: "cmd2", type: "command", name: "设置: 键盘快捷键", icon: <Command className="h-4 w-4" />, action: () => alert("键盘快捷键") },
        { id: "cmd3", type: "command", name: "重新加载窗口", icon: <RefreshCw className="h-4 w-4" />, action: () => alert("重新加载窗口") },
        { id: "cmd4", type: "command", name: "查看: 切换侧边栏", icon: <ChevronLeft className="h-4 w-4" />, action: () => toggleLeftSidebar() },
        { id: "cmd5", type: "command", name: "查看: 切换终端", icon: <Terminal className="h-4 w-4" />, action: () => toggleBottomPanel() },
        { id: "cmd6", type: "command", name: "文件: 保存", icon: <Save className="h-4 w-4" />, action: () => alert("保存文件") },
        { id: "cmd7", type: "command", name: "颜色主题", icon: <Paintbrush className="h-4 w-4" />, action: () => handleOpenSelectDialog() },
        { id: "cmd8", type: "command", name: "查看: 切换全屏", icon: <Eye className="h-4 w-4" />, action: () => alert("切换全屏") },
      ];
      
      if (!commandQuery) {
        return commands;
      }
      
      // 过滤命令
      return commands.filter(cmd => cmd.name.toLowerCase().includes(commandQuery));
    }
    
    // 默认信息
    if (!input) {
      return [{
        id: "default",
        type: "info",
        name: "输入 > 可执行命令, # 搜索符号, @ 查找定义",
        icon: <Search className="h-4 w-4" />
      }];
    }
    
    // 过滤文件示例
    return files
      .filter(file => file.name.toLowerCase().includes(input))
      .map(file => ({
        id: file.id,
        type: "file",
        name: file.name,
        icon: file.icon
      }));
  };
  
  // 主题选项
  const themeOptions = [
    { id: "dark", label: "深色主题" },
    { id: "light", label: "浅色主题" },
    { id: "highContrast", label: "高对比度" },
  ];
  
  // 渲染侧边栏内容
  const renderSidebarContent = () => {
    switch (activeActivityItem) {
      case "explorer":
        return (
          <div className="p-2">
            <VSCodeLayoutComposite.LeftSidebarGroup title="项目文件">
              {files.map(file => (
                <VSCodeLayoutComposite.LeftSidebarItem
                  key={file.id}
                  icon={file.icon}
                  label={file.name}
                  isActive={file.id === activeFileId}
                  onClick={() => {
                    if (!openFiles.some(f => f.id === file.id)) {
                      setOpenFiles(prev => [
                        ...prev,
                        {
                          id: file.id,
                          label: file.name,
                          icon: file.icon,
                          content: (
                            <pre className="text-sm font-mono p-4">
                              {`// ${file.name} 内容\nexport function ${file.name.replace('.tsx', '')}() {\n  return <div>${file.name}</div>;\n}`}
                            </pre>
                          ),
                          closable: true,
                        }
                      ]);
                    }
                    setActiveFileId(file.id);
                  }}
                />
              ))}
            </VSCodeLayoutComposite.LeftSidebarGroup>
            
            <VSCodeLayoutComposite.LeftSidebarGroup title="资源">
              <VSCodeLayoutComposite.LeftSidebarItem
                icon={<Package className="h-4 w-4" />}
                label="package.json"
              />
              <VSCodeLayoutComposite.LeftSidebarItem
                icon={<Coffee className="h-4 w-4" />}
                label="tsconfig.json"
              />
            </VSCodeLayoutComposite.LeftSidebarGroup>
          </div>
        );
        
      case "search":
        return (
          <div className="p-2">
            <input 
              type="text" 
              placeholder="输入搜索内容..." 
              className="w-full p-2 text-sm border rounded mb-2"
            />
            <div className="text-sm text-gray-500 p-2">输入搜索内容以开始搜索</div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full text-sm text-gray-500">
            <p>{activityItems.find(item => item.id === activeActivityItem)?.title || "未知"} 内容</p>
          </div>
        );
    }
  };
  
  // 渲染右侧边栏内容
  const renderRightSidebarContent = () => {
    return (
      <div className="p-2">
        <VSCodeLayoutComposite.RightSidebarGroup title="大纲">
          <VSCodeLayoutComposite.RightSidebarItem
            label="Home"
            color="text-purple-700"
            icon={<Code className="h-4 w-4" />}
          />
          <VSCodeLayoutComposite.RightSidebarItem
            label="Button"
            color="text-purple-700"
            icon={<Code className="h-4 w-4" />}
          />
          <VSCodeLayoutComposite.RightSidebarItem
            label="handleClick"
            color="text-blue-700"
            icon={<Code className="h-4 w-4" />}
          />
        </VSCodeLayoutComposite.RightSidebarGroup>
        
        <VSCodeLayoutComposite.RightSidebarGroup title="问题">
          <VSCodeLayoutComposite.RightSidebarItem
            label="警告: 未使用的变量"
            description="line 10"
            color="text-yellow-600"
          />
        </VSCodeLayoutComposite.RightSidebarGroup>
      </div>
    );
  };

  return (
    <VSCodeLayoutComposite.Root
      topBarProps={{
        isLeftSidebarCollapsed,
        isRightSidebarCollapsed,
        isBottomPanelCollapsed,
        onToggleLeftSidebar: toggleLeftSidebar,
        onToggleRightSidebar: toggleRightSidebar,
        onToggleBottomPanel: toggleBottomPanel,
        onOpenCommandPalette: handleOpenCommandPalette,
        onShowUsernamePrompt: handleOpenInputDialog,
        onShowThemeSelector: handleOpenSelectDialog,
      }}
      activityBarProps={{
        items: activityItems,
        activeItemId: activeActivityItem,
        onActiveItemChange: setActiveActivityItem,
        isLeftSidebarCollapsed,
        onExpandSidebar: expandLeftSidebar,
        showSettingsButton: true,
        onSettingsClick: handleSettingsClick,
      }}
      statusBarProps={statusBarProps}
      commandPaletteProps={{
        isOpen: isCommandPaletteOpen,
        onClose: handleCloseCommandPalette,
        inputValue: commandPaletteInput,
        onInputChange: handleCommandInputChange,
        items: getFilteredCommandItems(),
        onItemClick: handleCommandItemClick,
      }}
      dialogProps={
        isInputDialogOpen 
          ? {
              type: "input",
              isOpen: isInputDialogOpen,
              onClose: handleCloseInputDialog,
              title: "输入用户名",
              placeholder: "请输入您的用户名",
              onConfirm: handleInputConfirm,
            }
          : isSelectDialogOpen
            ? {
                type: "select",
                isOpen: isSelectDialogOpen,
                onClose: handleCloseSelectDialog,
                title: "选择颜色主题",
                options: themeOptions,
                onConfirm: handleSelectConfirm,
              }
            : undefined
      }
      panelLayoutProps={{
        leftSidebarProps: {
          defaultSize: 20,
          isCollapsed: isLeftSidebarCollapsed,
          onCollapse: () => setIsLeftSidebarCollapsed(true),
          onExpand: () => setIsLeftSidebarCollapsed(false),
          title: activityItems.find(item => item.id === activeActivityItem)?.title || "资源管理器",
          children: renderSidebarContent()
        },
        showLeftSidebar: true,
        rightSidebarProps: {
          defaultSize: 20,
          isCollapsed: isRightSidebarCollapsed,
          onCollapse: () => setIsRightSidebarCollapsed(true),
          onExpand: () => setIsRightSidebarCollapsed(false),
          title: "大纲",
          children: renderRightSidebarContent()
        },
        showRightSidebar: true,
        bottomPanelProps: {
          defaultSize: 30,
          isCollapsed: isBottomPanelCollapsed,
          onCollapse: () => setIsBottomPanelCollapsed(true),
          onExpand: () => setIsBottomPanelCollapsed(false),
          title: "终端",
          icon: <Terminal className="h-4 w-4" />,
          showCloseButton: true,
          showMaximizeButton: true,
          isMaximized: isBottomPanelMaximized,
          onClose: handleCloseBottomPanel,
          onToggleMaximize: handleMaximizeBottomPanel,
          contentClassName: "bg-gray-900 text-gray-200",
          children: (
            <div className="h-full flex flex-col">
              <VSCodeLayoutComposite.BottomPanelTabGroup
                activeId={activeTerminalTab}
                onTabChange={setActiveTerminalTab}
                className="bg-gray-800"
              >
                <VSCodeLayoutComposite.BottomPanelTab 
                  id="terminal1" 
                  label="终端 1" 
                  icon={<Terminal className="h-4 w-4" />}
                  onClose={() => alert("关闭终端 1")} 
                />
                <VSCodeLayoutComposite.BottomPanelTab 
                  id="terminal2" 
                  label="终端 2" 
                  icon={<Terminal className="h-4 w-4" />}
                  onClose={() => alert("关闭终端 2")} 
                />
                <VSCodeLayoutComposite.BottomPanelTab 
                  id="problems" 
                  label="问题" 
                  icon={<AlertCircle className="h-4 w-4" />}
                />
              </VSCodeLayoutComposite.BottomPanelTabGroup>
              <div className="flex-1 p-2 font-mono text-sm overflow-auto">
                {activeTerminalTab === "terminal1" ? (
                  <pre>
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
                ) : activeTerminalTab === "terminal2" ? (
                  <pre>
                    $ git status{"\n"}
                    On branch main{"\n"}
                    Your branch is up to date with 'origin/main'.{"\n"}
                    {"\n"}
                    nothing to commit, working tree clean
                  </pre>
                ) : (
                  <div className="text-yellow-500">
                    <p>项目中有 2 个警告</p>
                    <ul className="list-disc pl-4 mt-2">
                      <li>index.tsx (10,5): 变量"temp"已声明但其值从未被读取。</li>
                      <li>Button.tsx (15,12): 'React' must be in scope when using JSX.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        },
        showBottomPanel: true,
        mainPanelAreaProps: {
          tabs: openFiles,
          activeTabId: activeFileId,
          onTabChange: handleTabChange,
          onTabClose: handleTabClose,
          tabBarClassName: "bg-gray-50",
          contentClassName: "bg-white",
          emptyContent: (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Users className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg">没有打开的文件</p>
              <p className="text-sm mt-2">从左侧资源管理器中选择一个文件以开始</p>
            </div>
          ),
        }
      }}
    />
  );
} 
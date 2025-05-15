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
} from "lucide-react";

/**
 * 简化版VSCode布局Demo，仅使用react-resizable-panels实现
 * 包含活动栏、左侧边栏、编辑区域、右侧边栏和底部面板
 */
export function VSCodeLayoutPureDemo() {
  // 改为使用折叠状态代替可见性状态
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = React.useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = React.useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = React.useState(false);
  
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
  
  return (
    <div className="h-full w-full border rounded-md bg-white overflow-hidden flex flex-col">
      {/* 顶部控制栏 */}
      <div className="flex items-center p-2 border-b bg-gray-50">
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
                  <span className="font-medium">大纲</span>
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
                      <span className="text-sm font-medium">文件结构</span>
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
    </div>
  );
} 
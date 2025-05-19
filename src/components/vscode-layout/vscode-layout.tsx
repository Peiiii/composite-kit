import {
    Bell,
    GitBranch as BranchIcon,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    FileText,
    Folder,
    GitBranch,
    LayoutGrid,
    Play,
    Search,
    Wifi,
  X,
  } from "lucide-react";
  import * as React from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

// =============== 基础布局组件 ===============

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function WorkspaceLayout({
  children,
  className = "",
}: WorkspaceLayoutProps) {
  return (
    <div
      className={`h-full w-full border rounded-md bg-white overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
}

export const SidebarLayout = React.forwardRef<ImperativePanelHandle, SidebarLayoutProps>(({
  children,
  defaultSize = 20,
  minSize = 10,
  className = "",
  collapsible = true,
  onCollapse,
  onExpand,
}, ref) => {
  return (
    <Panel
      ref={ref}
      defaultSize={defaultSize}
      minSize={minSize}
      collapsible={collapsible}
      onCollapse={onCollapse}
      onExpand={onExpand}
      className={`overflow-hidden flex-shrink-0 ${className}`}
    >
      {children}
    </Panel>
  );
});

interface EditorLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorLayout({ children, className = "" }: EditorLayoutProps) {
  return (
    <Panel className={`overflow-hidden ${className}`}>
      <PanelGroup direction="vertical" className="h-full">
        {children}
      </PanelGroup>
    </Panel>
  );
}

// =============== 活动栏组件 ===============

interface ActivityBarProps {
  children: React.ReactNode;
  className?: string;
}

export function ActivityBar({ children, className = "" }: ActivityBarProps) {
  return (
    <div
      className={`w-12 bg-gray-100 flex flex-col items-center py-2 border-r shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ActivityItem({
  icon,
  title,
  isActive,
  onClick,
  className = "",
}: ActivityItemProps) {
  return (
    <button
      className={`w-10 h-10 mb-2 flex items-center justify-center rounded ${
        isActive
          ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
          : "text-gray-600 hover:bg-gray-200"
      } ${className}`}
      title={title}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

// =============== 面板组件 ===============

interface WorkspacePanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  onCollapse?: () => void;
  onExpand?: () => void;
  isCollapsed?: boolean;
}

export function WorkspacePanel({
  title,
  children,
  className = "",
  header,
  onCollapse,
  onExpand,
  isCollapsed,
}: WorkspacePanelProps) {
          return (
    <div className={`h-full flex flex-col ${className}`}>
      {header ||
        (title && (
              <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
            <span className="font-medium truncate">{title}</span>
            {(onCollapse || onExpand) && (
                <button 
                  className="p-1 rounded hover:bg-gray-200"
                onClick={isCollapsed ? onExpand : onCollapse}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
            )}
              </div>
        ))}
      <div className="flex-1 overflow-auto">{children}</div>
            </div>
          );
}

// =============== 编辑器组件 ===============

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className = "" }: TabsProps) {
          return (
    <div className={`border-b bg-gray-50 flex ${className}`}>{children}</div>
  );
}

interface TabProps {
  title: string;
  isActive?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export function Tab({
  title,
  isActive,
  onClose,
  onClick,
  className = "",
}: TabProps) {
          return (
                <button 
      className={`px-3 py-2 flex items-center gap-1 text-sm relative group ${
        isActive ? "bg-white" : "hover:bg-gray-100"
      } ${className}`}
      onClick={onClick}
    >
      <FileText className="h-4 w-4" />
      <span>{title}</span>
      {onClose && (
                <button 
          className="ml-1 p-1 rounded-sm hover:bg-gray-200 opacity-60 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="关闭"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
      )}
                </button>
  );
}

interface EditorContentProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorContent({
  children,
  className = "",
}: EditorContentProps) {
  return (
    <div className={`flex-1 p-4 overflow-auto ${className}`}>{children}</div>
  );
}

// =============== 状态栏组件 ===============

interface StatusBarProps {
  children: React.ReactNode;
  className?: string;
}

export function StatusBar({ children, className = "" }: StatusBarProps) {
  return (
    <div
      className={`h-6 bg-gray-100 text-gray-600 text-xs flex items-center px-2 justify-between border-t border-gray-200 shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

// =============== 布局控制组件 ===============

interface LayoutControlsProps {
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  onToggleBottomPanel?: () => void;
  isLeftSidebarCollapsed?: boolean;
  isRightSidebarCollapsed?: boolean;
  isBottomPanelCollapsed?: boolean;
  className?: string;
}

export function LayoutControls({
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onToggleBottomPanel,
  isLeftSidebarCollapsed,
  isRightSidebarCollapsed,
  isBottomPanelCollapsed,
  className = "",
}: LayoutControlsProps) {
    return (
    <div className={`flex items-center p-2 border-b bg-gray-50 justify-between ${className}`}>
          <div className="flex space-x-2">
        {onToggleLeftSidebar && (
            <button 
              className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={onToggleLeftSidebar}
            >
              {isLeftSidebarCollapsed ? "显示左侧栏" : "隐藏左侧栏"}
            </button>
        )}
        {onToggleRightSidebar && (
            <button 
              className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={onToggleRightSidebar}
            >
              {isRightSidebarCollapsed ? "显示右侧栏" : "隐藏右侧栏"}
            </button>
        )}
        {onToggleBottomPanel && (
            <button 
              className="px-3 py-1 text-sm rounded hover:bg-gray-200"
            onClick={onToggleBottomPanel}
            >
              {isBottomPanelCollapsed ? "显示底部面板" : "隐藏底部面板"}
            </button>
        )}
      </div>
          </div>
  );
}

// =============== 面板控制 Hook ===============

interface PanelControls {
  ref: React.RefObject<ImperativePanelHandle | null>;
  isCollapsed: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
}

export function usePanelControls(initialCollapsed = false): PanelControls {
  const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed);
  const ref = React.useRef<ImperativePanelHandle | null>(null);

  const collapse = React.useCallback(() => {
    ref.current?.collapse();
    setIsCollapsed(true);
  }, []);

  const expand = React.useCallback(() => {
    ref.current?.expand();
    setIsCollapsed(false);
  }, []);

  const toggle = React.useCallback(() => {
    if (isCollapsed) {
      expand();
    } else {
      collapse();
    }
  }, [isCollapsed, expand, collapse]);

  return {
    ref,
    isCollapsed,
    toggle,
    collapse,
    expand,
  };
}

// =============== 面板子组件 ===============

interface PanelHeaderProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onCollapse?: () => void;
  onExpand?: () => void;
  isCollapsed?: boolean;
}

export function PanelHeader({
  title,
  className = "",
  children,
  onCollapse,
  onExpand,
  isCollapsed,
}: PanelHeaderProps) {
  return (
    <div className={`h-10 flex items-center justify-between px-4 border-b bg-gray-50 ${className}`}>
      {children || (
        <>
          <span className="font-medium truncate">{title}</span>
          {(onCollapse || onExpand) && (
            <button 
              className="p-1 rounded hover:bg-gray-200"
              onClick={isCollapsed ? onExpand : onCollapse}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

interface PanelContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function PanelContent({
  children,
  className = "",
  padding = true,
}: PanelContentProps) {
  return (
    <div className={`flex-1 overflow-auto ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  );
}

interface PanelFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function PanelFooter({
  children,
  className = "",
}: PanelFooterProps) {
  return (
    <div className={`h-10 border-t bg-gray-50 flex items-center px-4 ${className}`}>
      {children}
    </div>
  );
}

// =============== 编辑器子组件 ===============

interface EditorHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorHeader({
  children,
  className = "",
}: EditorHeaderProps) {
  return (
    <div className={`border-b bg-gray-50 flex ${className}`}>
      {children}
    </div>
  );
}

interface EditorFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorFooter({
  children,
  className = "",
}: EditorFooterProps) {
  return (
    <div className={`h-6 border-t bg-gray-50 flex items-center px-4 ${className}`}>
      {children}
    </div>
  );
}

// =============== 布局工具组件 ===============

interface ResizeHandleProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ResizeHandle({
  orientation = 'vertical',
  className = "",
}: ResizeHandleProps) {
  return (
    <PanelResizeHandle 
      className={`${
        orientation === 'vertical' 
          ? 'w-1' 
          : 'h-1'
      } bg-gray-200 hover:bg-blue-500 relative group ${className}`}
    >
      <div 
        className={`absolute ${
          orientation === 'vertical'
            ? 'inset-y-0 left-1/2 -translate-x-1/2 w-1'
            : 'inset-x-0 top-1/2 -translate-y-1/2 h-1'
        } group-hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </PanelResizeHandle>
  );
}

// =============== 示例使用 ===============

export function VSCodeLayoutCompoundComponentWorkingOnDemo() {
  // 使用 Hook 管理面板状态
  const leftPanel = usePanelControls();
  const rightPanel = usePanelControls();
  const bottomPanel = usePanelControls();

  const [activeFile, setActiveFile] = React.useState("file1");
  const [activeActivityItem, setActiveActivityItem] = React.useState("explorer");

  // 示例文件数据
  const files = [
    {
      id: "file1",
      name: "index.tsx",
      content: "export default function Home() {\n  return <div>Hello World</div>;\n}",
    },
    {
      id: "file2",
      name: "Button.tsx",
      content: 'export function Button({ children }) {\n  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;\n}',
    },
  ];

  // 活动栏数据
  const activityItems = [
    {
      id: "explorer",
      icon: <Folder className="h-5 w-5" />,
      title: "资源管理器",
    },
    { id: "search", icon: <Search className="h-5 w-5" />, title: "搜索" },
    { id: "git", icon: <GitBranch className="h-5 w-5" />, title: "源代码管理" },
    { id: "debug", icon: <Play className="h-5 w-5" />, title: "运行和调试" },
    {
      id: "extensions",
      icon: <LayoutGrid className="h-5 w-5" />,
      title: "扩展",
    },
  ];

  return (
    <WorkspaceLayout>
      <LayoutControls
        onToggleLeftSidebar={leftPanel.toggle}
        onToggleRightSidebar={rightPanel.toggle}
        onToggleBottomPanel={bottomPanel.toggle}
        isLeftSidebarCollapsed={leftPanel.isCollapsed}
        isRightSidebarCollapsed={rightPanel.isCollapsed}
        isBottomPanelCollapsed={bottomPanel.isCollapsed}
      />
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar>
          {activityItems.map((item) => (
            <ActivityItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              isActive={activeActivityItem === item.id}
              onClick={() => setActiveActivityItem(item.id)}
            />
          ))}
        </ActivityBar>
          
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            <SidebarLayout
              ref={leftPanel.ref}
              onCollapse={leftPanel.collapse}
              onExpand={leftPanel.expand}
            >
              <WorkspacePanel
                title="资源管理器"
                isCollapsed={leftPanel.isCollapsed}
                onCollapse={leftPanel.collapse}
                onExpand={leftPanel.expand}
              >
                <PanelContent>
                  {files.map((file) => (
                    <button
                      key={file.id}
                      className={`flex items-center w-full text-sm px-2 py-1 text-left ${
                        activeFile === file.id
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveFile(file.id)}
                    >
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </PanelContent>
              </WorkspacePanel>
            </SidebarLayout>
              
            <ResizeHandle />
              
            <Panel className="overflow-hidden">
              <PanelGroup direction="vertical" className="h-full">
                <Panel className="overflow-hidden">
                  <WorkspacePanel>
                    <EditorHeader>
                      {files.map((file) => (
                        <Tab
                          key={file.id}
                          title={file.name}
                          isActive={activeFile === file.id}
                          onClick={() => setActiveFile(file.id)}
                          onClose={() => {
                            if (files.length > 1) {
                              const nextFile = files.find((f) => f.id !== file.id);
                              if (nextFile) setActiveFile(nextFile.id);
                            }
                          }}
                        />
                      ))}
                    </EditorHeader>
                    <EditorContent>
                      <pre className="text-sm font-mono">
                        {files.find((f) => f.id === activeFile)?.content}
                      </pre>
                    </EditorContent>
                  </WorkspacePanel>
                </Panel>
                  
                <ResizeHandle orientation="horizontal" />
                  
                <SidebarLayout
                  ref={bottomPanel.ref}
                  defaultSize={25} 
                  onCollapse={bottomPanel.collapse}
                  onExpand={bottomPanel.expand}
                >
                  <WorkspacePanel
                    title="终端"
                    isCollapsed={bottomPanel.isCollapsed}
                    onCollapse={bottomPanel.collapse}
                    onExpand={bottomPanel.expand}
                  >
                    <PanelContent>
                      <div className="bg-gray-900 text-gray-200">
                        <pre className="text-sm font-mono">
                          $ npm start{"\n"}
                          {">"} project@0.1.0 start{"\n"}
                          {">"} react-scripts start{"\n"}
                          {"\n"}
                          Starting the development server...{"\n"}
                          Compiled successfully!{"\n"}
                          {"\n"}
                          You can now view project in the browser.{"\n"}
                          Local: http://localhost:3000
                        </pre>
                      </div>
                    </PanelContent>
                  </WorkspacePanel>
                </SidebarLayout>
              </PanelGroup>
            </Panel>
              
            <ResizeHandle />
              
            <SidebarLayout
              ref={rightPanel.ref}
              onCollapse={rightPanel.collapse}
              onExpand={rightPanel.expand}
            >
              <WorkspacePanel
                title="大纲"
                isCollapsed={rightPanel.isCollapsed}
                onCollapse={rightPanel.collapse}
                onExpand={rightPanel.expand}
              >
                <PanelContent>
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
                    </div>
                  </div>
                </PanelContent>
              </WorkspacePanel>
            </SidebarLayout>
          </PanelGroup>
        </div>
      </div>
        
      <StatusBar>
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            <BranchIcon className="h-3.5 w-3.5 mr-1" />
            <span>main</span>
          </div>
          <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
            <span>就绪</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            UTF-8
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            TSX
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            <Wifi className="h-3.5 w-3.5 text-green-500" />
          </div>
          <div className="px-2 py-0.5 hover:bg-gray-200 rounded cursor-pointer">
            <Bell className="h-3.5 w-3.5" />
          </div>
        </div>
      </StatusBar>
    </WorkspaceLayout>
  );
}

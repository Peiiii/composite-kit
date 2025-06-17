import { ChevronLeft, FileText, X } from "lucide-react";
import * as React from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
      data-testid="workspace-layout"
      className={`h-full w-full border rounded-md bg-background overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

export interface SidebarLayoutProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
}

export const SidebarLayout = React.forwardRef<
  ImperativePanelHandle,
  SidebarLayoutProps
>(
  (
    {
      children,
      defaultSize = 20,
      minSize = 10,
      className = "",
      collapsible = true,
      onCollapse,
      onExpand,
    },
    ref
  ) => {
    return (
      <Panel
        ref={ref}
        data-testid="sidebar-layout"
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
  }
);

interface EditorLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorLayout({ children, className = "" }: EditorLayoutProps) {
  return (
    <Panel
      data-testid="editor-layout"
      className={`overflow-hidden ${className}`}
    >
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
  isExpanded?: boolean;
  onToggle?: () => void;
  expandable?: boolean;
}

export function ActivityBar({
  children,
  className = "",
  isExpanded = false,
  onToggle,
  expandable = false,
}: ActivityBarProps) {
  return (
    <div
      data-testid="activity-bar"
      className={`relative bg-muted flex flex-col items-center py-3 border-r shrink-0 transition-all duration-300 ease-in-out ${
        expandable && isExpanded ? "w-52" : "w-12"
      } ${className}`}
    >
      <div className="w-full flex flex-col items-center gap-1">{children}</div>
      {expandable && onToggle && (
        <button
          data-testid="activity-bar-toggle"
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-muted border rounded-full flex items-center justify-center hover:bg-muted/80 transition-all duration-300 hover:scale-110"
          onClick={onToggle}
        >
          <ChevronLeft
            className={`h-4 w-4 transform transition-transform duration-300 ${
              isExpanded ? "" : "rotate-180"
            }`}
          />
        </button>
      )}
    </div>
  );
}

const activityItemVariants = cva(
  "flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 ease-in-out cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

interface ActivityItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityItemVariants> {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  isExpanded?: boolean;
  expandable?: boolean;
  disabled?: boolean;
  badge?: React.ReactNode;
}

export function ActivityItem({
  icon,
  title,
  isActive = false,
  onClick,
  className = "",
  isExpanded = false,
  expandable = false,
  disabled = false,
  badge,
  ...props
}: ActivityItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const renderBadge = React.useCallback(() => {
    if (!badge) return null;
    if (React.isValidElement(badge)) {
      const element = badge as React.ReactElement<{ className?: string }>;
      return React.cloneElement(element, {
        className: cn("h-5 px-1.5 text-xs font-medium", element.props.className),
      });
    }
    return (
      <span className="h-5 px-1.5 text-xs font-medium bg-muted rounded">
        {badge}
      </span>
    );
  }, [badge]);

  return (
    <div
      data-testid="activity-item"
      className={cn(
        activityItemVariants({ active: isActive }),
        expandable && isExpanded ? "px-3 py-2 mx-2 self-stretch" : "p-2 mx-3",
        "group relative",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-selected={isActive}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={cn("flex-shrink-0 transition-all duration-200 ease-in-out", expandable && isExpanded ? "" : "mx-auto")}>
        {React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
          className: cn(
            "h-5 w-5 transition-colors duration-150",
            isActive ? "text-current" : "text-muted-foreground group-hover:text-foreground"
          ),
        })}
      </div>
      <div
        className={cn(
          "flex flex-1 items-center justify-between min-w-0 transition-all duration-200 ease-in-out",
          expandable && isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 overflow-hidden ml-0"
        )}
      >
        <span className="text-sm font-medium truncate min-w-0">{title}</span>
        {badge && <div className="ml-auto pl-2 flex-shrink-0">{renderBadge()}</div>}
      </div>
    </div>
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
    <div
      data-testid="workspace-panel"
      className={`h-full flex flex-col ${className}`}
    >
      {header ||
        (title && (
          <div className="h-10 flex items-center justify-between px-4 border-b bg-muted/50">
            <span className="font-medium truncate">{title}</span>
            {(onCollapse || onExpand) && (
              <button
                data-testid="workspace-panel-toggle"
                className="p-1 rounded hover:bg-muted"
                onClick={isCollapsed ? onExpand : onCollapse}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      <div className="flex-1 overflow-auto flex flex-col">{children}</div>
    </div>
  );
}

interface ResizablePanelProps {
  children: React.ReactNode;
  className?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
}

export function ResizablePanel({
  children,
  className = "",
  defaultSize,
  minSize,
  maxSize,
  collapsible,
  onCollapse,
  onExpand,
}: ResizablePanelProps) {
  return (
    <Panel
      data-testid="resizable-panel"
      className={`overflow-hidden ${className}`}
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      collapsible={collapsible}
      onCollapse={onCollapse}
      onExpand={onExpand}
    >
      {children}
    </Panel>
  );
}

// =============== 编辑器组件 ===============

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className = "" }: TabsProps) {
  return (
    <div data-testid="tabs" className={`border-b bg-muted/50 flex ${className}`}>
      {children}
    </div>
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
      data-testid="tab"
      className={`px-3 py-2 flex items-center gap-1 text-sm relative group ${
        isActive ? "bg-background" : "hover:bg-muted"
      } ${className}`}
      onClick={onClick}
    >
      <FileText className="h-4 w-4" />
      <span>{title}</span>
      {onClose && (
        <button
          data-testid="tab-close"
          className="ml-1 p-1 rounded-sm hover:bg-muted opacity-60 group-hover:opacity-100"
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
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
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
    <div
      data-testid="editor-content"
      className={`flex-1 p-4 overflow-auto ${className}`}
    >
      {children}
    </div>
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
      data-testid="status-bar"
      className={`h-6 bg-muted text-muted-foreground text-xs flex items-center px-2 justify-between border-t border-border shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

// =============== 状态栏子组件 ===============

interface StatusBarItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StatusBarItem({
  children,
  className = "",
  onClick,
}: StatusBarItemProps) {
  return (
    <div
      data-testid="status-bar-item"
      className={`px-2 py-0.5 hover:bg-muted/80 rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface StatusBarIconItemProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function StatusBarIconItem({
  icon,
  label,
  className = "",
  onClick,
}: StatusBarIconItemProps) {
  return (
    <StatusBarItem
      data-testid="status-bar-icon-item"
      className={className}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-1">{label}</span>
      </div>
    </StatusBarItem>
  );
}

interface StatusBarGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function StatusBarGroup({
  children,
  className = "",
}: StatusBarGroupProps) {
  return (
    <div
      data-testid="status-bar-group"
      className={`flex items-center space-x-2 ${className}`}
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
    <div
      data-testid="layout-controls"
      className={`flex items-center p-2 border-b bg-muted/50 justify-between ${className}`}
    >
      <div className="flex space-x-2">
        {onToggleLeftSidebar && (
          <button
            data-testid="toggle-left-sidebar"
            className="px-3 py-1 text-sm rounded hover:bg-muted"
            onClick={onToggleLeftSidebar}
          >
            {isLeftSidebarCollapsed ? "显示左侧栏" : "隐藏左侧栏"}
          </button>
        )}
        {onToggleRightSidebar && (
          <button
            data-testid="toggle-right-sidebar"
            className="px-3 py-1 text-sm rounded hover:bg-muted"
            onClick={onToggleRightSidebar}
          >
            {isRightSidebarCollapsed ? "显示右侧栏" : "隐藏右侧栏"}
          </button>
        )}
        {onToggleBottomPanel && (
          <button
            data-testid="toggle-bottom-panel"
            className="px-3 py-1 text-sm rounded hover:bg-muted"
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
    <div
      data-testid="panel-header"
      className={`h-10 flex items-center justify-between px-4 border-b bg-muted/50 ${className}`}
    >
      {children || (
        <>
          <span className="font-medium truncate">{title}</span>
          {(onCollapse || onExpand) && (
            <button
              data-testid="panel-header-toggle"
              className="p-1 rounded hover:bg-muted"
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
    <div
      data-testid="panel-content"
      className={`flex-1 overflow-auto ${padding ? "p-4" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

interface PanelFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function PanelFooter({ children, className = "" }: PanelFooterProps) {
  return (
    <div
      data-testid="panel-footer"
      className={`h-10 border-t bg-muted/50 flex items-center px-4 ${className}`}
    >
      {children}
    </div>
  );
}

// =============== 编辑器子组件 ===============

interface EditorHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorHeader({ children, className = "" }: EditorHeaderProps) {
  return (
    <div
      data-testid="editor-header"
      className={`border-b bg-muted/50 flex ${className}`}
    >
      {children}
    </div>
  );
}

interface EditorFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorFooter({ children, className = "" }: EditorFooterProps) {
  return (
    <div
      data-testid="editor-footer"
      className={`h-6 border-t bg-muted/50 flex items-center px-4 ${className}`}
    >
      {children}
    </div>
  );
}

// =============== 布局工具组件 ===============

interface ResizeHandleProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function ResizeHandle({
  orientation = "vertical",
  className = "",
}: ResizeHandleProps) {
  return (
    <PanelResizeHandle
      data-testid="resize-handle"
      className={`${
        orientation === "vertical" ? "w-1" : "h-1"
      } bg-border hover:bg-primary relative group ${className}`}
    >
      <div
        className={`absolute ${
          orientation === "vertical"
            ? "inset-y-0 left-1/2 -translate-x-1/2 w-1"
            : "inset-x-0 top-1/2 -translate-y-1/2 h-1"
        } group-hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </PanelResizeHandle>
  );
}

// =============== 主布局组件 ===============

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div
      data-testid="main-layout"
      className={`flex-1 flex overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className = "" }: MainContentProps) {
  return (
    <div
      data-testid="main-content"
      className={`flex-1 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

interface HorizontalLayoutProps {
  children: React.ReactNode;
  className?: string;
  onLayout?: (sizes: number[]) => void;
  autoSaveId?: string;
}

export function HorizontalLayout({
  children,
  className = "",
  onLayout,
  autoSaveId,
}: HorizontalLayoutProps) {
  return (
    <PanelGroup
      data-testid="horizontal-layout"
      direction="horizontal"
      className={`h-full ${className}`}
      onLayout={onLayout}
      autoSaveId={autoSaveId}
    >
      {children}
    </PanelGroup>
  );
}

interface VerticalLayoutProps {
  children: React.ReactNode;
  className?: string;
  onLayout?: (sizes: number[]) => void;
  autoSaveId?: string;
}

export function VerticalLayout({
  children,
  className = "",
  onLayout,
  autoSaveId,
}: VerticalLayoutProps) {
  return (
    <PanelGroup
      data-testid="vertical-layout"
      direction="vertical"
      className={`h-full ${className}`}
      onLayout={onLayout}
      autoSaveId={autoSaveId}
    >
      {children}
    </PanelGroup>
  );
}

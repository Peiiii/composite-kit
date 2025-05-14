import * as React from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
  ImperativePanelGroupHandle,
} from "react-resizable-panels";
import { usePanelState } from "./hooks/use-panel-state";

// 根布局组件
interface VSCodeLayoutRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const VSCodeLayoutRoot = React.forwardRef<HTMLDivElement, VSCodeLayoutRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-full w-full ${className || ""}`}
        {...props}
      >
        <div className="h-full w-full rounded-lg border bg-background overflow-hidden flex">
          {children}
        </div>
      </div>
    );
  }
);
VSCodeLayoutRoot.displayName = "VSCodeLayout.Root";

// 活动栏组件
interface VSCodeLayoutActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const VSCodeLayoutActivityBar = React.forwardRef<HTMLDivElement, VSCodeLayoutActivityBarProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0 ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
VSCodeLayoutActivityBar.displayName = "VSCodeLayout.ActivityBar";

// 主布局容器
interface VSCodeLayoutMainProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const VSCodeLayoutMain = React.forwardRef<HTMLDivElement, VSCodeLayoutMainProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex-1 h-full ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
VSCodeLayoutMain.displayName = "VSCodeLayout.Main";

// 水平面板组
interface VSCodeLayoutHorizontalProps {
  children: React.ReactNode;
  className?: string;
  onLayout?: (sizes: number[]) => void;
  autoSaveId?: string;
}

const VSCodeLayoutHorizontal = React.forwardRef<ImperativePanelGroupHandle, VSCodeLayoutHorizontalProps>(
  ({ children, className, onLayout, autoSaveId, ...props }, ref) => {
    return (
      <PanelGroup
        ref={ref}
        direction="horizontal"
        className={className}
        onLayout={onLayout}
        autoSaveId={autoSaveId}
        {...props}
      >
        {children}
      </PanelGroup>
    );
  }
);
VSCodeLayoutHorizontal.displayName = "VSCodeLayout.Horizontal";

// 垂直面板组
interface VSCodeLayoutVerticalProps {
  children: React.ReactNode;
  className?: string;
  onLayout?: (sizes: number[]) => void;
  autoSaveId?: string;
}

const VSCodeLayoutVertical = React.forwardRef<ImperativePanelGroupHandle, VSCodeLayoutVerticalProps>(
  ({ children, className, onLayout, autoSaveId, ...props }, ref) => {
    return (
      <PanelGroup
        ref={ref}
        direction="vertical"
        className={className}
        onLayout={onLayout}
        autoSaveId={autoSaveId}
        {...props}
      >
        {children}
      </PanelGroup>
    );
  }
);
VSCodeLayoutVertical.displayName = "VSCodeLayout.Vertical";

// 面板组件
interface VSCodeLayoutPanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  className?: string;
}

const VSCodeLayoutPanel = React.forwardRef<ImperativePanelHandle, VSCodeLayoutPanelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Panel ref={ref} className={className} {...props}>
        {children}
      </Panel>
    );
  }
);
VSCodeLayoutPanel.displayName = "VSCodeLayout.Panel";

// 面板分隔线
interface VSCodeLayoutResizeHandleProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  withHandle?: boolean;
}

const VSCodeLayoutResizeHandle: React.FC<VSCodeLayoutResizeHandleProps> = ({
  className,
  orientation = "vertical",
  withHandle = false,
  ...props
}) => {
  const baseClassName = orientation === "vertical"
    ? "w-1 bg-border hover:bg-primary/20 transition-colors"
    : "h-1 bg-border hover:bg-primary/20 transition-colors";
    
  const handleClassName = orientation === "vertical"
    ? "group relative w-1 bg-border hover:bg-primary/20 transition-colors after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:h-8 after:w-[4px] after:rounded-sm after:bg-border after:opacity-0 after:group-hover:opacity-100 after:transition"
    : "group relative h-1 bg-border hover:bg-primary/20 transition-colors after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-8 after:h-[4px] after:rounded-sm after:bg-border after:opacity-0 after:group-hover:opacity-100 after:transition";

  return (
    <PanelResizeHandle
      className={className || (withHandle ? handleClassName : baseClassName)}
      {...props}
    />
  );
};
VSCodeLayoutResizeHandle.displayName = "VSCodeLayout.ResizeHandle";

// 左侧边栏
interface VSCodeLayoutLeftSidebarProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

const VSCodeLayoutLeftSidebar = React.forwardRef<ImperativePanelHandle, VSCodeLayoutLeftSidebarProps>(
  ({ children, defaultSize = 20, minSize = 15, maxSize = 30, className, ...props }, ref) => {
    const panelState = usePanelState();
    const panelRef = React.useRef<ImperativePanelHandle>(null);
    const resolvedRef = (ref || panelRef) as React.RefObject<ImperativePanelHandle>;

    return (
      <Panel
        ref={resolvedRef}
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        collapsible
        onCollapse={panelState.collapse}
        onExpand={panelState.expand}
        className={className}
        {...props}
      >
        {children}
      </Panel>
    );
  }
);
VSCodeLayoutLeftSidebar.displayName = "VSCodeLayout.LeftSidebar";

// 右侧边栏
interface VSCodeLayoutRightSidebarProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

const VSCodeLayoutRightSidebar = React.forwardRef<ImperativePanelHandle, VSCodeLayoutRightSidebarProps>(
  ({ children, defaultSize = 20, minSize = 15, maxSize = 30, className, ...props }, ref) => {
    const panelState = usePanelState();
    const panelRef = React.useRef<ImperativePanelHandle>(null);
    const resolvedRef = (ref || panelRef) as React.RefObject<ImperativePanelHandle>;

    return (
      <Panel
        ref={resolvedRef}
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        collapsible
        onCollapse={panelState.collapse}
        onExpand={panelState.expand}
        className={className}
        {...props}
      >
        {children}
      </Panel>
    );
  }
);
VSCodeLayoutRightSidebar.displayName = "VSCodeLayout.RightSidebar";

// 底部面板
interface VSCodeLayoutBottomPanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
}

const VSCodeLayoutBottomPanel = React.forwardRef<ImperativePanelHandle, VSCodeLayoutBottomPanelProps>(
  ({ children, defaultSize = 30, minSize = 20, className, ...props }, ref) => {
    const panelState = usePanelState();
    const panelRef = React.useRef<ImperativePanelHandle>(null);
    const resolvedRef = (ref || panelRef) as React.RefObject<ImperativePanelHandle>;

    return (
      <Panel
        ref={resolvedRef}
        defaultSize={defaultSize}
        minSize={minSize}
        collapsible
        onCollapse={panelState.collapse}
        onExpand={panelState.expand}
        className={className}
        {...props}
      >
        {children}
      </Panel>
    );
  }
);
VSCodeLayoutBottomPanel.displayName = "VSCodeLayout.BottomPanel";

// 内容区
interface VSCodeLayoutContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const VSCodeLayoutContent = React.forwardRef<HTMLDivElement, VSCodeLayoutContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-full w-full ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
VSCodeLayoutContent.displayName = "VSCodeLayout.Content";

// 导出复合组件
export const VSCodeLayout = {
  Root: VSCodeLayoutRoot,
  ActivityBar: VSCodeLayoutActivityBar,
  Main: VSCodeLayoutMain,
  Horizontal: VSCodeLayoutHorizontal,
  Vertical: VSCodeLayoutVertical,
  Panel: VSCodeLayoutPanel,
  ResizeHandle: VSCodeLayoutResizeHandle,
  LeftSidebar: VSCodeLayoutLeftSidebar,
  RightSidebar: VSCodeLayoutRightSidebar,
  BottomPanel: VSCodeLayoutBottomPanel,
  Content: VSCodeLayoutContent,
}; 
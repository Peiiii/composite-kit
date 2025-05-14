import * as React from "react";
import { cn } from "@/lib/utils";

// 根组件
interface BottomPanelRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BottomPanelRoot = React.forwardRef<HTMLDivElement, BottomPanelRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-full flex-col border-t", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BottomPanelRoot.displayName = "BottomPanel.Root";

// 标签区域组件
interface BottomPanelTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BottomPanelTabs = React.forwardRef<HTMLDivElement, BottomPanelTabsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-muted/40 border-b flex", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BottomPanelTabs.displayName = "BottomPanel.Tabs";

// 标签组件
interface BottomPanelTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const BottomPanelTab = React.forwardRef<HTMLButtonElement, BottomPanelTabProps>(
  ({ className, children, icon, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-3 py-1.5 text-xs border-r flex items-center transition-colors",
          active ? "bg-background" : "hover:bg-muted",
          className
        )}
        {...props}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {children}
      </button>
    );
  }
);
BottomPanelTab.displayName = "BottomPanel.Tab";

// 内容组件
interface BottomPanelContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BottomPanelContent = React.forwardRef<HTMLDivElement, BottomPanelContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto bg-muted/10", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BottomPanelContent.displayName = "BottomPanel.Content";

// 导出复合组件
export const BottomPanel = {
  Root: BottomPanelRoot,
  Tabs: BottomPanelTabs,
  Tab: BottomPanelTab,
  Content: BottomPanelContent,
}; 
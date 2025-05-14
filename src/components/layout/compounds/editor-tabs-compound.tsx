import * as React from "react";
import { cn } from "@/lib/utils";

// 根组件
interface EditorTabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const EditorTabsRoot = React.forwardRef<HTMLDivElement, EditorTabsRootProps>(
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
EditorTabsRoot.displayName = "EditorTabs.Root";

// 标签组件
interface EditorTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const EditorTab = React.forwardRef<HTMLButtonElement, EditorTabProps>(
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
EditorTab.displayName = "EditorTabs.Tab";

// 导出复合组件
export const EditorTabs = {
  Root: EditorTabsRoot,
  Tab: EditorTab,
}; 
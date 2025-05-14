import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 根组件
interface SidebarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: "left" | "right";
  onToggle?: () => void;
}

const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  ({ className, children, position = "left", onToggle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-full flex flex-col", position === "left" ? "border-r" : "border-l", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && 
              child.type === SidebarHeader) {
            // 类型断言以确保 React 知道子元素的确切类型
            return React.cloneElement(child as React.ReactElement<SidebarHeaderProps>, {
              onToggle,
              position,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
SidebarRoot.displayName = "Sidebar.Root";

// 头部组件
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onToggle?: () => void;
  position?: "left" | "right";
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, onToggle, position = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-10 flex items-center justify-between px-4 border-b", className)}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {onToggle && (
          <button
            className="p-1 hover:bg-accent rounded-md"
            onClick={onToggle}
          >
            {position === "left" ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
SidebarHeader.displayName = "Sidebar.Header";

// 内容组件
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "Sidebar.Content";

// 导出复合组件
export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
};

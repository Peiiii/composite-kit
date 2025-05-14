import * as React from "react";
import { cn } from "@/lib/utils";

// 根组件
interface ActivityBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ActivityBarRoot = React.forwardRef<HTMLDivElement, ActivityBarRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center py-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ActivityBarRoot.displayName = "ActivityBar.Root";

// 分组组件
interface ActivityBarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ActivityBarGroup = React.forwardRef<HTMLDivElement, ActivityBarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ActivityBarGroup.displayName = "ActivityBar.Group";

// 项目组件
interface ActivityBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  active?: boolean;
}

const ActivityBarItem = React.forwardRef<HTMLButtonElement, ActivityBarItemProps>(
  ({ className, icon, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "p-2 rounded-md transition-colors",
          active ? "bg-accent/50" : "hover:bg-accent",
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
ActivityBarItem.displayName = "ActivityBar.Item";

// 导出复合组件
export const ActivityBarCompound = {
  Root: ActivityBarRoot,
  Group: ActivityBarGroup,
  Item: ActivityBarItem,
}; 
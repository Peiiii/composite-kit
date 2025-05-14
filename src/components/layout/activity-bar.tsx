import * as React from "react";
import { cn } from "@/lib/utils";

interface ActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ActivityBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon: React.ReactNode;
}

const ActivityBar = React.forwardRef<HTMLDivElement, ActivityBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-12 h-full bg-muted flex flex-col items-center py-2 border-r shrink-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ActivityBar.displayName = "ActivityBar";

const ActivityBarItem = React.forwardRef<HTMLButtonElement, ActivityBarItemProps>(
  ({ className, active, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "p-2 hover:bg-accent rounded-md mb-2",
          active && "bg-accent/30",
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
ActivityBarItem.displayName = "ActivityBarItem";

const ActivityBarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      />
    );
  }
);
ActivityBarGroup.displayName = "ActivityBarGroup";

export { ActivityBar, ActivityBarItem, ActivityBarGroup }; 
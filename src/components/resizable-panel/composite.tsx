import * as React from "react";
import {
  Panel as ResizablePanelBase,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";
import type {
  ResizablePanelProps,
  ResizablePanelGroupProps,
  ResizableHandleProps,
  ResizablePanelRef,
  ResizablePanelGroupRef,
} from "./types";

type ResizableContextValue = {
  direction: "horizontal" | "vertical";
  onLayout?: (sizes: number[]) => void;
  autoSaveId?: string;
};

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

const useResizable = () => {
  const context = React.useContext(ResizableContext);
  if (!context) {
    throw new Error("Resizable components must be used within a Resizable.Root");
  }
  return context;
};

const Root = React.forwardRef<
  ResizablePanelGroupRef,
  ResizablePanelGroupProps
>(({
  children,
  className,
  direction = "horizontal",
  onLayout,
  autoSaveId,
  ...props
}, ref) => {
  const value = React.useMemo(
    () => ({
      direction,
      onLayout,
      autoSaveId,
    }),
    [direction, onLayout, autoSaveId]
  );

  return (
    <ResizableContext.Provider value={value}>
      <PanelGroup
        ref={ref}
        direction={direction}
        className={cn("flex", direction === "horizontal" ? "flex-row" : "flex-col", className)}
        onLayout={onLayout}
        {...props}
      >
        {children}
      </PanelGroup>
    </ResizableContext.Provider>
  );
});
Root.displayName = "Resizable.Root";

const Panel = React.forwardRef<ResizablePanelRef, ResizablePanelProps>(
  ({
    children,
    className,
    showCollapseButton,
    collapseButtonPosition = "end",
    collapseButtonIcon,
    enableDoubleClickReset,
    doubleClickResetSize,
    onResize,
    ...props
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const panelRef = React.useRef<ImperativePanelHandle>(null);

    const handleDoubleClick = React.useCallback(() => {
      if (enableDoubleClickReset && doubleClickResetSize !== undefined && panelRef.current) {
        panelRef.current.resize(doubleClickResetSize);
      }
    }, [enableDoubleClickReset, doubleClickResetSize]);

    const handleCollapse = React.useCallback(() => {
      if (panelRef.current) {
        setIsAnimating(true);
        
        requestAnimationFrame(() => {
          if (isCollapsed) {
            panelRef.current?.expand();
          } else {
            panelRef.current?.collapse();
          }
          setIsCollapsed(!isCollapsed);

          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        });
      }
    }, [isCollapsed]);

    const handleResize = React.useCallback((size: number) => {
      if (panelRef.current) {
        const isCurrentlyCollapsed = panelRef.current.isCollapsed();
        if (isCurrentlyCollapsed !== isCollapsed) {
          setIsCollapsed(isCurrentlyCollapsed);
        }
      }
      onResize?.(size);
    }, [isCollapsed, onResize]);

    return (
      <ResizablePanelBase
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          panelRef.current = node;
        }}
        className={cn(
          "relative",
          isAnimating && "transition-all duration-300 ease-in-out",
          className
        )}
        onDoubleClick={handleDoubleClick}
        onResize={handleResize}
        {...props}
      >
        <div className={cn(
          "h-full w-full overflow-hidden",
          isAnimating && "transition-all duration-300 ease-in-out",
          isCollapsed && "opacity-0"
        )}>
          <div className="h-full w-full whitespace-nowrap">
            {children}
          </div>
        </div>
        {showCollapseButton && (
          <button
            className={cn(
              "absolute top-2 z-10 rounded-md p-1 hover:bg-accent",
              isAnimating && "transition-all duration-300 ease-in-out",
              collapseButtonPosition === "start" ? "left-2" : "right-2",
              isCollapsed && "rotate-180"
            )}
            onClick={handleCollapse}
          >
            {collapseButtonIcon || (
              <span className="text-sm">
                {isCollapsed ? "→" : "←"}
              </span>
            )}
          </button>
        )}
      </ResizablePanelBase>
    );
  }
);
Panel.displayName = "Resizable.Panel";

const Handle = ({ className, ...props }: ResizableHandleProps) => {
  const { direction } = useResizable();

  return (
    <PanelResizeHandle
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      data-panel-group-direction={direction}
      {...props}
    >
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border" />
    </PanelResizeHandle>
  );
};
Handle.displayName = "Resizable.Handle";

export const ResizablePanel = {
  Root,
  Panel,
  Handle,
}; 
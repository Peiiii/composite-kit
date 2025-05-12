import * as React from "react";
import { cn } from "@/lib/utils";
import { ActivityBar } from "@/components/activity-bar";
import { Separator } from "@/components/ui/separator";

export interface VSCodeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  activityBar?: React.ReactNode;
  sideBar?: React.ReactNode;
  editor?: React.ReactNode;
  panel?: React.ReactNode;
  statusBar?: React.ReactNode;
  secondarySideBar?: React.ReactNode;
  sideBarWidth?: string;
  secondarySideBarWidth?: string;
  panelHeight?: string;
}

export function VSCodeLayout({
  activityBar,
  sideBar,
  editor,
  panel,
  statusBar,
  secondarySideBar,
  sideBarWidth = "w-64",
  secondarySideBarWidth = "w-64",
  panelHeight = "h-48",
  className,
  ...props
}: VSCodeLayoutProps) {
  return (
    <div className={cn("flex w-full h-full bg-background overflow-hidden", className)} {...props}>
      {/* 左侧活动栏 */}
      {activityBar && (
        <div className="flex-shrink-0">
          {activityBar}
        </div>
      )}

      {/* 左侧侧边栏 */}
      {sideBar && (
        <div className={cn("flex-shrink-0 border-r", sideBarWidth)}>
          {sideBar}
        </div>
      )}

      {/* 主内容区 */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 编辑器区域 */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {editor}
        </div>

        {/* 底部面板 */}
        {panel && (
          <>
            <Separator />
            <div className={cn("flex-shrink-0 overflow-hidden", panelHeight)}>
              {panel}
            </div>
          </>
        )}

        {/* 状态栏 */}
        {statusBar && (
          <>
            <Separator />
            <div className="h-6 flex-shrink-0 overflow-hidden">
              {statusBar}
            </div>
          </>
        )}
      </div>

      {/* 右侧侧边栏 */}
      {secondarySideBar && (
        <div className={cn("flex-shrink-0 border-l overflow-hidden", secondarySideBarWidth)}>
          {secondarySideBar}
        </div>
      )}
    </div>
  );
} 
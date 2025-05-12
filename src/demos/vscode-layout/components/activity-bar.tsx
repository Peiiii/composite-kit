import { ActivityBar } from "@/components/activity-bar";
import { BookOpen, Bug, FileText, HelpCircle, Home, Search, Settings } from "lucide-react";
import * as React from "react";

interface ActivityBarProps {
  expanded: boolean;
  activeSection: string;
  onExpandedChange: (expanded: boolean) => void;
  onActiveChange: (section: string) => void;
}

export function VSCodeActivityBar({
  expanded,
  activeSection,
  onExpandedChange,
  onActiveChange,
}: ActivityBarProps) {
  return (
    <ActivityBar.Root
      expanded={expanded}
      defaultActiveId={activeSection}
      onExpandedChange={onExpandedChange}
      onActiveChange={onActiveChange}
    >
      <ActivityBar.Header
        icon={<BookOpen />}
        title="VS Code"
        showSearch={true}
      />

      <ActivityBar.GroupList>
        <ActivityBar.Group title="导航">
          <ActivityBar.Item id="explorer" icon={<FileText />} label="资源管理器" />
          <ActivityBar.Item id="search" icon={<Search />} label="搜索" />
          <ActivityBar.Item id="source-control" icon={<Home />} label="源代码管理" />
          <ActivityBar.Item id="debug" icon={<Bug />} label="运行和调试" />
        </ActivityBar.Group>
      </ActivityBar.GroupList>

      <ActivityBar.Footer>
        <ActivityBar.Separator />
        <ActivityBar.Group>
          <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
          <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
        </ActivityBar.Group>
      </ActivityBar.Footer>
    </ActivityBar.Root>
  );
} 
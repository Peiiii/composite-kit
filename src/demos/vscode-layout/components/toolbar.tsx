import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelRightClose, Terminal, X } from "lucide-react";

interface ToolbarProps {
  showSideBar: boolean;
  showPanel: boolean;
  showSecondarySideBar: boolean;
  showStatusBar: boolean;
  onToggleSideBar: () => void;
  onTogglePanel: () => void;
  onToggleSecondarySideBar: () => void;
  onToggleStatusBar: () => void;
}

export function VSCodeToolbar({
  showSideBar,
  showPanel,
  showSecondarySideBar,
  showStatusBar,
  onToggleSideBar,
  onTogglePanel,
  onToggleSecondarySideBar,
  onToggleStatusBar,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSideBar}
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePanel}
        >
          <Terminal className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSecondarySideBar}
        >
          <PanelRightClose className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleStatusBar}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 
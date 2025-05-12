import { VSCodeLayout } from "@/components/layout/vscode-layout";
import * as React from "react";
import { VSCodeActivityBar } from "./components/activity-bar";
import { VSCodeEditor } from "./components/editor";
import { VSCodePanel } from "./components/panel";
import { VSCodeSecondarySideBar } from "./components/secondary-side-bar";
import { VSCodeSideBar } from "./components/side-bar";
import { VSCodeStatusBar } from "./components/status-bar";
import { VSCodeToolbar } from "./components/toolbar";

export default function VSCodeLayoutDemo() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("explorer");
  const [showSecondarySideBar, setShowSecondarySideBar] = React.useState(true);
  const [showSideBar, setShowSideBar] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(true);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <VSCodeToolbar
        showSideBar={showSideBar}
        showPanel={showPanel}
        showSecondarySideBar={showSecondarySideBar}
        showStatusBar={showStatusBar}
        onToggleSideBar={() => setShowSideBar(!showSideBar)}
        onTogglePanel={() => setShowPanel(!showPanel)}
        onToggleSecondarySideBar={() => setShowSecondarySideBar(!showSecondarySideBar)}
        onToggleStatusBar={() => setShowStatusBar(!showStatusBar)}
      />

      <VSCodeLayout
        activityBar={
          <VSCodeActivityBar
            expanded={expanded}
            activeSection={activeSection}
            onExpandedChange={setExpanded}
            onActiveChange={setActiveSection}
          />
        }
        sideBar={showSideBar ? <VSCodeSideBar /> : undefined}
        editor={<VSCodeEditor />}
        panel={showPanel ? <VSCodePanel /> : undefined}
        statusBar={showStatusBar ? <VSCodeStatusBar /> : undefined}
        secondarySideBar={showSecondarySideBar ? <VSCodeSecondarySideBar /> : undefined}
      />
    </div>
  );
} 
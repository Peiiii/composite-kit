import * as React from "react";
import { DemoGallery, DemoCardContainer } from "@/components/demo-gallery";
import { ActivityBar } from "@/components/activity-bar";
import { Home, BookOpen, Settings, HelpCircle } from "lucide-react";
import ThemeSwitcherDemo from "./demos/theme-switcher";
import MobileNavComposite from "./demos/mobile-nav-composite/page";
import CommandPaletteDemo from "./demos/command-palette/page";
import { resizablePanelDemos } from "./demos/resizable-panel-composite/demos";
import { activityBarDemos } from "./demos/activity-bar-composite/demos";
import { demoGalleryDemos } from "./demos/demo-gallery-composite/demos";
import { vscodeLayoutDemos } from "./demos/vscode-layout-v2/demos";
import { wechatLayoutDemos } from "./demos/wechat-layout/demos";
import { dingtalkLayoutDemos } from "./demos/dingtalk-layout/demos";

// 所有 demo 的配置
const demos = [
  {
    id: "theme-switcher",
    title: "主题切换器",
    component: <ThemeSwitcherDemo />,
    description: "展示如何使用主题切换器在不同主题之间切换",
    category: "主题系统",
    tags: ["theme", "主题切换", "material-design"],
  },
  {
    id: "command-palette",
    title: "命令面板",
    component: <CommandPaletteDemo />,
    description: "类似 VSCode 的命令面板实现，支持快捷键和模糊搜索",
    category: "交互组件",
    tags: ["command-palette", "快捷键", "搜索"],
  },
  ...dingtalkLayoutDemos,
  ...wechatLayoutDemos,
  ...vscodeLayoutDemos,
  ...resizablePanelDemos,
  ...activityBarDemos,
  ...demoGalleryDemos,
  {
    id: "mobile-nav-composite",
    title: "移动端导航 (复合组件模式)",
    component: <MobileNavComposite />,
    description: "使用复合组件模式构建移动端导航",
    category: "布局组件",
    tags: ["mobile-nav", "复合组件", "响应式"],
  },
];

const App = React.memo(function App() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("home");

  return (
    <div className="flex h-full bg-background">
      <ActivityBar.Root
        expanded={expanded}
        defaultActiveId={activeSection}
        onExpandedChange={setExpanded}
        onActiveChange={setActiveSection}
        className="flex-shrink-0"
      >
        <ActivityBar.Header
          icon={<BookOpen />}
          title="组件库"
          showSearch={true}
        />

        <ActivityBar.GroupList>
          <ActivityBar.Group title="导航">
            <ActivityBar.Item id="home" icon={<Home />} label="首页" />
            <ActivityBar.Item id="demos" icon={<BookOpen />} label="组件演示" />
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

      <div className="flex-1 overflow-hidden">
        <DemoGallery.Root
          demos={demos}
          defaultDemoId="vscode-layout-v2"
          className="h-full"
        >
          <DemoGallery.Sidebar
            title="组件库演示"
            showSearch={true}
            showCategoryFilter={true}
            showTags={true}
            showDescription={true}
            sidebarWidth="w-64"
          />
          <DemoGallery.ExpandButton />
          <DemoGallery.Content>
            <DemoCardContainer
              showTags={true}
              showDescription={true}
              bodyProps={{
                scrollable: true,
                scrollDirection: "both",
                contentHeight: "min-h-[600px] h-[600px]",
              }}
            />
          </DemoGallery.Content>
        </DemoGallery.Root>
      </div>
    </div>
  );
});

export default App;

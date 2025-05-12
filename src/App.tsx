import * as React from "react";
import { DemoGallery, DemoCardContainer } from "@/components/demo-gallery";
import { ActivityBar } from "@/components/activity-bar";
import { Home, BookOpen, Settings, HelpCircle } from "lucide-react";
import ActivityBarComposite from "./demos/activity-bar-composite/page";
import ActivityBarConfigurable from "./demos/activity-bar-configurable/page";
import DemoGalleryComposite from "./demos/demo-gallery-composite/page";
import DemoGalleryConfigurable from "./demos/demo-gallery-configurable/page";
import { DemoGalleryCustomComposite } from "./demos/demo-gallery-composite/custom-composite";
import ThemeSwitcherDemo from "./demos/theme-switcher";
import MobileNavComposite from "./demos/mobile-nav-composite/page";
import VSCodeLayoutDemo from "./demos/vscode-layout/page";
import ChatLayoutDemo from "./demos/chat-layout/page";
import WeChatLayoutDemo from "./demos/wechat-layout/page";
import QQLayoutDemo from "./demos/qq-layout/page";

// 所有 demo 的配置
const demos = [
  {
    id: "wechat-layout",
    title: "微信布局",
    component: <WeChatLayoutDemo />,
    description: "一个类似微信的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化", "微信"],
  },
  {
    id: "qq-layout",
    title: "QQ 布局",
    component: <QQLayoutDemo />,
    description: "一个类似 QQ 的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化", "QQ"],
  },
  {
    id: "chat-layout",
    title: "聊天应用布局",
    component: <ChatLayoutDemo />,
    description: "一个类似 Discord/微信的现代化聊天应用布局",
    category: "布局组件",
    tags: ["layout", "chat", "现代化"],
  },
  {
    id: "vscode-layout",
    title: "VS Code 布局",
    component: <VSCodeLayoutDemo />,
    description: "一个类似 VS Code 的现代化布局方案",
    category: "布局组件",
    tags: ["layout", "vscode", "现代化"],
  },
  {
    id: "theme-switcher",
    title: "主题切换器",
    component: <ThemeSwitcherDemo />,
    description: "展示如何使用主题切换器在不同主题之间切换",
    category: "主题系统",
    tags: ["theme", "主题切换", "material-design"],
  },
  {
    id: "activity-bar-configurable",
    title: "Activity Bar (配置模式)",
    component: <ActivityBarConfigurable />,
    description: "使用配置对象的方式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "配置模式"],
  },
  {
    id: "activity-bar-composite",
    title: "Activity Bar (复合组件模式)",
    component: <ActivityBarComposite />,
    description: "使用复合组件模式构建 Activity Bar",
    category: "布局组件",
    tags: ["activity-bar", "复合组件"],
  },
  {
    id: "mobile-nav-composite",
    title: "移动端导航 (复合组件模式)",
    component: <MobileNavComposite />,
    description: "使用复合组件模式构建移动端导航",
    category: "布局组件",
    tags: ["mobile-nav", "复合组件", "响应式"],
  },
  {
    id: "demo-gallery-configurable",
    title: "Demo Gallery (配置模式)",
    component: <DemoGalleryConfigurable />,
    description: "使用配置对象的方式构建 Demo Gallery",
    category: "布局组件",
    tags: ["demo-gallery", "配置模式"],
  },
  {
    id: "demo-gallery-composite",
    title: "Demo Gallery (复合组件模式)",
    component: <DemoGalleryComposite />,
    description: "使用复合组件模式构建 Demo Gallery",
    category: "布局组件",
    tags: ["demo-gallery", "复合组件"],
  },
  {
    id: "demo-gallery-custom-composite",
    title: "Demo Gallery (自定义组合模式)",
    component: <DemoGalleryCustomComposite />,
    description:
      "使用自定义组合模式构建 Demo Gallery，展示如何使用基础组件进行组合",
    category: "布局组件",
    tags: ["demo-gallery", "自定义组合"],
  },
];

const App = React.memo(function App() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("home");

  return (
    <div className="flex h-screen bg-background">
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
          defaultDemoId="theme-switcher"
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
          <DemoGallery.Content >
            <DemoCardContainer
              showTags={true}
              showDescription={true}
              bodyProps={{
                scrollable: true,
                scrollDirection: "both",
                contentHeight: "min-h-[600px]",
              }}
            />
          </DemoGallery.Content>
        </DemoGallery.Root>
      </div>
    </div>
  );
});

export default App;

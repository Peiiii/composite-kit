import { Conversation } from "@/components/dingtalk-layout/components/message";
import { SwitchRule, useSwitch } from "@/components/dingtalk-layout/hooks/use-switch";
import { useConversationState } from "@/components/dingtalk-layout/hooks/use-conversation-state";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Dtl, NavItem } from "..";

const MOCK_NAV_ITEMS = [
  {
    id: "workbench",
    icon: Home,
    label: "工作台",
  },
  {
    id: "message",
    icon: MessageCircle,
    label: "消息",
  },
  {
    id: "contacts",
    icon: Users,
    label: "通讯录",
  },
] as const satisfies NavItem[];

const MOCK_NAV_BOTTOM_ITEMS = [
  {
    id: "4",
    icon: Settings,
    label: "设置",
  },
  {
    id: "5",
    icon: LogOut,
    label: "退出",
  },
] as const satisfies NavItem[];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    lastMessage: "Hello, how are you?",
    lastMessageTime: "2021-01-01",
    unread: true,
    online: true,
  },
  {
    id: "2",
    avatar: "https://via.placeholder.com/150",
    name: "Jane Smith",
    lastMessage: "I'm good, thank you!",
    lastMessageTime: "2021-01-02",
    unread: false,
    online: false,
  },
] as const;

// 工作台内容
const WorkbenchContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">工作台</h2>
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-medium mb-2">应用 {i}</h3>
          <p className="text-sm text-gray-500">应用描述内容</p>
        </div>
      ))}
    </div>
  </div>
);

// 通讯录内容
const ContactsContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">通讯录</h2>
    <div className="space-y-4">
      {["A", "B", "C", "D"].map((letter) => (
        <div key={letter}>
          <h3 className="text-sm font-medium text-gray-500 mb-2">{letter}</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium">
                    联系人 {letter}
                    {i}
                  </p>
                  <p className="text-sm text-gray-500">部门名称</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DtlBasicDemo = () => {
  const [activeId, setActiveId] = useState("workbench");
  const {
    activeFilter,
    setActiveFilter,
    setActiveConversation,
    getFilteredConversations,
    getActiveConversation,
  } = useConversationState([...MOCK_CONVERSATIONS]);

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation.id);
  };

  const pageConfig = {
    workbench: {
      title: "工作台",
      searchPlaceholder: "搜索应用",
      actions: [
        { icon: Bell, title: "通知" },
        { icon: Plus, title: "添加应用" },
      ],
      content: <WorkbenchContent />,
    },
    message: {
      title: "消息",
      searchPlaceholder: "搜索消息",
      actions: [
        { icon: Bell, title: "通知" },
        { icon: Plus, title: "发起群聊" },
      ],
      content: (
        <>
          <Dtl.ConversationList
            conversations={getFilteredConversations()}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onConversationClick={handleConversationClick}
          />
          <Dtl.ConversationDetail
            conversation={getActiveConversation()}
            messages={[]}
          />
        </>
      ),
    },
    contacts: {
      title: "通讯录",
      searchPlaceholder: "搜索联系人",
      actions: [{ icon: Plus, title: "添加联系人" }],
      content: <ContactsContent />,
    },
  };

  const switchRules: SwitchRule[] = Object.entries(pageConfig).map(
    ([id, config]) => ({
      matchCondition: id,
      getData: () => ({
        header: (
          <Dtl.Header
            title={config.title}
            left={
              <Dtl.Input
                icon={Search}
                placeholder={config.searchPlaceholder}
                className="w-64"
              />
            }
            actions={config.actions}
          />
        ),
        content: config.content,
      }),
    })
  );

  const { header, content } = useSwitch(activeId, switchRules);

  return (
    <Dtl.Layout
      nav={
        <Dtl.Nav
          items={MOCK_NAV_ITEMS}
          bottomItems={MOCK_NAV_BOTTOM_ITEMS}
          activeId={activeId}
          onItemClick={setActiveId}
        />
      }
      header={header}
    >
      {content}
    </Dtl.Layout>
  );
};

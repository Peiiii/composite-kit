# Activity Bar 组件

Activity Bar 是一个高度可定制的侧边栏组件，类似于 VS Code 的侧边栏，提供了可折叠、可切换的导航功能。支持两种使用模式：基础组件模式和复合组件模式。

## 特性

- 🎯 可折叠/展开的侧边栏
- 🎨 支持左右两侧布局
- 🔄 可控制的展开状态
- 🎮 支持键盘导航
- 🎭 支持自定义图标和标签
- 📱 响应式设计
- 🎪 支持徽章（Badge）显示
- 🎯 支持禁用状态
- 🎨 完全可定制的样式
- 🎯 支持复合组件模式
- 🎭 支持分组和分隔
- 🎪 支持搜索功能
- 🎛️ 支持受控和不受控两种模式
- 🏷️ 收起时显示标签文本（新功能）
- ✂️ 自动处理文本超出长度
- 🎨 自适应布局和平滑过渡动画

## 组件结构

```
activity-bar/
├── activity-bar-component.tsx    # 主组件
├── activity-bar-context.tsx      # 上下文管理
├── activity-bar-namespace.tsx    # 命名空间定义
├── activity-bar-toggle-button.tsx # 切换按钮
├── activity-group.tsx           # 分组组件
├── activity-group-list.tsx      # 分组列表
├── activity-header-optimized.tsx # 优化的头部组件
├── activity-item.tsx            # 活动项组件
├── configurable-activity-bar.tsx # 可配置的活动栏
└── index.tsx                    # 导出文件
```

## 使用方法

### 受控模式 (Controlled)

在受控模式下，组件的状态完全由父组件控制：

```tsx
import { ActivityBar } from "@/components/activity-bar"
import { Home, Settings, Users } from "lucide-react"

export function ControlledActivityBar() {
  const [expanded, setExpanded] = React.useState(false)
  const [activeId, setActiveId] = React.useState("home")

  return (
    <ActivityBar.Root
      expanded={expanded}
      activeId={activeId}
      onExpandedChange={setExpanded}
      onActiveChange={setActiveId}
    >
      <ActivityBar.Header icon={<Home />} title="受控模式" />
      <ActivityBar.GroupList>
        <ActivityBar.Group title="导航">
          <ActivityBar.Item id="home" icon={<Home />} label="首页" />
          <ActivityBar.Item id="users" icon={<Users />} label="用户" />
          <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
        </ActivityBar.Group>
      </ActivityBar.GroupList>
    </ActivityBar.Root>
  )
}
```

### 不受控模式 (Uncontrolled)

在不受控模式下，组件内部管理状态，通过回调函数获取状态变化：

```tsx
import { ActivityBar } from "@/components/activity-bar"
import { Home, Settings, Users } from "lucide-react"

export function UncontrolledActivityBar() {
  const [expanded, setExpanded] = React.useState(false)
  const [activeId, setActiveId] = React.useState("home")

  return (
    <ActivityBar.Root
      defaultExpanded={false}
      defaultActiveId="home"
      onExpandedChange={setExpanded}
      onActiveChange={setActiveId}
    >
      <ActivityBar.Header icon={<Home />} title="不受控模式" />
      <ActivityBar.GroupList>
        <ActivityBar.Group title="导航">
          <ActivityBar.Item id="home" icon={<Home />} label="首页" />
          <ActivityBar.Item id="users" icon={<Users />} label="用户" />
          <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
        </ActivityBar.Group>
      </ActivityBar.GroupList>
    </ActivityBar.Root>
  )
}
```

### 收起标签功能

新增的 `collapsedLabel` 功能允许在收起状态下显示简短的标签文本：

```tsx
import { ActivityBar } from "@/components/activity-bar"
import { Home, Search, FileText, Settings } from "lucide-react"

export function ActivityBarWithCollapsedLabels() {
  return (
    <ActivityBar.Root defaultExpanded={false}>
      <ActivityBar.Header icon={<Home />} title="应用导航" />
      <ActivityBar.GroupList>
        <ActivityBar.Group title="主要功能">
          {/* 有收起标签 - 收起时显示"首页" */}
          <ActivityBar.Item 
            id="home" 
            icon={<Home />} 
            label="首页" 
            collapsedLabel="首页" 
          />
          
          {/* 有收起标签 - 收起时显示"搜索" */}
          <ActivityBar.Item 
            id="search" 
            icon={<Search />} 
            label="搜索功能" 
            collapsedLabel="搜索" 
          />
          
          {/* 有收起标签 - 收起时显示"文件" */}
          <ActivityBar.Item 
            id="files" 
            icon={<FileText />} 
            label="文件管理" 
            collapsedLabel="文件" 
          />
          
          {/* 没有收起标签 - 收起时只显示图标 */}
          <ActivityBar.Item 
            id="settings" 
            icon={<Settings />} 
            label="系统设置" 
          />
        </ActivityBar.Group>
      </ActivityBar.GroupList>
    </ActivityBar.Root>
  )
}
```

**特性说明：**
- ✅ 如果不传 `collapsedLabel`，保持原有行为（只显示图标）
- ✅ 如果传了 `collapsedLabel`，收起时在图标下方显示文本
- ✅ 自动处理文本超出长度（使用 truncate）
- ✅ 平滑的布局过渡动画
- ✅ 完全向后兼容

### 复合组件模式（推荐）

复合组件模式提供了更直观和灵活的 API，推荐在新项目中使用：

```tsx
import { ActivityBar } from "@/components/activity-bar"
import {
  Home,
  Settings,
  Users,
  Mail,
  Calendar,
  LayoutDashboard,
  HelpCircle,
  Code,
  Database,
  Cloud,
  Server,
  Shield,
} from "lucide-react"

export function MyActivityBar() {
  const [expanded, setExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState("home")

  return (
    <ActivityBar.Root
      expanded={expanded}
      defaultActiveId={activeSection}
      onExpandedChange={setExpanded}
      onActiveChange={setActiveSection}
    >
      {/* 头部区域 */}
      <ActivityBar.Header
        icon={<LayoutDashboard />}
        title="工作空间"
        showSearch={true}
      />

      {/* 分组列表 */}
      <ActivityBar.GroupList>
        {/* 导航分组 */}
        <ActivityBar.Group title="导航">
          <ActivityBar.Item id="home" icon={<Home />} label="首页" />
          <ActivityBar.Item id="users" icon={<Users />} label="用户" />
          <ActivityBar.Item id="messages" icon={<Mail />} label="消息" badge={3} />
          <ActivityBar.Item id="calendar" icon={<Calendar />} label="日历" />
        </ActivityBar.Group>

        {/* 开发分组 */}
        <ActivityBar.Group title="开发">
          <ActivityBar.Item id="code" icon={<Code />} label="代码" />
          <ActivityBar.Item id="database" icon={<Database />} label="数据库" />
          <ActivityBar.Item id="cloud" icon={<Cloud />} label="云服务" />
          <ActivityBar.Item id="server" icon={<Server />} label="服务器" disabled />
        </ActivityBar.Group>
      </ActivityBar.GroupList>

      {/* 底部区域 */}
      <ActivityBar.Footer>
        <ActivityBar.Separator />
        <ActivityBar.Group>
          <ActivityBar.Item id="settings" icon={<Settings />} label="设置" />
          <ActivityBar.Item id="security" icon={<Shield />} label="安全" />
          <ActivityBar.Item id="help" icon={<HelpCircle />} label="帮助" />
        </ActivityBar.Group>
      </ActivityBar.Footer>
    </ActivityBar.Root>
  )
}
```

### 基础组件模式

基础组件模式提供了更简单的 API，适合快速实现：

```tsx
import { ActivityBarComponent, ActivityItem } from "@/components/activity-bar"
import { Home, Settings, User } from "lucide-react"

export function BasicActivityBar() {
  return (
    <ActivityBarComponent>
      <ActivityItem
        id="home"
        icon={<Home />}
        label="首页"
      />
      <ActivityItem
        id="settings"
        icon={<Settings />}
        label="设置"
      />
      <ActivityItem
        id="profile"
        icon={<User />}
        label="个人中心"
        badge="New"
      />
    </ActivityBarComponent>
  )
}
```

## 组件 API

### 复合组件模式

#### ActivityBar.Root

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| position | "left" \| "right" | "left" | 侧边栏位置 |
| expanded | boolean | - | 受控的展开状态 |
| defaultExpanded | boolean | false | 默认展开状态（不受控模式） |
| activeId | string | - | 受控的激活项 |
| defaultActiveId | string | - | 默认激活项（不受控模式） |
| toggleable | boolean | true | 是否可切换 |
| onExpandedChange | (expanded: boolean) => void | - | 展开状态改变回调 |
| onActiveChange | (activeId: string) => void | - | 激活项改变回调 |

**受控模式说明：**
- 当提供 `expanded` 属性时，展开状态由父组件控制
- 当提供 `activeId` 属性时，激活项由父组件控制
- 当不提供这些属性时，组件使用内部状态管理（不受控模式）

#### ActivityBar.Header

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| icon | React.ReactNode | - | 头部图标 |
| title | string | - | 标题文本 |
| showSearch | boolean | false | 是否显示搜索框 |

#### ActivityBar.Group

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | string | - | 分组标题 |

#### ActivityBar.Item

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| id | string | - | 唯一标识符 |
| icon | React.ReactNode | - | 图标 |
| label | string | - | 标签文本 |
| badge | React.ReactNode | - | 徽章内容 |
| disabled | boolean | false | 是否禁用 |
| onClick | () => void | - | 点击回调 |
| collapsedLabel | string | - | 收起时显示的标签文本（可选） |

### 基础组件模式

基础组件模式的 API 与复合组件模式相同，只是使用方式不同。

## 受控 vs 不受控模式

### 受控模式 (Controlled)
- **优点**：状态完全可控，便于集成到复杂的状态管理系统中
- **适用场景**：需要与其他组件状态同步，或需要根据外部条件控制组件状态
- **使用方式**：提供 `expanded` 和 `activeId` 属性

### 不受控模式 (Uncontrolled)
- **优点**：使用简单，组件内部管理状态
- **适用场景**：独立的组件，不需要与外部状态同步
- **使用方式**：提供 `defaultExpanded` 和 `defaultActiveId` 属性

## 主题定制

组件使用 Tailwind CSS 进行样式管理，可以通过以下方式自定义主题：

1. 修改 `activityBarVariants` 中的样式定义
2. 使用 `cn()` 工具函数组合自定义类名
3. 通过 CSS 变量覆盖默认主题

## 最佳实践

1. 优先使用复合组件模式，提供更好的开发体验
2. 根据应用需求选择合适的受控/不受控模式
3. 使用 `ActivityBar.Group` 对相关项目进行分组
4. 合理使用徽章显示重要信息
5. 保持导航项数量适中，避免过度拥挤
6. 为重要操作提供键盘快捷键
7. 使用有意义的图标和标签
8. 在头部区域添加搜索功能，提升用户体验

## 注意事项

1. 确保每个 `ActivityBar.Item` 都有唯一的 `id`
2. 图标组件需要支持 `className` 属性
3. 在移动端使用时注意响应式布局
4. 考虑使用 `ActivityBarContext` 进行状态管理
5. 合理使用分组和分隔线，提高导航的清晰度
6. 在受控模式下，确保正确传递状态和回调函数

## 相关组件

- `ActivityBar.Group`: 用于对导航项进行分组
- `ActivityBar.GroupList`: 分组列表容器
- `ActivityBar.Header`: 头部区域组件
- `ActivityBar.Footer`: 底部区域组件
- `ActivityBar.Separator`: 分隔线组件
- `ActivityBar.ToggleButton`: 控制侧边栏展开/折叠
- `ConfigurableActivityBar`: 提供更多配置选项的活动栏 
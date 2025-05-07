# 主题系统

本文档介绍了组件库的主题系统，包括如何创建和使用自定义主题。

## 主题系统架构

主题系统由以下几个核心部分组成：

1. `ThemeProvider`: 主题提供者组件，负责主题的切换和状态管理
2. `ThemeSwitcher`: 主题切换器组件，提供用户界面进行主题切换
3. `ThemeRegistry`: 主题注册表，管理所有可用的主题
4. 主题文件：定义具体主题的样式变量

## 如何添加新主题

### 1. 创建主题文件

在 `src/styles/themes` 目录下创建新的主题文件，例如 `my-theme.css`：

```css
/* my-theme.css */
:root[class~="my-theme"] {
  /* 基础颜色 */
  --background: #ffffff;
  --foreground: #000000;
  
  /* 主色调 */
  --primary: #0070f3;
  --primary-foreground: #ffffff;
  
  /* 次要色调 */
  --secondary: #f5f5f5;
  --secondary-foreground: #000000;
  
  /* 强调色 */
  --accent: #7928ca;
  --accent-foreground: #ffffff;
  
  /* 中性色 */
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  
  /* 功能色 */
  --success: #0070f3;
  --success-foreground: #ffffff;
  --warning: #f5a623;
  --warning-foreground: #000000;
  --error: #ff0000;
  --error-foreground: #ffffff;
  
  /* 边框和阴影 */
  --border: #e5e5e5;
  --ring: #0070f3;
  
  /* 其他自定义变量 */
  --radius: 0.5rem;
}
```

### 2. 注册主题

在 `src/styles/themes/registry.ts` 中注册新主题：

```typescript
import { ThemeRegistry } from './registry'

// 注册新主题
ThemeRegistry.register({
  id: 'my-theme',
  name: '我的主题',
  description: '一个自定义主题示例',
  author: 'Your Name',
  version: '1.0.0',
  // 可选：主题预览图
  preview: '/themes/my-theme-preview.png'
})
```

### 3. 导入主题文件

在 `src/styles/themes/index.ts` 中导入新主题：

```typescript
import './my-theme.css'
```

### 4. 使用主题

在应用中使用新主题：

```tsx
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="my-theme">
      {/* 你的应用内容 */}
    </ThemeProvider>
  )
}
```

## 主题变量规范

为了保持主题的一致性，建议遵循以下变量命名规范：

1. 基础颜色：
   - `--background`: 背景色
   - `--foreground`: 前景色（文本颜色）

2. 主色调：
   - `--primary`: 主色
   - `--primary-foreground`: 主色上的文本颜色

3. 次要色调：
   - `--secondary`: 次要色
   - `--secondary-foreground`: 次要色上的文本颜色

4. 强调色：
   - `--accent`: 强调色
   - `--accent-foreground`: 强调色上的文本颜色

5. 中性色：
   - `--muted`: 中性色
   - `--muted-foreground`: 中性色上的文本颜色

6. 功能色：
   - `--success`: 成功色
   - `--success-foreground`: 成功色上的文本颜色
   - `--warning`: 警告色
   - `--warning-foreground`: 警告色上的文本颜色
   - `--error`: 错误色
   - `--error-foreground`: 错误色上的文本颜色

7. 边框和阴影：
   - `--border`: 边框颜色
   - `--ring`: 焦点环颜色

## 最佳实践

1. 颜色选择：
   - 确保颜色对比度符合 WCAG 2.0 标准
   - 使用语义化的颜色命名
   - 考虑深色模式适配

2. 变量组织：
   - 按功能分组变量
   - 使用清晰的命名约定
   - 添加必要的注释

3. 主题测试：
   - 测试所有组件的主题适配
   - 验证颜色对比度
   - 检查深色模式效果

4. 文档维护：
   - 记录主题的设计理念
   - 提供使用示例
   - 说明主题的适用场景

## 示例

查看 `src/demos/theme-switcher` 目录下的示例，了解如何：
- 创建主题切换器
- 预览主题效果
- 实现主题切换功能 
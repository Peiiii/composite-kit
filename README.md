# Composite Kit

一个专注于组合和可配置模式的 React 组件库。

## 特性

- 🎯 基于组合模式设计
- ⚡️ 高度可配置
- 🎨 支持主题定制
- 📦 零运行时依赖
- 🚀 基于 Vite 构建
- 📝 完整的 TypeScript 支持

## 安装

```bash
npm install composite-kit
# 或
yarn add composite-kit
# 或
pnpm add composite-kit
```

## 使用

```tsx
import { ConfigurableActivityBar } from 'composite-kit'

function App() {
  const config = {
    header: {
      icon: <HomeIcon />,
      title: "主页"
    },
    groups: [
      {
        items: [
          {
            id: "home",
            icon: <HomeIcon />,
            label: "首页"
          }
        ]
      }
    ]
  }

  return <ConfigurableActivityBar config={config} />
}
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建库
npm run build:lib

# 构建文档网站
npm run build:site
```

## 许可证

MIT © [Composite Kit](LICENSE)

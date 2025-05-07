import * as React from "react";
import { ThemeProvider, ThemeSwitcher } from "composite-kit";
import { MainLayout } from "./layouts/MainLayout";
import { ExplorerPage } from "./pages/ExplorerPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <MainLayout>
        <div className="flex h-full">
          <div className="w-64">
            <ExplorerPage />
          </div>
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  组件库示例
                </h1>
                <ThemeSwitcher
                  themes={[
                    "light",
                    "dark",
                    "material",
                    "nord",
                    "dracula",
                    "one-dark",
                    "tokyo-night",
                    "catppuccin",
                    "wechat",
                    "telegram",
                    "github",
                    "twitter",
                    "discord",
                    "notion",
                    "monokai-pro",
                    "gruvbox",
                    "solarized",
                    "aurora",
                    "forest",
                    "ocean",
                    "starlight",
                    "desert",
                    "neon",
                    "ink-wash",
                    "sakura",
                    "moonlight",
                    "bamboo",
                    "landscape",
                    "autumn",
                  ]}
                />
              </div>
              <div className="prose max-w-none">
                <h2>欢迎使用组件库</h2>
                <p>
                  这是一个基于 React 和 Tailwind CSS 构建的现代化组件库示例应用。
                  您可以通过左侧的活动栏切换不同的功能，使用顶部的主题切换器更改应用主题。
                </p>
                <h3>主要功能</h3>
                <ul>
                  <li>可配置的活动栏</li>
                  <li>文件浏览器</li>
                  <li>主题切换</li>
                  <li>响应式布局</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;

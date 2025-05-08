"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavPreview } from "./nav-preview"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function MobileNavCompositeDemo() {
  return (
    <div className="container py-8 space-y-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">移动端导航组件</h1>
        <p className="text-muted-foreground">
          一个可组合的移动端导航组件，支持多种风格和自定义配置。基于复合组件模式，提供灵活的组合方式。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 max-w-xl w-full">
          <Card className="p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">组件特点</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 基于复合组件模式，提供灵活的组合方式</li>
              <li>• 支持多种预设风格（Instagram、Twitter、TikTok等）</li>
              <li>• 可自定义导航项、图标、样式和交互效果</li>
              <li>• 支持导航指示器、徽章等扩展功能</li>
              <li>• 响应式设计，适配各种移动设备</li>
            </ul>
          </Card>

          <Card className="p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">使用方式</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">基础用法</h3>
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre break-words overflow-x-auto">
                  {`<MobileNav.Root>
  <MobileNav.Item icon={<Home />} label="首页" />
  <MobileNav.Item icon={<Search />} label="搜索" />
  <MobileNav.Indicator />
</MobileNav.Root>`}
                </pre>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">自定义样式</h3>
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre break-words overflow-x-auto">
                  {`<MobileNav.Root className="bg-background/80 backdrop-blur">
  <MobileNav.Item 
    icon={<Home />} 
    label="首页"
    className="text-blue-500"
  />
  <MobileNav.Indicator className="bg-blue-500" />
</MobileNav.Root>`}
                </pre>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center min-w-[480px]">
          <Card className="p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">预览</h2>
            <Tabs defaultValue="instagram" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="instagram" className="flex-1">Instagram</TabsTrigger>
                <TabsTrigger value="twitter" className="flex-1">Twitter</TabsTrigger>
                <TabsTrigger value="tiktok" className="flex-1">TikTok</TabsTrigger>
                <TabsTrigger value="spotify" className="flex-1">Spotify</TabsTrigger>
                <TabsTrigger value="wechat" className="flex-1">微信</TabsTrigger>
              </TabsList>

              <TabsContent value="instagram" className="mt-0">
                <div className="mt-4">
                  <NavPreview variant="instagram" showScaleControl />
                </div>
              </TabsContent>

              <TabsContent value="twitter" className="mt-0">
                <div className="mt-4">
                  <NavPreview variant="twitter" showScaleControl />
                </div>
              </TabsContent>

              <TabsContent value="tiktok" className="mt-0">
                <div className="mt-4">
                  <NavPreview variant="tiktok" showScaleControl />
                </div>
              </TabsContent>

              <TabsContent value="spotify" className="mt-0">
                <div className="mt-4">
                  <NavPreview variant="spotify" showScaleControl />
                </div>
              </TabsContent>

              <TabsContent value="wechat" className="mt-0">
                <div className="mt-4">
                  <NavPreview variant="wechat" showScaleControl />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

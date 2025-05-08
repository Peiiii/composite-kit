"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavPreview } from "./nav-preview"

export default function MobileNavCompositeDemo() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">移动端导航组件</h1>
        <p className="text-muted-foreground">
          一个可组合的移动端导航组件，支持多种风格和自定义配置
        </p>
      </div>

      <Tabs defaultValue="instagram" className="space-y-4">
        <TabsList>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="spotify">Spotify</TabsTrigger>
          <TabsTrigger value="wechat">微信</TabsTrigger>
        </TabsList>

        <TabsContent value="instagram" className="mt-0">
          <NavPreview variant="instagram" />
        </TabsContent>

        <TabsContent value="twitter" className="mt-0">
          <NavPreview variant="twitter" />
        </TabsContent>

        <TabsContent value="tiktok" className="mt-0">
          <NavPreview variant="tiktok" />
        </TabsContent>

        <TabsContent value="spotify" className="mt-0">
          <NavPreview variant="spotify" />
        </TabsContent>

        <TabsContent value="wechat" className="mt-0">
          <NavPreview variant="wechat" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

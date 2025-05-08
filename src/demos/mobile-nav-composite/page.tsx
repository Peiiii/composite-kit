"use client"

import { MobileDeviceContainer } from "@/components/mobile-device-container"
import { InstagramNav, defaultInstagramNavConfig } from "@/components/mobile-nav/instagram/instagram-nav"
import { SpotifyNav, defaultSpotifyNavConfig } from "@/components/mobile-nav/spotify/spotify-nav"
import { TwitterNav, defaultTwitterNavConfig } from "@/components/mobile-nav/twitter/twitter-nav"
import { WeChatNav, defaultWeChatNavConfig } from "@/components/mobile-nav/wechat/wechat-nav"
import { TikTokNav, defaultTikTokNavConfig } from "@/components/mobile-nav/tiktok/tiktok-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Plus, Search } from "lucide-react"
import * as React from "react"

// 导航配置
const navConfigs = {
  instagram: {
    ...defaultInstagramNavConfig,
    activeId: "home",
    onActiveChange: (id: string) => console.log("Instagram 导航切换:", id)
  },
  spotify: {
    ...defaultSpotifyNavConfig,
    activeId: "home",
    onActiveChange: (id: string) => console.log("Spotify 导航切换:", id),
    nowPlaying: {
      title: "正在播放的歌曲",
      artist: "艺术家名称",
      cover: "https://picsum.photos/200",
      onPlay: () => console.log("播放"),
      onAdd: () => console.log("添加到播放列表")
    }
  },
  twitter: {
    ...defaultTwitterNavConfig,
    activeId: "home",
    onActiveChange: (id: string) => console.log("Twitter 导航切换:", id)
  },
  wechat: {
    ...defaultWeChatNavConfig,
    activeId: "chat",
    onActiveChange: (id: string) => console.log("WeChat 导航切换:", id)
  },
  tiktok: {
    ...defaultTikTokNavConfig,
    defaultActiveId: "home",
    onActiveChange: (id: string) => console.log("TikTok 导航切换:", id)
  }
}

export default function MobileNavComposite() {
  const [activeTab, setActiveTab] = React.useState("instagram")

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">顶级应用导航风格</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="spotify">Spotify</TabsTrigger>
          <TabsTrigger value="wechat">WeChat</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {/* Instagram 风格 */}
          <TabsContent value="instagram" className="h-full">
            <MobileDeviceContainer device="iphone14" showScaleControl>
              <div className="flex flex-col h-full">
                {/* 顶部标题栏 */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h2 className="text-xl font-bold">Instagram</h2>
                  <div className="flex gap-4">
                    <Heart className="w-6 h-6" />
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>
                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <p>内容区域</p>
                  </div>
                </div>
                {/* 底部导航 */}
                <InstagramNav config={navConfigs.instagram} />
              </div>
            </MobileDeviceContainer>
          </TabsContent>

          {/* Twitter 风格 */}
          <TabsContent value="twitter" className="h-full">
            <MobileDeviceContainer device="iphone14Pro" showScaleControl>
              <div className="flex flex-col h-full">
                {/* 顶部标题栏 */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h2 className="text-xl font-bold">Twitter</h2>
                  <Search className="w-6 h-6" />
                </div>
                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <p>内容区域</p>
                  </div>
                </div>
                {/* 浮动操作按钮 */}
                <div className="absolute bottom-20 right-4">
                  <button className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                </div>
                {/* 底部导航 */}
                <TwitterNav config={navConfigs.twitter} />
              </div>
            </MobileDeviceContainer>
          </TabsContent>

          {/* TikTok 风格 */}
          <TabsContent value="tiktok" className="h-full">
            <MobileDeviceContainer device="pixel7" showScaleControl>
              <div className="flex flex-col h-full">
                {/* 顶部标题栏 */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h2 className="text-xl font-bold">TikTok</h2>
                  <Search className="w-6 h-6" />
                </div>
                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <p>内容区域</p>
                  </div>
                </div>
                {/* 底部导航 */}
                <TikTokNav config={navConfigs.tiktok} />
              </div>
            </MobileDeviceContainer>
          </TabsContent>

          <TabsContent value="spotify" className="mt-0">
            <MobileDeviceContainer device="iphone14">
              <div className="flex flex-col h-full">
                <div className="flex-1 p-4">
                  <h2 className="text-2xl font-bold mb-4">Spotify 风格导航</h2>
                  <p className="text-muted-foreground">
                    带有迷你播放器的音乐应用导航
                  </p>
                </div>
                <SpotifyNav config={navConfigs.spotify} />
              </div>
            </MobileDeviceContainer>
          </TabsContent>

          <TabsContent value="wechat" className="h-full">
            <MobileDeviceContainer device="iphoneSE" showScaleControl>
              <div className="flex flex-col h-full">
                {/* 顶部标题栏 */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h2 className="text-xl font-bold">微信</h2>
                  <Search className="w-6 h-6" />
                </div>
                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <p>内容区域</p>
                  </div>
                </div>
                {/* 底部导航 */}
                <WeChatNav config={navConfigs.wechat} />
              </div>
            </MobileDeviceContainer>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

"use client"

import { MobileDevicePreview } from "@/components/mobile-device-preview"
import { MobileNav } from "@/components/mobile-nav/mobile-nav"
import { cn } from "@/lib/utils"
import { Bell, Bookmark, Compass, Heart, Home, Mail, MessageSquare, Music, Plus, Search, User, Users } from "lucide-react"
import * as React from "react"

interface NavPreviewProps {
  variant: "instagram" | "twitter" | "tiktok" | "spotify" | "wechat"
  device?: "iphone14" | "iphone14Pro" | "pixel7" | "iphoneSE"
  showScaleControl?: boolean
}

export function NavPreview({ variant, device = "iphone14", showScaleControl }: NavPreviewProps) {
  const navConfig = React.useMemo(() => {
    switch (variant) {
      case "instagram":
        return {
          items: [
            { id: "home", icon: <Home />, label: "首页" },
            { id: "search", icon: <Search />, label: "搜索" },
            { id: "create", icon: <Plus />, label: "创建", className: "scale-110" },
            { id: "activity", icon: <Heart />, label: "活动" },
            { id: "profile", icon: <User />, label: "我的" }
          ],
          defaultActiveId: "home",
          className: "bg-background",
          itemClassName: "",
          indicatorClassName: ""
        }
      case "twitter":
        return {
          items: [
            { id: "home", icon: <Home />, label: "首页" },
            { id: "search", icon: <Search />, label: "探索" },
            { id: "notifications", icon: <Bell />, label: "通知" },
            { id: "messages", icon: <Mail />, label: "消息" }
          ],
          defaultActiveId: "home",
          className: "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          itemClassName: "text-muted-foreground hover:text-blue-500 active:text-blue-500",
          indicatorClassName: "w-6 h-0.5 bg-blue-500"
        }
      case "tiktok":
        return {
          items: [
            { id: "home", icon: <Home />, label: "首页" },
            { id: "discover", icon: <Search />, label: "发现" },
            { id: "create", icon: <Plus />, label: "创建", className: "scale-125" },
            { id: "inbox", icon: <MessageSquare />, label: "收件箱" },
            { id: "profile", icon: <User />, label: "我的" }
          ],
          defaultActiveId: "home",
          className: "bg-gradient-to-t from-black/90 to-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-t border-white/10",
          itemClassName: "text-white/60 hover:text-white active:text-white",
          indicatorClassName: "bg-white/80"
        }
      case "spotify":
        return {
          items: [
            { id: "home", icon: <Home />, label: "首页" },
            { id: "search", icon: <Search />, label: "搜索" },
            { id: "library", icon: <Bookmark />, label: "音乐库" }
          ],
          defaultActiveId: "home",
          className: "bg-background",
          itemClassName: "text-muted-foreground hover:text-foreground active:text-foreground",
          indicatorClassName: "-bottom-1"
        }
      case "wechat":
        return {
          items: [
            { id: "chat", icon: <MessageSquare />, label: "微信" },
            { id: "contacts", icon: <Users />, label: "通讯录" },
            { id: "discover", icon: <Compass />, label: "发现" },
            { id: "me", icon: <User />, label: "我" }
          ],
          defaultActiveId: "chat",
          className: "bg-background",
          itemClassName: "text-muted-foreground hover:text-[#07C160]/60 active:text-[#07C160]",
          indicatorClassName: ""
        }
    }
  }, [variant])

  const renderHeader = () => {
    switch (variant) {
      case "instagram":
        return (
          <>
            <h2 className="text-xl font-bold">Instagram</h2>
            <div className="flex gap-4">
              <Heart className="w-6 h-6" />
              <MessageSquare className="w-6 h-6" />
            </div>
          </>
        )
      case "twitter":
        return (
          <>
            <h2 className="text-xl font-bold">Twitter</h2>
            <Search className="w-6 h-6" />
          </>
        )
      case "tiktok":
        return (
          <>
            <h2 className="text-xl font-bold">TikTok</h2>
            <Search className="w-6 h-6" />
          </>
        )
      case "spotify":
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Spotify 风格导航</h2>
            <p className="text-muted-foreground">
              带有迷你播放器的音乐应用导航
            </p>
          </>
        )
      case "wechat":
        return (
          <>
            <h2 className="text-xl font-bold">微信</h2>
            <Search className="w-6 h-6" />
          </>
        )
    }
  }

  const renderContent = () => {
    if (variant === "spotify") {
      return (
        <div className="flex-1 p-4">
          {renderHeader()}
        </div>
      )
    }

    return (
      <>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          {renderHeader()}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {variant === "instagram" && (
              <>
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded overflow-hidden">
                      <img
                        src={`https://picsum.photos/400/400?random=${i}`}
                        alt={`Post ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {variant === "twitter" && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                      <img
                        src={`https://picsum.photos/100/100?random=${i}`}
                        alt={`Avatar ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">用户名</span>
                        <span className="text-muted-foreground">@username</span>
                      </div>
                      <p className="text-sm mb-2">这是一条示例推文内容，展示了基本的推文布局和样式。</p>
                      <div className="flex gap-4 text-muted-foreground text-sm">
                        <button className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>12</span>
                        </button>
                        <button className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>34</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {variant === "tiktok" && (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
                    <img
                      src={`https://picsum.photos/400/700?random=${i}`}
                      alt={`Video ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                          <img
                            src={`https://picsum.photos/100/100?random=${i + 10}`}
                            alt={`Creator ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">创作者</span>
                      </div>
                      <p className="text-sm mb-2">这是一个有趣的短视频内容 #抖音 #短视频</p>
                      <div className="flex gap-4">
                        <button className="flex flex-col items-center">
                          <Heart className="w-6 h-6" />
                          <span className="text-xs">1.2w</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-xs">234</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {variant === "wechat" && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                      <img
                        src={`https://picsum.photos/100/100?random=${i + 20}`}
                        alt={`Chat ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">聊天名称</span>
                        <span className="text-xs text-muted-foreground">12:34</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        这是一条最新的聊天消息内容
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  const renderNav = () => {
    if (variant === "spotify") {
      return (
        <div className="fixed bottom-0 left-0 right-0">
          {/* 迷你播放器 */}
          <div className="px-4 py-2 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                <img
                  src="https://picsum.photos/200"
                  alt="正在播放的歌曲"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">正在播放的歌曲</p>
                <p className="text-xs text-muted-foreground truncate">
                  艺术家名称
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => console.log("播放")}>
                  <Music className="w-6 h-6" />
                </button>
                <button onClick={() => console.log("添加到播放列表")}>
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          {/* 导航栏 */}
          <MobileNav.Root
            defaultActiveId={navConfig.defaultActiveId}
            onActiveChange={(id) => console.log(`${variant} 导航切换:`, id)}
            className={navConfig.className}
          >
            {navConfig.items.map((item) => (
              <MobileNav.Item
                key={item.id}
                {...item}
                className={cn(navConfig.itemClassName, item.className)}
              />
            ))}
            <MobileNav.Indicator className={navConfig.indicatorClassName} />
          </MobileNav.Root>
        </div>
      )
    }

    return (
      <MobileNav.Root
        defaultActiveId={navConfig.defaultActiveId}
        onActiveChange={(id) => console.log(`${variant} 导航切换:`, id)}
        className={navConfig.className}
      >
        {navConfig.items.map((item) => (
          <MobileNav.Item
            key={item.id}
            {...item}
            className={cn(navConfig.itemClassName, item.className)}
          />
        ))}
        {navConfig.indicatorClassName && (
          <MobileNav.Indicator className={navConfig.indicatorClassName} />
        )}
      </MobileNav.Root>
    )
  }

  return (
    <MobileDevicePreview device={device} showScaleControl={showScaleControl}>
      <div className="flex flex-col h-full">
        {renderContent()}
        {renderNav()}
      </div>
    </MobileDevicePreview>
  )
} 
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SpotifyNavItem } from "./spotify-nav-item"
import { Home, Search, Bookmark, Music, Plus } from "lucide-react"

export interface SpotifyNavItemConfig {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export interface NowPlayingConfig {
  title: string
  artist: string
  cover?: string
  onPlay?: () => void
  onAdd?: () => void
}

export interface SpotifyNavConfig {
  items: SpotifyNavItemConfig[]
  activeId?: string
  onActiveChange?: (id: string) => void
  nowPlaying?: NowPlayingConfig
  className?: string
}

export interface SpotifyNavProps extends React.HTMLAttributes<HTMLDivElement> {
  config: SpotifyNavConfig
}

export function SpotifyNav({
  config,
  ...props
}: SpotifyNavProps) {
  const {
    items,
    activeId,
    onActiveChange,
    nowPlaying,
    className
  } = config

  const [active, setActive] = React.useState(activeId || "home")

  const handleActiveChange = React.useCallback(
    (id: string) => {
      setActive(id)
      onActiveChange?.(id)
    },
    [onActiveChange]
  )

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {/* 迷你播放器 */}
      {nowPlaying && (
        <div className="px-4 py-2 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded overflow-hidden">
              {nowPlaying.cover && (
                <img
                  src={nowPlaying.cover}
                  alt={nowPlaying.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{nowPlaying.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {nowPlaying.artist}
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={nowPlaying.onPlay}>
                <Music className="w-6 h-6" />
              </button>
              <button onClick={nowPlaying.onAdd}>
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 导航栏 */}
      <div
        className={cn(
          "bg-background border-t",
          className
        )}
        {...props}
      >
        <div className="flex justify-around items-center h-16 px-2">
          {items.map((item) => (
            <SpotifyNavItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              active={active === item.id}
              onClick={() => {
                handleActiveChange(item.id)
                item.onClick?.()
              }}
              className={item.className}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 默认配置
export const defaultSpotifyNavConfig: SpotifyNavConfig = {
  items: [
    {
      id: "home",
      icon: <Home />,
      label: "首页"
    },
    {
      id: "search",
      icon: <Search />,
      label: "搜索"
    },
    {
      id: "library",
      icon: <Bookmark />,
      label: "音乐库"
    }
  ]
} 
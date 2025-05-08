import { ReactNode } from "react"

export interface NavItem {
  id: string
  icon: ReactNode
  label: string
  className?: string
}

export interface NavConfig {
  items: NavItem[]
  defaultActiveId: string
  className: string
  itemClassName: string
  indicatorClassName: string
}

export type NavVariant = "instagram" | "twitter" | "tiktok" | "spotify" | "wechat"
export type DeviceType = "iphone14" | "iphone14Pro" | "pixel7" | "iphoneSE" 
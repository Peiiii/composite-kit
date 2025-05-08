"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Slider } from "@/components/ui/slider"

// 预设的设备尺寸
const devicePresets = {
  iphone14: {
    width: 390,
    height: 844,
    name: "iPhone 14",
  },
  iphone14Pro: {
    width: 393,
    height: 852,
    name: "iPhone 14 Pro",
  },
  iphoneSE: {
    width: 375,
    height: 667,
    name: "iPhone SE",
  },
  pixel7: {
    width: 412,
    height: 915,
    name: "Pixel 7",
  },
  samsungS22: {
    width: 360,
    height: 800,
    name: "Samsung S22",
  },
} as const

// 样式定义
export const mobileDeviceContainerVariants = cva(
  "relative bg-background rounded-[3rem] shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      device: {
        iphone14: "border-[14px] border-black",
        iphone14Pro: "border-[14px] border-black",
        iphoneSE: "border-[12px] border-black",
        pixel7: "border-[12px] border-black rounded-[2rem]",
        samsungS22: "border-[12px] border-black rounded-[2rem]",
      },
      orientation: {
        portrait: "",
        landscape: "rotate-90",
      },
    },
    defaultVariants: {
      device: "iphone14",
      orientation: "portrait",
    },
  },
)

export interface MobileDevicePreviewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileDeviceContainerVariants> {
  device?: keyof typeof devicePresets
  orientation?: "portrait" | "landscape"
  showDeviceFrame?: boolean
  showDimensions?: boolean
  showScaleControl?: boolean
  defaultScale?: number
  minScale?: number
  maxScale?: number
  onScaleChange?: (scale: number) => void
}

export function MobileDevicePreview({
  className,
  device = "iphone14",
  orientation = "portrait",
  showDeviceFrame = true,
  showDimensions = true,
  showScaleControl = true,
  defaultScale = 1,
  minScale = 0.5,
  maxScale = 1.5,
  onScaleChange,
  children,
  ...props
}: MobileDevicePreviewProps) {
  const [scale, setScale] = React.useState(defaultScale)
  const deviceInfo = devicePresets[device]
  const isLandscape = orientation === "landscape"
  const width = isLandscape ? deviceInfo.height : deviceInfo.width
  const height = isLandscape ? deviceInfo.width : deviceInfo.height

  const handleScaleChange = React.useCallback((value: number[]) => {
    const newScale = value[0]
    setScale(newScale)
    onScaleChange?.(newScale)
  }, [onScaleChange])

  return (
    <div className="flex flex-col items-center justify-start p-8 h-full overflow-y-auto">
      <div className="sticky top-8 flex flex-col items-center">
        <div
          className={cn(
            mobileDeviceContainerVariants({ device, orientation }),
            showDeviceFrame ? "" : "border-0 rounded-none",
            className
          )}
          style={{
            width: width,
            height: height,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          {...props}
        >
          {/* 设备内容区域 */}
          <div className="relative w-full h-full overflow-hidden">
            {children}
          </div>

          {/* 设备信息显示 */}
          {showDimensions && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {deviceInfo.name} ({width} × {height})
            </div>
          )}

          {/* 设备特征元素 */}
          {showDeviceFrame && device === "iphone14" && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[1rem]" />
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[80px] h-[6px] bg-black/80 rounded-full" />
            </>
          )}
        </div>

        {/* 缩放控制 */}
        {showScaleControl && (
          <div className="mt-4 w-full max-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">缩放</span>
              <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
            </div>
            <Slider
              value={[scale]}
              min={minScale}
              max={maxScale}
              step={0.1}
              onValueChange={handleScaleChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
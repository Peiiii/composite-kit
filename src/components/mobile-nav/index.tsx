"use client"

import { MobileNavComponent } from "./mobile-nav-component"
import { MobileNavItem } from "./mobile-nav-item"

const MobileNav = {
  Root: MobileNavComponent,
  Item: MobileNavItem,
}

export type { MobileNavConfig, MobileNavItemConfig } from "./mobile-nav-component"
export { MobileNavContext } from "./mobile-nav-context"
export type { MobileNavItemProps } from "./mobile-nav-item"
export { MobileNav }

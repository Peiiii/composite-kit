"use client"

import * as React from "react"
import { MobileNavComponent } from "./mobile-nav-component"
import { MobileNavItem } from "./mobile-nav-item"

const MobileNav = {
  Root: MobileNavComponent,
  Item: MobileNavItem,
}

export { MobileNav }
export type { MobileNavProps } from "./mobile-nav-component"
export type { MobileNavItemProps } from "./mobile-nav-item" 
"use client"

import * as React from "react"
import { ConfigurableActivityBar } from "@/components/activity-bar/configurable-activity-bar"
import { Search, FileText, Settings, User, Home, Mail, Phone, MessageCircle } from "lucide-react"

export default function ActivityBarConfigurablePage() {
  const [activeId, setActiveId] = React.useState<string>("home")
  const [expanded, setExpanded] = React.useState(false)
  const [toggleable, setToggleable] = React.useState(true)

  const config = {
    header: {
      icon: <Home className="h-6 w-6" />,
      title: "Activity Bar",
      showSearch: true,
    },
    groups: [
      {
        title: "Main",
        items: [
          {
            id: "home",
            icon: <Home className="h-5 w-5" />,
            label: "Home",
            onClick: (id: string) => console.log("Home clicked:", id),
            className: "border-l-4 border-blue-500", // 自定义样式
            activeClassName: "bg-blue-50 border-l-4 border-blue-600 shadow-md", // 激活状态样式
          },
          {
            id: "search",
            icon: <Search className="h-5 w-5" />,
            label: "Search",
            badge: "3",
            onClick: (id: string) => console.log("Search clicked:", id),
            className: "border-l-4 border-green-500", // 自定义样式
            activeClassName: "bg-green-50 border-l-4 border-green-600 shadow-md", // 激活状态样式
          },
          {
            id: "files",
            icon: <FileText className="h-5 w-5" />,
            label: "Files",
            onClick: (id: string) => console.log("Files clicked:", id),
            className: "border-l-4 border-purple-500", // 自定义样式
            activeClassName: "bg-purple-50 border-l-4 border-purple-600 shadow-md", // 激活状态样式
          },
        ],
      },
      {
        title: "Communication",
        items: [
          {
            id: "mail",
            icon: <Mail className="h-5 w-5" />,
            label: "Mail",
            badge: "12",
            onClick: (id: string) => console.log("Mail clicked:", id),
          },
          {
            id: "phone",
            icon: <Phone className="h-5 w-5" />,
            label: "Phone",
            onClick: (id: string) => console.log("Phone clicked:", id),
          },
          {
            id: "chat",
            icon: <MessageCircle className="h-5 w-5" />,
            label: "Chat",
            badge: "5",
            onClick: (id: string) => console.log("Chat clicked:", id),
          },
        ],
      },
    ],
    footer: {
      title: "Settings",
      items: [
        {
          id: "settings",
          icon: <Settings className="h-5 w-5" />,
          label: "Settings",
          onClick: (id: string) => console.log("Settings clicked:", id),
        },
        {
          id: "profile",
          icon: <User className="h-5 w-5" />,
          label: "Profile",
          onClick: (id: string) => console.log("Profile clicked:", id),
        },
      ],
    },
  }

  const handleActiveChange = (id: string) => {
    console.log("Active changed to:", id)
    setActiveId(id)
  }

  const handleExpandedChange = (expanded: boolean) => {
    console.log("Expanded changed to:", expanded)
    setExpanded(expanded)
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col w-full">
        <div className="flex-1 flex">
          {/* Configurable Activity Bar */}
          <ConfigurableActivityBar
            config={config}
            expanded={expanded}
            defaultActiveId={activeId}
            onExpandedChange={handleExpandedChange}
            onActiveChange={handleActiveChange}
            toggleable={toggleable}
          />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Activity Bar Configurable Demo</h1>
              <div className="space-y-2">
                <p><strong>Current Active ID:</strong> {activeId}</p>
                <p><strong>Expanded:</strong> {expanded ? "Yes" : "No"}</p>
                <p><strong>Toggleable:</strong> {toggleable ? "Yes" : "No"}</p>
              </div>
              
              {/* Toggle Controls */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Toggle Controls:</h2>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={toggleable}
                      onChange={(e) => setToggleable(e.target.checked)}
                      className="rounded"
                    />
                    <span>Enable Toggle Button</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={expanded}
                      onChange={(e) => setExpanded(e.target.checked)}
                      className="rounded"
                    />
                    <span>Force Expanded State</span>
                  </label>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Test Instructions:</h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Click on different activity items to see the active ID change</li>
                  <li>Check the browser console for onClick and onActiveChange logs</li>
                  <li>Toggle the expand/collapse button to see onExpandedChange logs (when toggleable is enabled)</li>
                  <li>Use the "Enable Toggle Button" checkbox to show/hide the toggle button</li>
                  <li>Use the "Force Expanded State" checkbox to control the expanded state programmatically</li>
                  <li><strong>Custom Styling:</strong> Notice the colored left borders on items (blue, green, purple)</li>
                  <li><strong>Active State:</strong> When items are active, they show enhanced styling with background colors and shadows</li>
                  <li>Verify that both the internal state and callback logs are working</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

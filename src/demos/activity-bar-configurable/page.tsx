"use client"

import * as React from "react"
import { ConfigurableActivityBar } from "@/components/activity-bar/configurable-activity-bar"
import { Search, FileText, Settings, User, Home, Mail, Phone, MessageCircle } from "lucide-react"

export default function ActivityBarConfigurablePage() {
  const [activeId, setActiveId] = React.useState<string>("home")
  const [expanded, setExpanded] = React.useState(false)

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
          },
          {
            id: "search",
            icon: <Search className="h-5 w-5" />,
            label: "Search",
            badge: "3",
            onClick: (id: string) => console.log("Search clicked:", id),
          },
          {
            id: "files",
            icon: <FileText className="h-5 w-5" />,
            label: "Files",
            onClick: (id: string) => console.log("Files clicked:", id),
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
          />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Activity Bar Configurable Demo</h1>
              <div className="space-y-2">
                <p><strong>Current Active ID:</strong> {activeId}</p>
                <p><strong>Expanded:</strong> {expanded ? "Yes" : "No"}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Test Instructions:</h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Click on different activity items to see the active ID change</li>
                  <li>Check the browser console for onClick and onActiveChange logs</li>
                  <li>Toggle the expand/collapse button to see onExpandedChange logs</li>
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

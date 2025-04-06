"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Brain,
  Heart,
  LayoutDashboard,
  LineChart,
  Upload,
  Database,
  Settings,
  Users,
  FileText,
  LogOut,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "ECG Analysis",
    icon: Heart,
    href: "/dashboard/ecg",
    color: "text-rose-500",
  },
  {
    label: "EEG Analysis",
    icon: Brain,
    href: "/dashboard/eeg",
    color: "text-violet-500",
  },
  {
    label: "Signal Upload",
    icon: Upload,
    href: "/dashboard/upload",
    color: "text-emerald-500",
  },
  {
    label: "Visualizations",
    icon: LineChart,
    href: "/dashboard/visualizations",
    color: "text-blue-500",
  },
  {
    label: "Datasets",
    icon: Database,
    href: "/dashboard/datasets",
    color: "text-amber-500",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
    color: "text-indigo-500",
  },
  {
    label: "Team",
    icon: Users,
    href: "/dashboard/team",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative h-full border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-rose-500" />
            <Brain className="h-6 w-6 ml-[-5px] text-blue-500" />
          </div>
          {!isCollapsed && <span className="text-xl font-bold">BrainHeart</span>}
        </div>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              pathname === route.href ? "bg-muted font-medium" : "text-muted-foreground",
            )}
          >
            <route.icon className={cn("h-5 w-5", route.color)} />
            {!isCollapsed && <span>{route.label}</span>}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Button variant="outline" className={cn("w-full justify-start gap-2", isCollapsed && "justify-center")}>
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}


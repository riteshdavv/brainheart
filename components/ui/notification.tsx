"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "default" | "success" | "error" | "warning" | "info"

interface Notification {
  id: string
  title: string
  description?: string
  type: NotificationType
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (notification: Omit<Notification, "id">) => void
  dismissNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    if (notification.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismissNotification(id)
      }, notification.duration || 5000)
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, dismissNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }

  return context
}

function NotificationContainer() {
  const { notifications, dismissNotification } = useNotification()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "p-4 rounded-lg shadow-lg border transition-all duration-300 transform translate-y-0 opacity-100",
            "animate-in slide-in-from-right-full",
            {
              "bg-background border-border": notification.type === "default",
              "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900":
                notification.type === "success",
              "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900": notification.type === "error",
              "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900":
                notification.type === "warning",
              "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900": notification.type === "info",
            },
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{notification.title}</h3>
              {notification.description && (
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="ml-4 p-1 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}


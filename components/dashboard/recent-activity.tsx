import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      user: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
        initials: "JD",
      },
      action: "uploaded a new ECG recording",
      time: "2 minutes ago",
    },
    {
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder-user.jpg",
        initials: "SJ",
      },
      action: "analyzed EEG dataset #1234",
      time: "1 hour ago",
    },
    {
      user: {
        name: "Michael Chen",
        avatar: "/placeholder-user.jpg",
        initials: "MC",
      },
      action: "shared results with the research team",
      time: "3 hours ago",
    },
    {
      user: {
        name: "Emily Wilson",
        avatar: "/placeholder-user.jpg",
        initials: "EW",
      },
      action: "created a new visualization",
      time: "Yesterday",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name} {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


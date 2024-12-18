import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the shape of an activity item
interface Activity {
    user: {
        name: string;
        avatar: string;
        initials: string;
    };
    action: string;
    document_name: string;
    time: string;
}

// Props for RecentActivity
interface RecentActivityProps {
    activities?: Activity[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
    if (activities.length === 0) {
        return <p className="text-sm text-muted-foreground">No recent activity to display.</p>;
    }

    return (
        <div className="space-y-8">
            {activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {activity.action} <span className="font-medium">{activity.document_name}</span>
                        </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
                </div>
            ))}
        </div>
    );
}

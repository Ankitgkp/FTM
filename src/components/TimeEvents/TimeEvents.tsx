import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Circle } from "lucide-react";

interface Event {
  time: string;
  event: string;
  status: "completed" | "pending" | "active";
}

const TimeEvents = () => {
  const { theme } = useTheme();

  const events: Event[] = [
    { time: "T+0s", event: "Liftoff", status: "completed" },
    { time: "T+5s", event: "Max Q", status: "completed" },
    { time: "T+12s", event: "Burnout", status: "active" },
    { time: "T+15s", event: "Apogee", status: "pending" },
    { time: "T+18s", event: "Deployment", status: "pending" },
    { time: "T+45s", event: "Landing", status: "pending" },
  ];

  const getStatusIcon = (status: Event["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-emerald-600" />;
      case "active":
        return (
          <div className="h-3 w-3 bg-amber-600 rounded-full animate-pulse" />
        );
      case "pending":
        return <Circle className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "active":
        return "text-amber-600";
      case "pending":
        return "text-muted-foreground";
    }
  };

  const activeEvents = events.filter((e) => e.status !== "pending").length;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          Time Events
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          {activeEvents}/{events.length}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2">
                {getStatusIcon(event.status)}
                <span className="text-muted-foreground font-mono">
                  {event.time}
                </span>
              </div>
              <span className={`font-medium ${getStatusColor(event.status)}`}>
                {event.event}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeEvents;

import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

const Velocity = () => {
  const { theme } = useTheme();

  // Simulated velocity data
  const velocity = 45.2; // m/s
  const maxVelocity = 100; // Maximum expected velocity for progress
  const velocityProgress = (velocity / maxVelocity) * 100;

  const getVelocityColor = (velocity: number) => {
    if (velocity < 10) return "text-emerald-600";
    if (velocity < 30) return "text-sky-600";
    if (velocity < 60) return "text-amber-600";
    if (velocity < 80) return "text-orange-600";
    return "text-rose-600";
  };

  const getVelocityStatus = (velocity: number) => {
    if (velocity < 10) return { status: "Slow", variant: "default" as const };
    if (velocity < 30)
      return { status: "Moderate", variant: "secondary" as const };
    if (velocity < 60) return { status: "Fast", variant: "secondary" as const };
    if (velocity < 80)
      return { status: "Very Fast", variant: "destructive" as const };
    return { status: "Extreme", variant: "destructive" as const };
  };

  const velocityStatus = getVelocityStatus(velocity);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Gauge className="h-4 w-4 text-slate-500" />
          Velocity
        </CardTitle>
        <Badge variant={velocityStatus.variant} className="text-xs">
          {velocityStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div
            className={`text-2xl font-mono font-bold ${getVelocityColor(
              velocity
            )}`}
          >
            {velocity.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">m/s</div>
          <div className="text-xs text-muted-foreground mt-1">
            {(velocity * 3.6).toFixed(1)} km/h
          </div>
          <div className="text-xs text-muted-foreground">
            {(velocity * 2.237).toFixed(1)} mph
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{maxVelocity} m/s</span>
          </div>
          <Progress value={Math.min(velocityProgress, 100)} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Velocity;

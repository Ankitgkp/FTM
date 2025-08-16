import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mountain } from "lucide-react";

const Altitude = () => {
  const { theme } = useTheme();

  // Simulated altitude data
  const altitude = 1247; // meters above sea level
  const maxAltitude = 2000; // maximum expected altitude for progress
  const altitudeProgress = (altitude / maxAltitude) * 100;

  const getAltitudeColor = (altitude: number) => {
    if (altitude < 500) return "text-emerald-600";
    if (altitude < 1000) return "text-sky-600";
    if (altitude < 1500) return "text-indigo-600";
    if (altitude < 2000) return "text-orange-600";
    return "text-rose-600";
  };

  const getAltitudeStatus = (altitude: number) => {
    if (altitude < 500) return { status: "Low", variant: "default" as const };
    if (altitude < 1000)
      return { status: "Medium", variant: "secondary" as const };
    if (altitude < 1500)
      return { status: "High", variant: "secondary" as const };
    return { status: "Very High", variant: "destructive" as const };
  };

  const altitudeStatus = getAltitudeStatus(altitude);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Mountain className="h-4 w-4 text-slate-500" />
          Altitude
        </CardTitle>
        <Badge variant={altitudeStatus.variant} className="text-xs">
          {altitudeStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div
            className={`text-2xl font-mono font-bold ${getAltitudeColor(
              altitude
            )}`}
          >
            {altitude.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">meters ASL</div>
          <div className="text-xs text-muted-foreground mt-1">
            {(altitude * 3.28084).toFixed(0)} feet
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0m</span>
            <span>{maxAltitude.toLocaleString()}m</span>
          </div>
          <Progress value={Math.min(altitudeProgress, 100)} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Altitude;

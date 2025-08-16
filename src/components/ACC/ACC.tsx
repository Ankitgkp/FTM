import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

const ACC = () => {
  const { theme } = useTheme();
  const { sensorData } = useData();

  // Real accelerometer data from sensor
  const accX = sensorData?.AccX || 0;
  const accY = sensorData?.AccY || 0;
  const accZ = sensorData?.AccZ || 0;

  // Create accData object for compatibility
  const accData = { x: accX, y: accY, z: accZ };

  const getAccelerationColor = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue < 0.1) return "text-emerald-600";
    if (absValue < 0.5) return "text-amber-600";
    return "text-rose-600";
  };

  const getAccelerationProgress = (value: number) => {
    return Math.min((Math.abs(value) / 10) * 100, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-500" />
          Accelerometer
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          m/s²
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">X-Axis</span>
            <span
              className={`text-sm font-mono ${getAccelerationColor(accData.x)}`}
            >
              {accData.x.toFixed(2)}
            </span>
          </div>
          <Progress
            value={getAccelerationProgress(accData.x)}
            className="h-1"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Y-Axis</span>
            <span
              className={`text-sm font-mono ${getAccelerationColor(accData.y)}`}
            >
              {accData.y.toFixed(2)}
            </span>
          </div>
          <Progress
            value={getAccelerationProgress(accData.y)}
            className="h-1"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Z-Axis</span>
            <span
              className={`text-sm font-mono ${getAccelerationColor(accData.z)}`}
            >
              {accData.z.toFixed(2)}
            </span>
          </div>
          <Progress
            value={getAccelerationProgress(accData.z)}
            className="h-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ACC;

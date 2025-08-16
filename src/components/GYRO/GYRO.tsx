import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";

const GYRO = () => {
  const { theme } = useTheme();
  const { sensorData } = useData();

  const gyroX = sensorData?.GyroX || 0;
  const gyroY = sensorData?.GyroY || 0;
  const gyroZ = sensorData?.GyroZ || 0;

  const gyroData = { x: gyroX, y: gyroY, z: gyroZ };

  const getRotationColor = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue < 0.05) return "text-emerald-600";
    if (absValue < 0.15) return "text-amber-600";
    return "text-rose-600";
  };

  const getRotationProgress = (value: number) => {
    return Math.min((Math.abs(value) / 1) * 100, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-slate-500" />
          Gyroscope
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          rad/s
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Roll (X)</span>
            <span
              className={`text-sm font-mono ${getRotationColor(gyroData.x)}`}
            >
              {gyroData.x.toFixed(3)}
            </span>
          </div>
          <Progress value={getRotationProgress(gyroData.x)} className="h-1" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Pitch (Y)</span>
            <span
              className={`text-sm font-mono ${getRotationColor(gyroData.y)}`}
            >
              {gyroData.y.toFixed(3)}
            </span>
          </div>
          <Progress value={getRotationProgress(gyroData.y)} className="h-1" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Yaw (Z)</span>
            <span
              className={`text-sm font-mono ${getRotationColor(gyroData.z)}`}
            >
              {gyroData.z.toFixed(3)}
            </span>
          </div>
          <Progress value={getRotationProgress(gyroData.z)} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default GYRO;

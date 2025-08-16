import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Battery } from "lucide-react";

const BatteryVoltage = () => {
  const { theme } = useTheme();

  // Simulated battery data
  const voltage = 8.4;
  const minVoltage = 6.0; // Low voltage threshold
  const maxVoltage = 9.0; // Maximum expected voltage
  const percentage = Math.min(
    ((voltage - minVoltage) / (maxVoltage - minVoltage)) * 100,
    100
  );

  const getBatteryColor = (percentage: number) => {
    if (percentage > 60) return "text-emerald-600";
    if (percentage > 30) return "text-amber-600";
    if (percentage > 15) return "text-orange-600";
    return "text-rose-600";
  };

  const getBatteryStatus = (percentage: number) => {
    if (percentage > 75)
      return { status: "Excellent", variant: "default" as const };
    if (percentage > 50)
      return { status: "Good", variant: "secondary" as const };
    if (percentage > 25)
      return { status: "Low", variant: "secondary" as const };
    if (percentage > 10)
      return { status: "Critical", variant: "destructive" as const };
    return { status: "Empty", variant: "destructive" as const };
  };

  const batteryStatus = getBatteryStatus(percentage);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Battery className={`h-4 w-4 ${getBatteryColor(percentage)}`} />
          Battery
        </CardTitle>
        <Badge variant={batteryStatus.variant} className="text-xs">
          {batteryStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div
            className={`text-2xl font-mono font-bold ${getBatteryColor(
              percentage
            )}`}
          >
            {voltage.toFixed(1)}V
          </div>
          <div className="text-xs text-muted-foreground">
            {percentage.toFixed(1)}% charge
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={percentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minVoltage}V</span>
            <span>{maxVoltage}V</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryVoltage;

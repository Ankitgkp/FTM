import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

const Pressure = () => {
  const { theme } = useTheme();

  // Simulated pressure data
  const pressure = 1013.25; // hPa (standard atmospheric pressure)
  const minPressure = 980;
  const maxPressure = 1050;
  const pressureProgress =
    ((pressure - minPressure) / (maxPressure - minPressure)) * 100;

  const getPressureColor = (pressure: number) => {
    if (pressure < 1000) return "text-sky-600";
    if (pressure < 1010) return "text-cyan-600";
    if (pressure < 1020) return "text-emerald-600";
    if (pressure < 1030) return "text-amber-600";
    return "text-orange-600";
  };

  const getPressureStatus = (pressure: number) => {
    if (pressure < 1000)
      return { status: "Low", variant: "destructive" as const };
    if (pressure < 1010)
      return { status: "Below Normal", variant: "secondary" as const };
    if (pressure < 1020)
      return { status: "Normal", variant: "default" as const };
    if (pressure < 1030)
      return { status: "High", variant: "secondary" as const };
    return { status: "Very High", variant: "destructive" as const };
  };

  const pressureStatus = getPressureStatus(pressure);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Gauge className="h-4 w-4 text-slate-500" />
          Pressure
        </CardTitle>
        <Badge variant={pressureStatus.variant} className="text-xs">
          {pressureStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div
            className={`text-2xl font-mono font-bold ${getPressureColor(
              pressure
            )}`}
          >
            {pressure.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">hPa</div>
          <div className="text-xs text-muted-foreground mt-1">
            {(pressure * 0.02953).toFixed(2)} inHg
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minPressure}</span>
            <span>{maxPressure}</span>
          </div>
          <Progress value={pressureProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Pressure;

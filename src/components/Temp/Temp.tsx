import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wifi, WifiOff } from "lucide-react";

const Temp = () => {
  const { theme } = useTheme();
  const { sensorData, isConnected, lastUpdate, firstDataReceived } = useData();

  // Real temperature data from sensor
  const currentTemp = sensorData?.T || 0;
  const minTemp = 18.0;
  const maxTemp = 35.0;

  const tempProgress = ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100;

  const getTemperatureColor = (temp: number): string => {
    if (temp < 10) return "text-slate-500";
    if (temp < 20) return "text-emerald-600";
    if (temp < 30) return "text-amber-600";
    return "text-rose-600";
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 10) return { status: "Cold", variant: "secondary" as const };
    if (temp < 25) return { status: "Optimal", variant: "default" as const };
    if (temp < 35) return { status: "Warm", variant: "secondary" as const };
    return { status: "Hot", variant: "destructive" as const };
  };

  const tempStatus = getTemperatureStatus(currentTemp);

  // Show animation when data is actively coming in (connected and receiving data)
  const showAnimation = isConnected && firstDataReceived;

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        showAnimation ? "data-fetching-animation temperature-theme" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-slate-500" />
          Temperature
        </CardTitle>
        <Badge variant={tempStatus.variant} className="text-xs">
          {tempStatus.status}
        </Badge>
      </CardHeader>
      <CardContent
        className={`space-y-4 relative z-10 ${
          showAnimation ? "gentle-pulse-animation" : ""
        }`}
      >
        <div className="text-center">
          <div
            className={`text-3xl font-mono font-bold ${getTemperatureColor(
              currentTemp
            )}`}
          >
            {currentTemp.toFixed(1)}°C
          </div>
          <div className="text-lg text-slate-500">
            {((currentTemp * 9) / 5 + 32).toFixed(1)}°F
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Thermometer className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Real-time</span>
            {isConnected ? (
              <Wifi className="w-4 h-4 text-emerald-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-rose-600" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Range</span>
            <span className="text-slate-500">
              {minTemp}°C - {maxTemp}°C
            </span>
          </div>
          <Progress
            value={Math.max(0, Math.min(100, tempProgress))}
            className="w-full h-2"
          />
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">Status</span>
            <div className="text-xs text-slate-500">
              {lastUpdate
                ? `Updated ${new Date(lastUpdate).toLocaleTimeString()}`
                : "No data"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Temp;

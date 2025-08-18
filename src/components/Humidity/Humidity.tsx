import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Wifi, WifiOff } from "lucide-react";

const Humidity = () => {
  const { theme } = useTheme();
  const { sensorData, isConnected, lastUpdate, firstDataReceived } = useData();

  // Real humidity data from sensor
  const currentHumidity = sensorData?.RH || 0;
  const minHumidity = 0;
  const maxHumidity = 100;

  const humidityProgress =
    ((currentHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;

  const getHumidityColor = (humidity: number): string => {
    if (humidity < 30) return "text-red-400"; // Too dry
    if (humidity < 60) return "text-emerald-600"; // Optimal
    if (humidity < 80) return "text-amber-600"; // High
    return "text-rose-600"; // Too humid
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 30)
      return { status: "Dry", variant: "destructive" as const };
    if (humidity < 60)
      return { status: "Optimal", variant: "default" as const };
    if (humidity < 80) return { status: "High", variant: "secondary" as const };
    return { status: "Humid", variant: "destructive" as const };
  };

  const humidityStatus = getHumidityStatus(currentHumidity);

  const showAnimation = isConnected && firstDataReceived;

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        showAnimation ? "data-fetching-animation humidity-theme" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Droplets className="h-4 w-4 text-slate-500" />
          Humidity
        </CardTitle>
        <Badge variant={humidityStatus.variant} className="text-xs">
          {humidityStatus.status}
        </Badge>
      </CardHeader>
      <CardContent
        className={`space-y-4 relative z-10 ${
          showAnimation ? "gentle-pulse-animation" : ""
        }`}
      >
        <div className="text-center">
          <div
            className={`text-3xl font-mono font-bold ${getHumidityColor(
              currentHumidity
            )}`}
          >
            {currentHumidity.toFixed(1)}%
          </div>
          <div className="text-lg text-slate-500">RH</div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Droplets className="w-4 h-4 text-slate-500" />
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
              {minHumidity}% - {maxHumidity}%
            </span>
          </div>
          <Progress
            value={Math.max(0, Math.min(100, humidityProgress))}
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

export default Humidity;

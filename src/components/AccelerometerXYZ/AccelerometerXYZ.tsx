import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, WifiOff } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

interface AccDataPoint {
  time: string;
  x: number;
  y: number;
  z: number;
}

const AccelerometerXYZ = () => {
  const { theme } = useTheme();
  const { sensorData, isConnected, lastUpdate, firstDataReceived } = useData();
  const [accHistory, setAccHistory] = useState<AccDataPoint[]>([]);

  // Get current accelerometer data
  const currentAcc = sensorData?.acc_ms2 || { x: 0, y: 0, z: 0 };

  // Update history when new data comes in
  useEffect(() => {
    if (sensorData?.acc_ms2) {
      const newDataPoint: AccDataPoint = {
        time: new Date().toLocaleTimeString(),
        x: sensorData.acc_ms2.x,
        y: sensorData.acc_ms2.y,
        z: sensorData.acc_ms2.z,
      };

      setAccHistory((prev) => {
        const updated = [...prev, newDataPoint];
        // Keep only last 20 data points
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    }
  }, [sensorData?.acc_ms2]);

  // Calculate magnitude
  const magnitude = Math.sqrt(
    currentAcc.x ** 2 + currentAcc.y ** 2 + currentAcc.z ** 2
  );

  const getAccelerationStatus = (mag: number) => {
    if (mag < 5) return { status: "Low", variant: "secondary" as const };
    if (mag < 15) return { status: "Normal", variant: "default" as const };
    if (mag < 25) return { status: "High", variant: "secondary" as const };
    return { status: "Extreme", variant: "destructive" as const };
  };

  const accStatus = getAccelerationStatus(magnitude);

  // Show animation when data is actively coming in
  const showAnimation = isConnected && firstDataReceived;

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        showAnimation ? "data-fetching-animation acceleration-theme" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-500" />
          Accelerometer (m/s²)
        </CardTitle>
        <Badge variant={accStatus.variant} className="text-xs">
          {accStatus.status}
        </Badge>
      </CardHeader>
      <CardContent
        className={`space-y-4 relative z-10 ${
          showAnimation ? "gentle-pulse-animation" : ""
        }`}
      >
        {/* Current Values */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-mono font-bold text-red-500">
              {currentAcc.x.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">X-Axis</div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-green-500">
              {currentAcc.y.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">Y-Axis</div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-blue-500">
              {currentAcc.z.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">Z-Axis</div>
          </div>
        </div>

        {/* Magnitude */}
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-purple-600">
            {magnitude.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500">Magnitude</div>
        </div>

        {/* Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accHistory}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                hide
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="x"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="X"
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Y"
              />
              <Line
                type="monotone"
                dataKey="z"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Z"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Real-time</span>
            {isConnected ? (
              <Wifi className="w-4 h-4 text-emerald-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div className="text-xs text-slate-500">
            {lastUpdate
              ? `Updated ${new Date(lastUpdate).toLocaleTimeString()}`
              : "No data"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccelerometerXYZ;

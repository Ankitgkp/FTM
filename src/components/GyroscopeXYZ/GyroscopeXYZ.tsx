import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Wifi, WifiOff } from "lucide-react";
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

interface GyroDataPoint {
  time: string;
  x: number;
  y: number;
  z: number;
}

const GyroscopeXYZ = () => {
  const { theme } = useTheme();
  const { sensorData, isConnected, lastUpdate, firstDataReceived } = useData();
  const [gyroHistory, setGyroHistory] = useState<GyroDataPoint[]>([]);

  // Get current gyroscope data
  const currentGyro = sensorData?.gyro_dps || { x: 0, y: 0, z: 0 };

  // Update history when new data comes in
  useEffect(() => {
    if (sensorData?.gyro_dps) {
      const newDataPoint: GyroDataPoint = {
        time: new Date().toLocaleTimeString(),
        x: sensorData.gyro_dps.x,
        y: sensorData.gyro_dps.y,
        z: sensorData.gyro_dps.z,
      };

      setGyroHistory((prev) => {
        const updated = [...prev, newDataPoint];
        // Keep only last 20 data points
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    }
  }, [sensorData?.gyro_dps]);

  // Calculate angular velocity magnitude
  const magnitude = Math.sqrt(
    currentGyro.x ** 2 + currentGyro.y ** 2 + currentGyro.z ** 2
  );

  const getGyroStatus = (mag: number) => {
    if (mag < 10) return { status: "Stable", variant: "default" as const };
    if (mag < 50) return { status: "Moving", variant: "secondary" as const };
    if (mag < 100) return { status: "Active", variant: "secondary" as const };
    return { status: "Spinning", variant: "destructive" as const };
  };

  const gyroStatus = getGyroStatus(magnitude);

  // Show animation when data is actively coming in
  const showAnimation = isConnected && firstDataReceived;

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        showAnimation ? "data-fetching-animation gyroscope-theme" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-slate-500" />
          Gyroscope (°/s)
        </CardTitle>
        <Badge variant={gyroStatus.variant} className="text-xs">
          {gyroStatus.status}
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
            <div className="text-lg font-mono font-bold text-cyan-500">
              {currentGyro.x.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">Pitch (X)</div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-yellow-500">
              {currentGyro.y.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">Roll (Y)</div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-pink-500">
              {currentGyro.z.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">Yaw (Z)</div>
          </div>
        </div>

        {/* Angular Velocity Magnitude */}
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-indigo-600">
            {magnitude.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500">Angular Velocity</div>
        </div>

        {/* Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gyroHistory}>
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
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                name="Pitch"
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                name="Roll"
              />
              <Line
                type="monotone"
                dataKey="z"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
                name="Yaw"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-slate-500" />
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

export default GyroscopeXYZ;

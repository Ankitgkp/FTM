import { useTheme } from "../../contexts/ThemeContext";
import { useData } from "../../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

const RocketOrientation = () => {
  const { theme } = useTheme();
  const { sensorData, isConnected, lastUpdate, firstDataReceived } = useData();

  // Get current gyroscope data for orientation
  const currentGyro = sensorData?.gyro_dps || { x: 0, y: 0, z: 0 };

  // Convert gyroscope data to rotation angles (degrees)
  // Integrate angular velocity over time to get orientation
  const [orientation, setOrientation] = useState({ pitch: 0, roll: 0, yaw: 0 });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  useEffect(() => {
    if (sensorData?.gyro_dps) {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastUpdateTime) / 1000; // Convert to seconds

      // Integrate angular velocity to get rotation angles
      setOrientation((prev) => ({
        pitch: prev.pitch + currentGyro.x * deltaTime * 0.5, // Damping factor to prevent excessive rotation
        roll: prev.roll + currentGyro.y * deltaTime * 0.5,
        yaw: prev.yaw + currentGyro.z * deltaTime * 0.5,
      }));

      setLastUpdateTime(currentTime);
    }
  }, [
    sensorData?.gyro_dps,
    currentGyro.x,
    currentGyro.y,
    currentGyro.z,
    lastUpdateTime,
  ]);

  // Calculate overall movement intensity
  const movementIntensity = Math.sqrt(
    currentGyro.x ** 2 + currentGyro.y ** 2 + currentGyro.z ** 2
  );

  const getOrientationStatus = (intensity: number) => {
    if (intensity < 5) return { status: "Stable", variant: "default" as const };
    if (intensity < 20)
      return { status: "Moving", variant: "secondary" as const };
    if (intensity < 50)
      return { status: "Active", variant: "secondary" as const };
    return { status: "Tumbling", variant: "destructive" as const };
  };

  const orientationStatus = getOrientationStatus(movementIntensity);

  // Show animation when data is actively coming in
  const showAnimation = isConnected && firstDataReceived;

  // Create rotation transform string
  const rocketTransform = `
    rotateX(${orientation.pitch}deg) 
    rotateY(${orientation.yaw}deg) 
    rotateZ(${orientation.roll}deg)
  `;

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${
        showAnimation ? "data-fetching-animation rocket-theme" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Rocket className="h-4 w-4 text-slate-500" />
          Rocket Orientation
        </CardTitle>
        <Badge variant={orientationStatus.variant} className="text-xs">
          {orientationStatus.status}
        </Badge>
      </CardHeader>
      <CardContent
        className={`space-y-4 relative z-10 ${
          showAnimation ? "gentle-pulse-animation" : ""
        }`}
      >
        {/* 3D Rocket Visualization */}
        <div className="flex justify-center items-center h-64 rocket-3d-container">
          <div className="rocket-3d-scene">
            {/* Rocket Container with 3D transform */}
            <div
              className="rocket-3d-object"
              style={{
                transform: rocketTransform,
              }}
            >
              {/* Main Rocket Body - Front Face */}
              <div className="rocket-face rocket-front">
                {/* Nose Cone */}
                <div className="rocket-nose"></div>

                {/* Main Body */}
                <div className="rocket-body">
                  {/* Window */}
                  <div className="rocket-window"></div>
                  {/* Body Details */}
                  <div className="rocket-stripe rocket-stripe-1"></div>
                  <div className="rocket-stripe rocket-stripe-2"></div>
                </div>

                {/* Engine Section */}
                <div className="rocket-engine">
                  <div className="engine-nozzle"></div>
                  {movementIntensity > 5 && (
                    <div className="rocket-flame">
                      <div className="flame-core"></div>
                      <div className="flame-outer"></div>
                    </div>
                  )}
                </div>

                {/* Fins */}
                <div className="rocket-fins">
                  <div className="fin fin-left"></div>
                  <div className="fin fin-right"></div>
                </div>
              </div>

              {/* Side Faces for 3D depth */}
              <div className="rocket-face rocket-left">
                <div className="rocket-nose-side"></div>
                <div className="rocket-body-side"></div>
                <div className="rocket-engine-side"></div>
              </div>

              <div className="rocket-face rocket-right">
                <div className="rocket-nose-side"></div>
                <div className="rocket-body-side"></div>
                <div className="rocket-engine-side"></div>
              </div>

              {/* Top and Bottom faces */}
              <div className="rocket-face rocket-top">
                <div className="rocket-nose-top"></div>
                <div className="rocket-body-top"></div>
              </div>

              <div className="rocket-face rocket-bottom">
                <div className="rocket-body-bottom"></div>
                <div className="rocket-engine-bottom"></div>
              </div>
            </div>

            {/* 3D Axis Indicators */}
            <div className="axis-indicators">
              {/* X-axis (Pitch) - Red */}
              <div className="axis axis-x">
                <div className="axis-line"></div>
                <div className="axis-label">Pitch</div>
              </div>
              {/* Y-axis (Roll) - Green */}
              <div className="axis axis-y">
                <div className="axis-line"></div>
                <div className="axis-label">Roll</div>
              </div>
              {/* Z-axis (Yaw) - Blue */}
              <div className="axis axis-z">
                <div className="axis-line"></div>
                <div className="axis-label">Yaw</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orientation Values */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-mono font-bold text-red-500">
              {orientation.pitch.toFixed(1)}°
            </div>
            <div className="text-xs text-slate-500">Pitch (X)</div>
            <div className="text-xs text-slate-400">
              {currentGyro.x.toFixed(2)}°/s
            </div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-green-500">
              {orientation.roll.toFixed(1)}°
            </div>
            <div className="text-xs text-slate-500">Roll (Y)</div>
            <div className="text-xs text-slate-400">
              {currentGyro.y.toFixed(2)}°/s
            </div>
          </div>
          <div>
            <div className="text-lg font-mono font-bold text-blue-500">
              {orientation.yaw.toFixed(1)}°
            </div>
            <div className="text-xs text-slate-500">Yaw (Z)</div>
            <div className="text-xs text-slate-400">
              {currentGyro.z.toFixed(2)}°/s
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setOrientation({ pitch: 0, roll: 0, yaw: 0 })}
            className="px-3 py-1 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
          >
            Reset Orientation
          </button>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center gap-2 mt-2 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-slate-500" />
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

export default RocketOrientation;

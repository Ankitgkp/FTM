import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Satellite } from "lucide-react";

const GPSCoordinate = () => {
  const { theme } = useTheme();

  const coordinates = {
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: 156, // meters
    accuracy: 3.2, // meters
    satelliteCount: 8,
  };

  const getGPSStatus = (satelliteCount: number, accuracy: number) => {
    if (satelliteCount >= 8 && accuracy <= 3) {
      return {
        status: "Excellent",
        variant: "default" as const,
        color: "text-emerald-600",
      };
    } else if (satelliteCount >= 6 && accuracy <= 5) {
      return {
        status: "Good",
        variant: "secondary" as const,
        color: "text-sky-600",
      };
    } else if (satelliteCount >= 4 && accuracy <= 10) {
      return {
        status: "Fair",
        variant: "secondary" as const,
        color: "text-amber-600",
      };
    } else {
      return {
        status: "Poor",
        variant: "destructive" as const,
        color: "text-rose-600",
      };
    }
  };

  const gpsStatus = getGPSStatus(
    coordinates.satelliteCount,
    coordinates.accuracy
  );

  // Format coordinates
  const formatCoordinate = (coord: number, isLongitude = false) => {
    const direction =
      coord >= 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";
    return `${Math.abs(coord).toFixed(4)}° ${direction}`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-500" />
          GPS Position
        </CardTitle>
        <Badge variant={gpsStatus.variant} className="text-xs">
          {gpsStatus.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Latitude:</span>
            <span className="text-sm font-mono text-foreground">
              {formatCoordinate(coordinates.latitude)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Longitude:</span>
            <span className="text-sm font-mono text-foreground">
              {formatCoordinate(coordinates.longitude, true)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Altitude:</span>
            <span className="text-sm font-mono text-foreground">
              {coordinates.altitude}m
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Satellite className="h-3 w-3 text-slate-500" />
            <span className="text-xs text-muted-foreground">
              {coordinates.satelliteCount} sats
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${gpsStatus.color.replace(
                "text-",
                "bg-"
              )}`}
            ></div>
            <span className="text-xs text-muted-foreground">
              ±{coordinates.accuracy}m
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPSCoordinate;

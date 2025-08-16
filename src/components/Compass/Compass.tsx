import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "lucide-react";

const Compass = () => {
  const { theme } = useTheme();
  const heading = 187; // Example heading in degrees

  const getDirectionName = (heading: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(heading / 22.5) % 16;
    return directions[index];
  };

  const getDirectionColor = (direction: string) => {
    const colors: { [key: string]: string } = {
      N: "text-rose-600",
      E: "text-sky-600",
      S: "text-emerald-600",
      W: "text-amber-600",
    };
    return colors[direction[0]] || "text-gray-500";
  };

  const directionName = getDirectionName(heading);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Navigation className="h-4 w-4 text-slate-500" />
          Compass
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          {directionName}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 border-2 border-border rounded-full flex items-center justify-center bg-muted/20">
          {/* Compass needle */}
          <div
            className="absolute w-1 h-10 bg-red-500 origin-bottom rounded-full shadow-sm"
            style={{
              transform: `rotate(${heading}deg) translateY(-50%)`,
              transformOrigin: "center bottom",
            }}
          />
          {/* North triangle */}
          <div
            className="absolute w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-500"
            style={{
              transform: `rotate(${heading}deg) translateY(-15px)`,
              transformOrigin: "center bottom",
            }}
          />
          {/* Center dot */}
          <div className="w-2 h-2 bg-foreground rounded-full"></div>
          {/* Compass directions */}
          <div className="absolute -top-7 text-xs font-bold text-rose-600">
            N
          </div>
          <div className="absolute -right-7 text-xs text-muted-foreground">
            E
          </div>
          <div className="absolute -bottom-7 text-xs text-muted-foreground">
            S
          </div>
          <div className="absolute -left-7 text-xs text-muted-foreground">
            W
          </div>
        </div>

        <div className="text-center">
          <div
            className={`text-2xl font-mono font-bold ${getDirectionColor(
              directionName
            )}`}
          >
            {heading}°
          </div>
          <div className="text-xs text-muted-foreground">
            {directionName} - Magnetic Heading
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Compass;

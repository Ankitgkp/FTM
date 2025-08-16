import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const ThrustCurve = () => {
  const { theme, isDarkMode } = useTheme();

  // Generate curve path for a realistic thrust curve
  const generateCurvePath = () => {
    const width = 280;
    const height = 120;
    const points = [
      { x: 0, y: height }, // Start at bottom
      { x: 30, y: height - 20 }, // Initial thrust
      { x: 60, y: height - 60 }, // Rapid increase
      { x: 90, y: height - 95 }, // Peak thrust
      { x: 120, y: height - 90 }, // Slight dip
      { x: 150, y: height - 80 }, // Sustained
      { x: 180, y: height - 50 }, // Decline starts
      { x: 210, y: height - 25 }, // Rapid decline
      { x: 240, y: height - 8 }, // Near burnout
      { x: 270, y: height - 2 }, // Burnout
      { x: 280, y: height }, // End at bottom
    ];

    // Create smooth curve using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;

      path += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
    }

    // Add final point
    const lastPoint = points[points.length - 1];
    path += ` Q ${points[points.length - 2].x} ${points[points.length - 2].y} ${
      lastPoint.x
    } ${lastPoint.y}`;

    return path;
  };

  return (
    <Card className="hover:shadow-md transition-shadow col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-slate-500" />
          Thrust Curve
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          Real-time
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-32 relative">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 280 120"
            className="overflow-visible"
          >
            {/* Grid lines for reference */}
            <defs>
              <pattern
                id="grid"
                width="28"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 28 0 L 0 0 0 24"
                  fill="none"
                  stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
              <linearGradient
                id="thrustGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid background */}
            <rect width="280" height="120" fill="url(#grid)" />

            {/* Fill area under curve */}
            <path
              d={`${generateCurvePath()} L 280 120 L 0 120 Z`}
              fill="url(#thrustGradient)"
              opacity="0.3"
            />

            {/* Main thrust curve line */}
            <path
              d={generateCurvePath()}
              fill="none"
              stroke="url(#thrustGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />

            {/* Peak point indicator */}
            <circle
              cx="90"
              cy="25"
              r="3"
              fill="#8b5cf6"
              stroke="#ffffff"
              strokeWidth="1"
              className="drop-shadow-sm"
            />
          </svg>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0s</span>
          <span>Peak Thrust</span>
          <span>Burnout</span>
          <span>10s</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThrustCurve;

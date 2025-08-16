import {
  BarChart3,
  Target,
  Radio,
  Rocket,
  TrendingUp,
  FileText,
  Settings,
  User,
  HelpCircle,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active?: boolean;
  badge?: string;
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      active: true,
    },
    {
      id: "sensors",
      label: "Sensors",
      icon: Target,
      badge: "3",
    },
    {
      id: "telemetry",
      label: "Telemetry",
      icon: Radio,
    },
    {
      id: "flight",
      label: "Flight Data",
      icon: Rocket,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
    },
    {
      id: "logs",
      label: "System Logs",
      icon: FileText,
      badge: "24",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      id: "profile",
      label: "Mission Profile",
      icon: User,
    },
    {
      id: "help",
      label: "Help Center",
      icon: HelpCircle,
    },
    {
      id: "docs",
      label: "Documentation",
      icon: BookOpen,
    },
  ];

  return (
    <div
      className={cn(
        "w-64 min-h-screen flex flex-col border-r shadow-lg",
        "bg-background border-border"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              FM
            </span>
          </div>
          <span className="text-foreground text-xl font-semibold">
            Flight Monitor
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || item.active;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-between h-10 px-3",
                  isActive && "bg-primary text-primary-foreground"
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      <Separator />

      {/* Bottom Section */}
      <div className="p-3">
        <div className="space-y-1 mb-4">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
            className="mx-2"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

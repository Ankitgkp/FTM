import "./App.css";
import { useState } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { DataProvider } from "./contexts/DataContext";
import Sidebar from "./components/Sidebar/Sidebar";
import ACC from "./components/ACC/ACC";
import GYRO from "./components/GYRO/GYRO";
import Temp from "./components/Temp/Temp";
import Humidity from "./components/Humidity/Humidity";
import Pressure from "./components/Pressure/Pressure";
import Altitude from "./components/Altitude/Altitude";
import TimeEvents from "./components/TimeEvents/TimeEvents";
import Velocity from "./components/Velocity/Velocity";
import ThrustCurve from "./components/ThrustCurve/ThrustCurve";
import BatteryVoltage from "./components/BatteryVoltage/BatteryVoltage";
import GPSCoordinate from "./components/GPSCoordinate/GPSCoordinate";
import Compass from "./components/Compass/Compass";
import AccelerometerXYZ from "./components/AccelerometerXYZ/AccelerometerXYZ";
import GyroscopeXYZ from "./components/GyroscopeXYZ/GyroscopeXYZ";
import RocketOrientation from "./components/RocketOrientation/RocketOrientation";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { theme } = useTheme();

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-3">
            {/* Status Bar */}
            <div
              className={`${theme.bg.secondary} rounded-lg p-2 border ${theme.border.primary}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span
                      className={`${theme.text.primary} text-sm font-medium`}
                    >
                      System Active
                    </span>
                  </div>
                  <div className={`${theme.text.tertiary} text-sm`}>
                    Signal: Strong
                  </div>
                  <div className={`${theme.text.tertiary} text-sm`}>
                    Mission Time: T+00:00
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-400">● Online</span>
                  <span className={theme.text.tertiary}>Last Update: Now</span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-12 gap-3">
              {/* Left Panel - Critical Sensors */}
              <div className="col-span-3 space-y-2">
                <ACC />
                <GYRO />
                <Temp />
                <Humidity />
              </div>

              {/* Center Panel - Main Display */}
              <div className="col-span-6 space-y-2">
                <ThrustCurve />
                <div className="grid grid-cols-3 gap-2">
                  <BatteryVoltage />
                  <Velocity />
                  <Pressure />
                </div>
                {/* New XYZ Components */}
                <div className="grid grid-cols-2 gap-2">
                  <AccelerometerXYZ />
                  <GyroscopeXYZ />
                </div>
              </div>

              {/* Right Panel - Navigation & Events */}
              <div className="col-span-3 space-y-2">
                <RocketOrientation />
                <TimeEvents />
                <Compass />
                <div className="grid grid-cols-1 gap-2">
                  <Altitude />
                  <GPSCoordinate />
                </div>
              </div>
            </div>
          </div>
        );
      case "sensors":
        return (
          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${theme.text.primary}`}>
              Sensor Data
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <ACC />
              <GYRO />
              <Temp />
              <Humidity />
              <Pressure />
              <Altitude />
              <BatteryVoltage />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AccelerometerXYZ />
              <GyroscopeXYZ />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <RocketOrientation />
            </div>
          </div>
        );
      case "telemetry":
        return (
          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${theme.text.primary}`}>
              Telemetry Data
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <GPSCoordinate />
              <Compass />
              <Velocity />
              <TimeEvents />
            </div>
          </div>
        );
      case "flight":
        return (
          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${theme.text.primary}`}>
              Flight Data
            </h2>
            <ThrustCurve />
            <div className="grid grid-cols-3 gap-4">
              <Altitude />
              <Velocity />
              <Pressure />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className={`text-center ${theme.text.tertiary}`}>
              <h3 className="text-xl font-medium mb-2">
                Section Under Development
              </h3>
              <p>This section is currently being developed.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} flex`}>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className={`text-2xl font-bold ${theme.text.primary} mb-1`}>
            Flight Telemetry Monitor
          </h1>
          <p className={`text-sm ${theme.text.secondary}`}>
            Real-time monitoring and control system
          </p>
        </div>

        {renderMainContent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

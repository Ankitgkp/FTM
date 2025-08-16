import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SensorData {
  T?: number; // Temperature
  RH?: number; // Humidity
  P?: number; // Pressure
  A?: number; // Altitude
  V?: number; // Velocity
  AccX?: number; // Accelerometer X
  AccY?: number; // Accelerometer Y
  AccZ?: number; // Accelerometer Z
  GyroX?: number; // Gyroscope X
  GyroY?: number; // Gyroscope Y
  GyroZ?: number; // Gyroscope Z
  Lat?: number; // GPS Latitude
  Lng?: number; // GPS Longitude
  Battery?: number; // Battery voltage
  Heading?: number; // Compass heading
}

interface DataContextType {
  sensorData: SensorData;
  isConnected: boolean;
  lastUpdate: Date | null;
  error: string | null;
  connectionChanged: "connected" | "disconnected" | null;
  firstDataReceived: boolean;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionChanged, setConnectionChanged] = useState<
    "connected" | "disconnected" | null
  >(null);
  const [previousConnectionState, setPreviousConnectionState] = useState(false);
  const [firstDataReceived, setFirstDataReceived] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.145.252.59/data");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sensor Data:", data);
      console.log("Humidity Data:", data.RH);

      // Check for connection state change
      if (!previousConnectionState && !isConnected) {
        // First time getting data or reconnecting
        setConnectionChanged("connected");
        setFirstDataReceived(true);
        setTimeout(() => setConnectionChanged(null), 3000); // Clear after 3 seconds
      }

      // Update sensor data
      setSensorData(data);
      setIsConnected(true);
      setPreviousConnectionState(true);
      setLastUpdate(new Date());
      setError(null);
    } catch (error: any) {
      console.error(
        `[${new Date().toLocaleTimeString()}] Error fetching data:`,
        error.message
      );

      // Check for disconnection
      if (previousConnectionState && isConnected) {
        setConnectionChanged("disconnected");
        setTimeout(() => setConnectionChanged(null), 3000); // Clear after 3 seconds
      }

      setError(error.message);
      setIsConnected(false);
      setPreviousConnectionState(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for continuous fetching
    const interval = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider
      value={{
        sensorData,
        isConnected,
        lastUpdate,
        error,
        connectionChanged,
        firstDataReceived,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

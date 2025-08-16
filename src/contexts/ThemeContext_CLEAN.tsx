import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeColors {
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
}

interface ThemeContextType {
  theme: ThemeColors;
  currentTheme: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  // Apply dark class to document root for ShadCN UI
  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [currentTheme]);

  const themes = {
    light: {
      bg: {
        primary: "bg-background",
        secondary: "bg-card",
        tertiary: "bg-muted",
      },
      text: {
        primary: "text-foreground",
        secondary: "text-muted-foreground",
        tertiary: "text-muted-foreground",
      },
      border: {
        primary: "border-border",
        secondary: "border-border",
      },
    },
    dark: {
      bg: {
        primary: "bg-background",
        secondary: "bg-card",
        tertiary: "bg-muted",
      },
      text: {
        primary: "text-foreground",
        secondary: "text-muted-foreground",
        tertiary: "text-muted-foreground",
      },
      border: {
        primary: "border-border",
        secondary: "border-border",
      },
    },
  };

  const theme = themes[currentTheme as keyof typeof themes];

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        isDarkMode: currentTheme === "dark",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

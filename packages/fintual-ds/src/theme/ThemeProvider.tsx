import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../tokens/colors";

type Theme = typeof lightTheme;

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({
  children,
  forcedTheme,
}: {
  children: React.ReactNode;
  forcedTheme?: 'light' | 'dark';
}) => {
  const systemColorScheme = useColorScheme();
  const colorScheme = forcedTheme || systemColorScheme;
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme as Theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return theme;
};

import type { Preview } from "@storybook/react-native";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { lightTheme, darkTheme } from "../src/tokens/colors";
import { View } from "react-native";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ({ theme, children }) => {
        const themeName = theme === darkTheme ? 'dark' : 'light';
        return (
          <ThemeProvider forcedTheme={themeName}>
            <View style={{
              backgroundColor: theme.background.primary,
              minHeight: '100vh',
              padding: 20,
            }}>
              {children}
            </View>
          </ThemeProvider>
        );
      },
    }),
  ],

  tags: ["autodocs"],
};

export default preview;

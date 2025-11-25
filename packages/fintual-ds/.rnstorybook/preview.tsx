import type { Preview } from "@storybook/react-native";
import { Platform, View } from "react-native";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { useTheme } from "../src/theme";

// fix for actions on web
if (Platform.OS === "web") {
  // @ts-ignore
  global.ProgressTransitionRegister = {};
  // @ts-ignore
  global.UpdatePropsManager = {};
}

// Helper component to apply background
const ThemedBackground = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <View style={{
      backgroundColor: theme.background.primary,
      flex: 1,
      padding: 16,
    }}>
      {children}
    </View>
  );
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme || 'light';

      return (
        <ThemeProvider forcedTheme={themeName}>
          <ThemedBackground>
            <Story />
          </ThemedBackground>
        </ThemeProvider>
      );
    },
  ],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

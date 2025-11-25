import type { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
};

export default main;

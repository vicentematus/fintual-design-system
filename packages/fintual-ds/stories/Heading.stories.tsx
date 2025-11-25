import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../src/components/Heading";

const meta = {
  title: "Typography/Heading",
  component: Heading,
  argTypes: {
    size: {
      control: "select",
      options: [
        "text-xs",
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
        "text-xxl",
        "text-xxxl",
      ],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "inverse"],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const ExtraExtraLarge: Story = {
  args: {
    size: "text-xxl",
    children: "Extra Extra Large Heading",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "text-xl",
    children: "Extra Large Heading",
  },
};

export const Large: Story = {
  args: {
    size: "text-lg",
    children: "Large Heading",
  },
};

export const Medium: Story = {
  args: {
    size: "text-md",
    children: "Medium Heading",
  },
};

export const Small: Story = {
  args: {
    size: "text-sm",
    children: "Small Heading",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "text-xs",
    children: "Extra Small Heading",
  },
};

export const ColorPrimary: Story = {
  args: {
    children: "Primary color heading",
    color: "primary",
  },
};

export const ColorSecondary: Story = {
  args: {
    children: "Secondary color heading",
    color: "secondary",
  },
};

export const ColorTertiary: Story = {
  args: {
    children: "Tertiary color heading",
    color: "tertiary",
  },
};

export const ColorInverse: Story = {
  args: {
    children: "Inverse color heading",
    color: "inverse",
  },
};

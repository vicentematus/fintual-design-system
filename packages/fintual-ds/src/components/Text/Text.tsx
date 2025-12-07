import type { StyleProp, TextStyle } from "react-native";
import { Text as RNText, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { typography } from "../../tokens";
import type { TextColor } from "../../tokens";

export interface TextProps {
  size?:
    | "text-xs"
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-xxl"
    | "text-xxxl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  children: React.ReactNode;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
}

export const Text = ({
  size = "text-md",
  weight = "regular",
  children,
  color,
  style,
}: TextProps) => {
  const theme = useTheme();
  const { text } = theme;
  const finalColor = color ? text[color] : text.primary;

  return (
    <RNText
      style={[
        styles.base,
        textStyles[size],
        weightStyles[weight],
        { color: finalColor },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fontFamily.regular,
  },
});

const textStyles = StyleSheet.create({
  "text-xxxl": {
    fontSize: typography.fontSize.xxxl,
    lineHeight: typography.fontSize.xxxl * typography.lineHeight.normal,
  },
  "text-xxl": {
    fontSize: typography.fontSize.xxl,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.normal,
  },
  "text-xl": {
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  "text-lg": {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  "text-md": {
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  "text-sm": {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  "text-xs": {
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
});

const weightStyles = StyleSheet.create({
  regular: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular,
  },
  medium: {
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
  },
  semibold: {
    fontWeight: typography.fontWeight.semibold,
  },
  bold: {
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
  },
});

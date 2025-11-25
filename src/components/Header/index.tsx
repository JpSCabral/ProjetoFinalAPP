import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING } from "@/constants/theme";

export function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top + SPACING.md }]}>
      <View style={styles.content}>
        <Text style={styles.logoText}>My diet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    zIndex: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text.inverted,
  },
  profileButton: {
    padding: SPACING.xs,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
});

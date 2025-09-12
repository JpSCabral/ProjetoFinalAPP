import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  color: string;
};

export function Button({ title, color, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

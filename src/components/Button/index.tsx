import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { IconName } from "@/helpers/iconNames";
import { Feather } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  title: string;
  color: string;
  icon: IconName;
};

export function Button({ title, color, icon, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      {...rest}
    >
      <Feather name={icon} size={24} color="#FFF" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

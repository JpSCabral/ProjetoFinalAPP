import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // ou seus SVGs
import { styles } from "./styles";
import Logo from "@/assets/logo.png";

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>My diet</Text>
        </View>
        <View>
          <Feather name="user" size={32} color="#000" />
        </View>
        {/* <Image
          source={{ uri: "https://caminho-para-sua-imagem.com/avatar.png" }}
          style={styles.avatar}
        /> */}
      </View>
    </View>
  );
}

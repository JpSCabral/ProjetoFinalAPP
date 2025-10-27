// src/screens/StatsScreen/index.tsx

import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export function StatsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>
          Gráficos e estatísticas aparecerão aqui em breve!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FBF9F6", // Fundo bege (mesmo do Perfil)
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
});

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. IMPORTE O TIPO DE NAVEGAÇÃO QUE CRIAMOS
import { AppTabNavigationProp } from "@/routes/app.routes"; // Ajuste o caminho

import { styles } from "./styles";

export function Header() {
  // 2. PEGUE O "PADDING" DO TOPO DA TELA (PARA A BARRA DE STATUS)
  const { top } = useSafeAreaInsets();

  // 3. PEGUE O CONTROLE DE NAVEGAÇÃO
  // Usamos o tipo da "Tab" (footer) porque queremos navegar entre as abas.
  const navigation = useNavigation<AppTabNavigationProp>();

  // 4. CRIE A FUNÇÃO DE NAVEGAÇÃO
  function handleNavigateToProfile() {
    // 'Profile' deve ser o nome exato da sua aba no app.routes.tsx
    navigation.navigate("EditProfile");
  }

  return (
    // 5. APLICAMOS O PADDING DO TOPO DINAMICAMENTE
    // Adicionamos +16 para um respiro extra.
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      {/* Texto com melhor contraste */}
      <Text style={styles.logoText}>My diet</Text>

      {/* Botão funcional com melhor contraste e área de clique */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={handleNavigateToProfile}
      >
        <Feather name="user" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

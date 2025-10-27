import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDiary } from "@/contexts/DiaryContext";
import { ProfileStackParamList } from "@/routes/profile.stack.routes"; // Ajuste o caminho
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
// 1. Tipagem da Navegação
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileDisplay"
>;

export function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { goal } = useDiary(); // Pega a meta do contexto

  // 2. Mock de dados (para o front-end)
  const [profile, setProfile] = useState({
    name: "Betty Carroten",
    age: 34,
    gender: "Female",
    currentWeight: 68,
    desiredWeight: 60,
    dietPlan: "N/A",
    bodyFat: 12,
    waist: 90,
    chest: 86,
  });

  const handleLogout = () => {
    /* ... sua lógica de logout ... */
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 3. Header com Botão de Editar */}
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editButton}
          >
            <Feather name="edit-2" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* 4. Card de Sumário do Perfil */}
        <View style={styles.card}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }} // Imagem de placeholder
            style={styles.avatar}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>
            {profile.gender}, {profile.age} anos
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso Atual</Text>
            <Text style={styles.infoValue}>{profile.currentWeight} kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso Desejado</Text>
            <Text style={styles.infoValue}>{profile.desiredWeight} kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Meta de Calorias</Text>
            <Text style={styles.infoValue}>{goal} kcal</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Plano de Dieta</Text>
            <Text style={styles.infoValue}>{profile.dietPlan}</Text>
          </View>
        </View>

        {/* 5. Card de Medidas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medidas</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gordura Corporal</Text>
            <Text style={styles.infoValue}>{profile.bodyFat}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cintura</Text>
            <Text style={styles.infoValue}>{profile.waist} cm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peito</Text>
            <Text style={styles.infoValue}>{profile.chest} cm</Text>
          </View>
        </View>

        {/* (Card de Estatísticas - Omitido como solicitado) */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={16} color="#E53E3E" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

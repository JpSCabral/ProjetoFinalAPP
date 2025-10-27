// src/screens/ProfileScreen/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons"; // Para o ícone de Sair
import { styles } from "./styles";

// 1. IMPORTE O CONTEXTO
import { useDiary } from "@/contexts/DiaryContext"; // Ajuste o caminho

export function EditProfile() {
  // 2. PEGUE A META ATUAL E A FUNÇÃO DE ATUALIZAÇÃO DO CONTEXTO
  const { goal: contextGoal, setGoal: setContextGoal } = useDiary();

  // 3. CRIE ESTADOS LOCAIS PARA OS CAMPOS DO FORMULÁRIO
  // Usamos dados fictícios para o front-end
  const [name, setName] = useState("Usuário Teste");
  const [email, setEmail] = useState("usuario@teste.com");

  // O input precisa de 'string', mas o contexto usa 'number'
  const [localGoal, setLocalGoal] = useState(String(contextGoal));

  // 4. FUNÇÃO DE SALVAR (ENGATILHADA PARA O BACK-END)
  const handleUpdateProfile = () => {
    // Converte a meta de volta para número
    const newGoal = parseInt(localGoal, 10);

    // Validação simples
    if (isNaN(newGoal) || newGoal <= 0) {
      Alert.alert("Erro", "Por favor, insira uma meta de calorias válida.");
      return;
    }

    // 5. ATUALIZA O CONTEXTO GLOBAL
    setContextGoal(newGoal);

    // 6. SIMULA A CHAMADA PARA O BACK-END
    console.log("--- ENVIANDO PARA O BACK-END (Simulação) ---");
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Nova Meta:", newGoal);
    console.log("-------------------------------------------");

    Alert.alert("Sucesso", "Perfil atualizado!");
  };

  // 7. FUNÇÃO DE LOGOUT (PLACEHOLDER)
  const handleLogout = () => {
    console.log("Usuário clicou em Sair");
    // Aqui você chamaria seu contexto de autenticação (setIsAuthenticated(false))
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Meu Perfil</Text>

        {/* --- FORMULÁRIO --- */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false} // Emails geralmente não são editáveis
            style={[styles.input, styles.inputDisabled]}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Meta de Calorias Diária (kcal)</Text>
          <TextInput
            style={styles.input}
            value={localGoal}
            onChangeText={setLocalGoal}
            keyboardType="numeric"
            placeholder="Ex: 1800"
          />
        </View>

        {/* --- BOTÕES --- */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={16} color="#E53E3E" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

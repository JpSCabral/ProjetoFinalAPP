import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, FloppyDisk } from "phosphor-react-native";
import { COLORS, SPACING } from "@/constants/theme";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("Usuário Exemplo");
  const [email, setEmail] = useState("usuario@email.com");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("25");

  const handleSave = () => {
    Alert.alert("Sucesso", "Perfil atualizado!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar Grande */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <User size={60} color={COLORS.primary} weight="duotone" />
        </View>
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>Alterar foto</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={email}
          editable={false}
        />

        {/* Dados Corporais em Grid */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <FloppyDisk size={24} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  changePhotoText: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
  form: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputDisabled: {
    backgroundColor: "#E5E5E5",
    color: COLORS.text.light,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  EnvelopeIcon,
  LockIcon,
  ArrowLeftIcon,
} from "phosphor-react-native";

// Usando suas cores padrão
import { COLORS, SPACING } from "@/constants/theme";

export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    if (password.length < 6) {
      return Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
    }

    Alert.alert("Sucesso", "Conta criada com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.replace("AppTabs"),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Comece sua jornada saudável hoje!</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Nome */}
          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.inputContainer}>
            <UserIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Maria Silva"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <EnvelopeIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirmar Senha */}
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        {/* Botão de Ação */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Link Login */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: 60, // Espaço para status bar
  },
  backButton: {
    marginBottom: SPACING.lg,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary, // Verde escuro
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  button: {
    backgroundColor: COLORS.secondary, // Verde vibrante
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});

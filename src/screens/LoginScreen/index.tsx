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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EnvelopeIcon, LockIcon, ArrowLeftIcon } from "phosphor-react-native";
import { signUp } from "@/api/supabase";

import { COLORS, SPACING } from "@/constants/theme";
type Props = {
  onLogin?: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const navigation = useNavigation<any>();

  // Estados
  const [isLoading, setIsLoading] = useState(false); // Para simular o carregamento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handlePasswordChange = (password: string) => {
    setPassword(password);

    if (password.length > 0 && password.length < 8) {
      setPasswordErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      setIsPasswordValid(false);
    } else {
      setPasswordErrorMessage("");
      setIsPasswordValid(true);
    }
  };

  const handleEmailChange = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(email);
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      setIsValidEmail(false);
    } else {
      setErrorMessage("");
      setIsValidEmail(true);
    }
  };

  async function handleSignIn() {
    if (!isValidEmail || !isPasswordValid) return;

    try {
      const result = await signUp(email, password);

      if (result.error) {
        console.error("Erro no cadastro:", result.error.message);
        setErrorMessage(
          result.error.message || "Erro desconhecido ao cadastrar."
        );
      } else {
        console.log("Cadastro bem-sucedido:", result.email);
        onLogin?.(); // proceed to next screen
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      setErrorMessage("Erro inesperado ao cadastrar.");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Botão Voltar (Opcional, caso venha da InitialScreen) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Entre para continuar sua dieta.</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Campo E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <EnvelopeIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              placeholderTextColor={COLORS.text.light}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text.light} />
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor={COLORS.text.light}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Esqueci minha senha */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={isLoading} // Desabilita enquanto carrega
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Rodapé: Link para Cadastro */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.link}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Fundo Bege (#F5F5F4)
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: 60,
    flexGrow: 1,
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
    color: COLORS.primary, // Verde Escuro (#3F6212)
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
    backgroundColor: COLORS.card, // Branco
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 12,
  },
  forgotPasswordText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.primary, // Verde Escuro (Botão Principal)
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    // Sombra
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  link: {
    color: COLORS.secondary, // Verde Vibrante para links
    fontWeight: "bold",
    fontSize: 14,
  },
});

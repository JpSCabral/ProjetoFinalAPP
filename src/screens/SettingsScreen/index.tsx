import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  BellIcon,
  MoonIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  SignOutIcon,
  CertificateIcon,
} from "phosphor-react-native";
import { COLORS, SPACING } from "@/constants/theme";
import { SettingItem } from "@/components/SettingItem";
import { useNavigation } from "@react-navigation/native";
export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);
  const [notify, setNotify] = useState(true);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- PERFIL --- */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <UserIcon size={40} color={COLORS.primary} weight="duotone" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Usuário Exemplo</Text>
            <Text style={styles.profileEmail}>usuario@email.com</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.editLink}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SEÇÃO: METAS --- */}
        <Text style={styles.sectionTitle}>MINHAS METAS</Text>
        <View style={styles.sectionGroup}>
          <SettingItem
            icon={CalculatorIcon}
            title="Recalcular Calorias"
            subtitle="Atualizar peso e altura"
            onPress={() => navigation.navigate("Calculator")}
          />
        </View>

        {/* --- SEÇÃO: PREFERÊNCIAS --- */}
        <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
        <View style={styles.sectionGroup}>
          <SettingItem
            icon={BellIcon}
            title="Notificações"
            hasSwitch
            switchValue={notify}
            onSwitchChange={setNotify}
          />
          <SettingItem
            icon={MoonIcon}
            title="Modo Escuro"
            hasSwitch
            switchValue={isDark}
            onSwitchChange={setIsDark}
          />
          <SettingItem
            icon={ShieldCheckIcon}
            title="Privacidade e Dados"
            onPress={() => console.log("Privacidade")}
          />
          <SettingItem
            icon={CertificateIcon}
            title="Area do nutricionista"
            onPress={() => navigation.navigate("CreateDiet")}
          />
        </View>

        {/* --- SEÇÃO: SAIR --- */}
        <View style={[styles.sectionGroup, { marginTop: SPACING.lg }]}>
          <SettingItem
            icon={SignOutIcon}
            title="Sair da conta"
            isDestructive
            onPress={() => console.log("Logout")}
          />
        </View>

        <Text style={styles.version}>Versão 1.0.0 (Beta)</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Card de Perfil
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: 20,
    marginBottom: SPACING.xl,
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight, // Fundo verde claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  editLink: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary, // Verde Vibrante
  },
  // Seções
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.text.secondary,
    marginLeft: SPACING.lg + 4,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionGroup: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    overflow: "hidden", // Para respeitar o border radius nos filhos
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  version: {
    textAlign: "center",
    color: COLORS.text.light,
    fontSize: 12,
    marginTop: SPACING.md,
  },
});

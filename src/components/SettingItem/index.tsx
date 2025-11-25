import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { CaretRight } from "phosphor-react-native";
import { COLORS, SPACING } from "@/constants/theme";

interface SettingItemProps {
  icon: React.ElementType; // Tipo para receber o componente do ícone
  title: string;
  subtitle?: string;
  onPress?: () => void;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDestructive?: boolean; // Para o botão de "Sair" ficar vermelho
}

export function SettingItem({
  icon: Icon,
  title,
  subtitle,
  onPress,
  hasSwitch,
  switchValue,
  onSwitchChange,
  isDestructive,
}: SettingItemProps) {
  // Definição de cores baseada no tipo (Destrutivo ou Normal)
  const iconColor = isDestructive ? COLORS.danger : COLORS.primary;
  const iconBg = isDestructive ? "#FEF2F2" : COLORS.primaryLight; // Vermelho claro ou Verde claro
  const textColor = isDestructive ? COLORS.danger : COLORS.text.primary;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={hasSwitch ? undefined : onPress} // Se tem switch, o clique é no switch, não na linha inteira
      activeOpacity={hasSwitch ? 1 : 0.7}
      disabled={hasSwitch}
    >
      {/* Ícone à Esquerda */}
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Icon size={22} color={iconColor} weight="fill" />
      </View>

      {/* Textos */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Ação à Direita (Switch ou Seta) */}
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#E5E7EB", true: COLORS.secondary }}
          thumbColor={"#FFF"}
        />
      ) : (
        <CaretRight size={20} color={COLORS.text.light} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    marginBottom: 1, // Cria uma linha separadora sutil se o fundo for cinza
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
});

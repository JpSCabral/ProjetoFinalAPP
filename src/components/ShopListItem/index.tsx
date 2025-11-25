import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckIcon } from "phosphor-react-native"; // Certifique-se de ter esses ícones
import { COLORS, SPACING } from "@/constants/theme";
import { ShoppingItem } from "@/types";

interface Props {
  item: ShoppingItem;
  onToggle: (id: string) => void;
}

const ShoppingListItem = ({ item, onToggle }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, item.isBought && styles.containerBought]}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      {/* Checkbox Customizado */}
      <View
        style={[
          styles.checkbox,
          item.isBought ? styles.checkboxActive : styles.checkboxInactive,
        ]}
      >
        {item.isBought ? (
          <CheckIcon size={16} color="#FFF" weight="bold" />
        ) : (
          <View /> // Vazio quando não marcado (ou pode usar Icone Circle)
        )}
      </View>

      {/* Textos */}
      <View style={styles.content}>
        <Text style={[styles.name, item.isBought && styles.textStrikethrough]}>
          {item.name}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      {/* Badge de Quantidade (Agora Verde!) */}
      <View style={styles.badge}>
        <Text
          style={[styles.badgeText, item.isBought && styles.badgeTextBought]}
        >
          {item.quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// O 'memo' evita re-renderizar itens que não mudaram
export default memo(ShoppingListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  containerBought: {
    backgroundColor: "#FAFAFA", // Fundo levemente mais cinza
    opacity: 0.8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  checkboxInactive: {
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: "transparent",
  },
  checkboxActive: {
    backgroundColor: COLORS.secondary, // Verde Vibrante
    borderWidth: 0,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  category: {
    fontSize: 12,
    color: COLORS.text.light,
    marginTop: 2,
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
    color: COLORS.text.light,
  },
  // O Badge agora usa as cores do tema
  badge: {
    backgroundColor: COLORS.primaryLight, // Fundo Verde Claro (#ECFCCB)
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: COLORS.primary, // Texto Verde Escuro (#3F6212)
    fontWeight: "bold",
    fontSize: 14,
  },
  badgeTextBought: {
    color: COLORS.text.light, // Fica cinza se comprado
  },
});

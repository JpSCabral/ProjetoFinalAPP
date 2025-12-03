import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING } from "@/constants/theme";
import { ShoppingItem } from "@/types";
import ShoppingListItem from "@/components/ShopListItem";

const MOCK_SHOPPING_LIST: ShoppingItem[] = [
  {
    id: "1",
    name: "Peito de Frango",
    quantity: "2kg",
    category: "Proteína",
    isBought: false,
  },
  {
    id: "2",
    name: "Ovos Grandes",
    quantity: "30 un",
    category: "Proteína",
    isBought: true,
  },
  {
    id: "3",
    name: "Arroz Integral",
    quantity: "1kg",
    category: "Carboidrato",
    isBought: false,
  },
  {
    id: "4",
    name: "Batata Doce",
    quantity: "2kg",
    category: "Carboidrato",
    isBought: false,
  },
  {
    id: "5",
    name: "Azeite de Oliva",
    quantity: "500ml",
    category: "Gordura",
    isBought: false,
  },
  {
    id: "6",
    name: "Brócolis",
    quantity: "2 un",
    category: "Vegetais",
    isBought: false,
  },
  {
    id: "7",
    name: "Whey Protein",
    quantity: "900g",
    category: "Suplemento",
    isBought: true,
  },
];

export default function ShopScreen() {
  const [items, setItems] = useState<ShoppingItem[]>(MOCK_SHOPPING_LIST);

  const handleToggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    );
  };

  const stats = useMemo(() => {
    const total = items.length;
    const bought = items.filter((i) => i.isBought).length;
    const percentage = total > 0 ? bought / total : 0;
    return { total, bought, percentage };
  }, [items]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header Fixo com Resumo */}
      <SafeAreaView edges={["top"]} style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Lista de Compras</Text>
          <Text style={styles.subtitle}>Baseado na sua dieta semanal</Text>

          {/* Barra de Progresso */}
          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${stats.percentage * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {stats.bought} de {stats.total} itens comprados
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Lista de Itens */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingListItem item={item} onToggle={handleToggleItem} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    backgroundColor: COLORS.card, // Header Branco
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  progressSection: {
    marginTop: SPACING.xs,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.background, // Fundo cinza da barra
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.secondary, // Verde Vibrante
    borderRadius: 3,
  },
  progressText: {
    textAlign: "right",
    fontSize: 12,
    color: COLORS.text.light,
    marginTop: 8,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.lg + 10,
  },
});

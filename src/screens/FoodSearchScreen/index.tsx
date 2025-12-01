import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  PlusCircleIcon,
  ArrowsLeftRightIcon,
  MagnifyingGlassIcon,
} from "phosphor-react-native";

// Contextos e Tipos
import { useDiary } from "@/contexts/DiaryContext";
import { FoodItem, MealType } from "@/types";
import { COLORS, SPACING } from "@/constants/theme";
import { searchFood } from "@/services/foodApi"; // Importando o serviço que criamos acima

interface RouteParams {
  mealType: MealType;
  date?: string;
  onSelect?: (food: FoodItem) => void;
  entryToReplaceId?: string;
}

export default function FoodSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;

  const { addEntry, replaceEntry } = useDiary();

  // Estados
  const [searchText, setSearchText] = useState("");
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Lógica de busca com "Debounce" (espera parar de digitar)
  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (timer) clearTimeout(timer); // Cancela busca anterior se ainda estiver digitando

    // Se limpar o texto, limpa a lista
    if (text.length === 0) {
      setFoods([]);
      return;
    }

    // Só busca se tiver mais de 2 letras
    if (text.length > 2) {
      setLoading(true); // Mostra loading visualmente instantâneo
      const newTimer = setTimeout(async () => {
        const results = await searchFood(text);
        setFoods(results);
        setLoading(false);
      }, 600); // Espera 600ms
      setTimer(newTimer);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    // 1. Caso Nutricionista (Criação de Dieta)
    if (params.onSelect) {
      params.onSelect(food);
      navigation.goBack();
      return;
    }

    // 2. Caso Usuário (Diário)
    if (params.date) {
      const newEntry = {
        id: Math.random().toString(),
        food: food,
        mealType: params.mealType,
        date: params.date,
      };

      // Decide se é Substituição ou Adição
      if (params.entryToReplaceId) {
        replaceEntry(params.entryToReplaceId, newEntry);
      } else {
        addEntry(newEntry);
      }

      navigation.goBack();
    }
  };

  const isReplacing = !!params.entryToReplaceId;

  return (
    <View style={styles.container}>
      {/* Aviso visual se estiver substituindo */}
      {isReplacing && (
        <View style={styles.replacingHeader}>
          <Text style={styles.replacingText}>
            Substituindo item na refeição: {params.mealType}
          </Text>
        </View>
      )}

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color={COLORS.text.secondary} />
        <TextInput
          placeholder="Busque ex: Arroz, Chocolate..."
          style={styles.searchInput}
          placeholderTextColor={COLORS.text.light}
          value={searchText}
          onChangeText={handleSearchChange}
          autoFocus
        />
      </View>

      {/* Conteúdo: Loading ou Lista */}
      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Buscando alimentos...</Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centerState}>
              <Text style={styles.emptyText}>
                {searchText.length > 0
                  ? "Nenhum alimento encontrado."
                  : "Digite algo para buscar online."}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemCard}
              onPress={() => handleSelectFood(item)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.unit}>
                  {item.unit} •{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {Math.round(item.calories)} kcal
                  </Text>
                </Text>

                {/* Exibe Macros se existirem */}
                <Text style={styles.macros}>
                  P: {Math.round(item.protein || 0)}g C:{" "}
                  {Math.round(item.carbs || 0)}g G: {Math.round(item.fats || 0)}
                  g
                </Text>
              </View>

              {/* Ícone muda dependendo da ação */}
              {isReplacing ? (
                <ArrowsLeftRightIcon
                  size={28}
                  color={COLORS.danger}
                  weight="bold"
                />
              ) : (
                <PlusCircleIcon
                  size={28}
                  color={COLORS.secondary}
                  weight="fill"
                />
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },

  replacingHeader: {
    backgroundColor: "#FEF3C7",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  replacingText: { color: "#D97706", fontWeight: "bold", fontSize: 12 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text.primary,
    height: "100%",
  },

  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    width: "90%",
  },
  unit: { fontSize: 14, color: COLORS.text.secondary, marginTop: 2 },
  macros: { fontSize: 12, color: COLORS.text.light, marginTop: 2 },

  centerState: { alignItems: "center", marginTop: 40 },
  loadingText: { color: COLORS.text.secondary, marginTop: 10 },
  emptyText: { color: COLORS.text.light, fontSize: 16 },
});

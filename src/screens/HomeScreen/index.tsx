import React, { useState, useMemo } from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Imports dos Componentes
import { Header } from "@/components/Header";
import { CalorieSummary } from "@/components/CalorieSummary";
import { MealCard } from "@/components/MealCard";
import { DateNavigator } from "@/components/DateNavigator";

// Imports dos Ícones
import {
  CoffeeIcon,
  ForkKnifeIcon,
  AppleLogoIcon,
} from "phosphor-react-native";

// Imports de Navegação e Contexto
import { HomeStackParamList } from "../../routes/home.stack.routes"; // Ajuste o caminho
import { useDiary } from "@/contexts/DiaryContext";
import { MealType, DiaryEntry } from "@/types/foods";

import { styles } from "./styles";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Estados
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [currentDateLabel, setCurrentDateLabel] = useState("Segunda-feira");

  // Contexto
  const { entries, goal } = useDiary();

  // --- CÁLCULOS DINÂMICOS ---

  // Calcula totais para os MealCards e CalorieSummary
  const caloriesByMeal = useMemo(() => {
    const totals: Record<MealType, number> = {
      "Café da manha": 0,
      Almoço: 0,
      Lanche: 0,
      Jantar: 0,
    };
    entries.forEach((entry) => {
      totals[entry.mealType] += entry.food.calories;
    });
    return totals;
  }, [entries]);

  const totalConsumed = Object.values(caloriesByMeal).reduce(
    (sum, cals) => sum + cals,
    0
  );

  // 2. [NOVA LÓGICA] FILTRAR ALIMENTOS PARA O MODAL
  const foodsForSelectedMeal = useMemo(() => {
    if (!selectedMeal) {
      return []; // Nenhuma refeição selecionada, modal fechado
    }
    // Retorna apenas as entradas que correspondem à refeição selecionada
    return entries.filter((entry) => entry.mealType === selectedMeal);
  }, [entries, selectedMeal]); // Recalcula se as entradas ou a refeição mudarem

  // --- HANDLERS ---

  const handleAddFood = (mealType: MealType) => {
    navigation.navigate("FoodSearch", { mealType: mealType });
  };

  const handleShowDetails = (mealType: MealType) => {
    setSelectedMeal(mealType);
    setIsModalVisible(true);
  };

  const handleNavigateFromModal = () => {
    if (selectedMeal) {
      setIsModalVisible(false);
      navigation.navigate("FoodSearch", { mealType: selectedMeal });
    }
  };

  // 1. [NOVO HANDLER] Para clicar em um item no modal
  const handleSubstituteItem = (entry: DiaryEntry) => {
    console.log("Substituindo item:", entry.id);
    setIsModalVisible(false); // Fecha o modal

    // Navega para a FoodSearch, passando o ID do item a ser substituído
    navigation.navigate("FoodSearch", {
      mealType: entry.mealType,
      entryToReplaceId: entry.id, // <-- A nova informação
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // ... (handlers de data) ...
  const handlePreviousDay = () => {
    setCurrentDateLabel("Domingo");
  };
  const handleNextDay = () => {
    setCurrentDateLabel("Terça-feira");
  };

  // --- RENDERIZAÇÃO ---

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <CalorieSummary consumed={totalConsumed} goal={goal} />

        <DateNavigator
          currentDateLabel={currentDateLabel}
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
        />

        {/* Cards de Refeição */}
        <View>
          <MealCard
            mealName="Café da manha"
            calories={caloriesByMeal["Café da manha"]}
            icon={<CoffeeIcon />}
            onAddPress={() => handleAddFood("Café da manha")}
            onDetailPress={() => handleShowDetails("Café da manha")}
          />
          {/* ... outros MealCards ... */}
          <MealCard
            mealName="Almoço"
            calories={caloriesByMeal["Almoço"]}
            icon={<ForkKnifeIcon />}
            onAddPress={() => handleAddFood("Almoço")}
            onDetailPress={() => handleShowDetails("Almoço")}
          />
          <MealCard
            mealName="Lanche"
            calories={caloriesByMeal["Lanche"]}
            icon={<AppleLogoIcon />}
            onAddPress={() => handleAddFood("Lanche")}
            onDetailPress={() => handleShowDetails("Lanche")}
          />
          <MealCard
            mealName="Jantar"
            calories={caloriesByMeal["Jantar"]}
            icon={<ForkKnifeIcon />}
            onAddPress={() => handleAddFood("Jantar")}
            onDetailPress={() => handleShowDetails("Jantar")}
          />
        </View>
      </ScrollView>

      {/* 3. [MODAL ATUALIZADO] --- */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.centeredView} onPress={toggleModal}>
          <Pressable style={styles.modalView} onPress={() => {}}>
            <Text style={styles.modalTitle}>{selectedMeal}</Text>

            {foodsForSelectedMeal.length > 0 ? (
              <FlatList
                data={foodsForSelectedMeal}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  // 2. FAÇA O ITEM SER CLICÁVEL
                  <TouchableOpacity onPress={() => handleSubstituteItem(item)}>
                    <View style={styles.foodItemInModal}>
                      <View>
                        <Text style={styles.foodNameModal}>
                          {item.food.name}
                        </Text>
                        <Text style={styles.foodUnitModal}>
                          {item.food.unit}
                        </Text>
                      </View>
                      <Text style={styles.foodCaloriesModal}>
                        {item.food.calories} kcal
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={{ width: "100%" }}
              />
            ) : (
              <Text style={styles.emptyModalText}>
                Nenhum alimento adicionado.
              </Text>
            )}

            {/* Este botão agora funciona apenas para ADICIONAR */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleNavigateFromModal} // (Chama handleAddFood)
            >
              <Text style={styles.modalButtonText}>Adicionar Alimento</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

/*
--- 5. NOVOS ESTILOS (para seu arquivo ./styles.ts) ---

Adicione estes estilos ao seu StyleSheet para formatar a lista no modal:

... (seus estilos existentes: modalView, modalTitle, etc.)

 
...
*/

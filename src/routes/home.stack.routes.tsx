import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Imports das Telas
import HomeScreen from "@/screens/HomeScreen";
import FoodSearchScreen from "@/screens/FoodSearchScreen";
import { MealType } from "@/types";

// Tipagem dos parâmetros (Isso ajuda o TypeScript nas telas)
export type HomeStackParamList = {
  Home: undefined;
  FoodSearch: {
    mealType: MealType;
    date: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tela Principal */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Tela de Busca (Com Header padrão para ter o botão 'Voltar') */}
      <Stack.Screen
        name="FoodSearch"
        component={FoodSearchScreen}
        options={{
          headerShown: true,
          title: "Adicionar Alimento",
          headerTintColor: "#3F6212", // Verde escuro no botão voltar
          headerTitleStyle: { color: "#1C1917" },
        }}
      />
    </Stack.Navigator>
  );
}

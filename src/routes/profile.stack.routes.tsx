import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Imports Reais
import SettingsScreen from "@/screens/SettingsScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import CalculatorScreen from "@/screens/CalculatorScreen";
import CreateDietScreen from "@/screens/CreateDietScreen";
import FoodSearchScreen from "@/screens/FoodSearchScreen";
import { MealType, FoodItem } from "@/types";

export type ProfileStackParamList = {
  Settings: undefined;
  EditProfile: undefined;
  Calculator: undefined;
  CreateDiet: undefined;
  FoodSearch: {
    mealType: MealType;
    date?: string;
    onSelect?: (food: FoodItem) => void;
  };
};
const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          title: "Editar Perfil",
          headerTintColor: "#3F6212",
        }}
      />

      <Stack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          headerShown: true,
          title: "Calculadora",
          headerTintColor: "#3F6212",
        }}
      />

      <Stack.Screen
        name="CreateDiet"
        component={CreateDietScreen}
        options={{
          headerShown: true,
          title: "Prescrever Dieta",
          headerTintColor: "#3F6212",
        }}
      />

      {/* 3. REGISTRE A TELA AQUI DENTRO TAMBÉM */}
      <Stack.Screen
        name="FoodSearch"
        component={FoodSearchScreen}
        options={{
          headerShown: true,
          title: "Selecionar Alimento",
          headerTintColor: "#3F6212",
        }}
      />
    </Stack.Navigator>
  );
}

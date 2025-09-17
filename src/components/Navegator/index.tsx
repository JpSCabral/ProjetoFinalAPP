// src/navigation/AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
// import { HomeScreen } from "../screens/HomeScreen";
// import { RecipesScreen } from "../screens/RecipesScreen";
// Importe suas outras telas e ícones

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Para usar seu próprio Header customizado nas telas
        tabBarActiveTintColor: "#E85D5D", // Cor do ícone/texto ativo
        tabBarInactiveTintColor: "gray", // Cor do ícone/texto inativo
        tabBarStyle: { height: 60, paddingBottom: 10 }, // Estilo da barra
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          // Aqui você pode customizar o botão "Add" para ser diferente
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: "#E85D5D",
                padding: 15,
                borderRadius: 30,
                bottom: 20,
              }}
            >
              <Feather name="plus" color="white" size={size} />
            </View>
          ),
          tabBarLabel: "", // Esconder o texto "Add"
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          ),
        }}
      />
      {/* ...outras telas como "Plans" */}
    </Tab.Navigator>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Importe a Tela Inicial e as Rotas do App
import InitialScreen from "@/screens/InitialScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import LoginScreen from "@/screens/LoginScreen";
import { AppRoutes } from "./app.routes";

const Stack = createNativeStackNavigator();

export function RootRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1. Primeira tela a aparecer: Initial */}
        <Stack.Screen name="Initial" component={InitialScreen} />

        {/* Tela de Cadastro */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Tela de Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 2. O App Principal (Tabs) */}
        <Stack.Screen name="AppTabs" component={AppRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

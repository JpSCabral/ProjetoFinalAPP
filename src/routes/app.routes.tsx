import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  HouseIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  UserIcon,
} from "phosphor-react-native";

// Imports das Rotas e Telas
import { HomeRoutes } from "./home.stack.routes"; // Importa a Stack, não a tela!
import { ProfileRoutes } from "./profile.stack.routes"; // Importa a Stack!
import ShopScreen from "@/screens/ShopScreen";
import ProgressScreen from "@/screens/ProgressScreen";

import { COLORS } from "@/constants/theme";

// Tipagem para uso no useNavigation
export type AppTabParamList = {
  HomeTab: undefined;
  Shop: undefined;
  Progress: undefined;
  ProfileTab: undefined;
};

export type AppTabNavigationProp = BottomTabNavigationProp<AppTabParamList>;

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // O Header é controlado por cada tela
        tabBarShowLabel: false, // Design minimalista sem texto (opcional)
        tabBarActiveTintColor: COLORS.primary, // Verde Ativo
        tabBarInactiveTintColor: COLORS.text.light, // Cinza Inativo
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopWidth: 0, // Remove linha feia no topo
          height: Platform.OS === "android" ? 60 : 80, // Altura confortável
          paddingBottom: Platform.OS === "android" ? 10 : 30,
          // Sombra suave
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
        },
      }}
    >
      {/* 1. HOME (Usa a Stack para permitir navegação interna) */}
      <Tab.Screen
        name="HomeTab"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HouseIcon
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      {/* 2. SHOP (Tela direta) */}
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingCartIcon
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      {/* 3. ESTATÍSTICAS (Tela direta) */}
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ChartBarIcon
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      {/* 4. PERFIL (Usa a Stack) */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

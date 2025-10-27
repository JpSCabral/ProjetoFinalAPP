// src/routes/profile.stack.routes.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileScreen } from "@/screens/ProfileScreen"; // A nova tela (visual)
import { EditProfile } from "@/screens/EditProfileScreen"; // A nova tela (formulário)

// 1. Defina os tipos de parâmetros
export type ProfileStackParamList = {
  ProfileDisplay: undefined; // Tela principal de visualização
  EditProfile: undefined; // Tela de edição
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfileDisplay"
    >
      <Stack.Screen name="ProfileDisplay" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

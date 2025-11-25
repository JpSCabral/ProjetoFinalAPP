import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signUp } from "@/api/supabase";

// Importe o Contexto
import { DiaryProvider } from "@/contexts/DiaryContext";

// --- IMPORTAÇÕES DAS TELAS ---
import InitialScreen from "@/screens/InitialScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import LoginScreen from "@/screens/LoginScreen";
import { AppRoutes } from "@/routes/app.routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DiaryProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Tela Inicial (Com a imagem de fundo) */}
            <Stack.Screen name="Initial" component={InitialScreen} />

            {/* --- 2. REGISTRE A TELA DE CADASTRO AQUI --- */}
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            <Stack.Screen name="Login" component={LoginScreen} />

            {/* O App Principal (Tabs) */}
            <Stack.Screen name="AppTabs" component={AppRoutes} />
          </Stack.Navigator>
        </DiaryProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens/HomeScreen";
import { FoodSearchScreen } from "@/screens/FoodSearchScreen";

export type HomeStackParamList = {
  Home: undefined;
  FoodSearch: {
    mealType: string;
    entryToReplaceId?: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FoodSearch" component={FoodSearchScreen} />
    </Stack.Navigator>
  );
}

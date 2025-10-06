import React from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import HomeScreen from "@/screens/HomeScreen";
// import DetailsScreen from "./DetailsScreen";
import LoginScreen from "@/screens/LoginScreen";
import InitialScreen from "@/screens/InitialScreen";

// Define the type for your stack's params
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Login: undefined;
  Initial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const prefix = Linking.createURL("/");

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        Details: "details",
        Login: "login",
        Initial: "initial",
      },
    },
  };

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Initial" component={InitialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

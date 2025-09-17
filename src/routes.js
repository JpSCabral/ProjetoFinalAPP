// src/routes.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import HomeScreen from "@/screens/HomeScreen";
// import DetailsScreen from "./DetailsScreen";
import LoginScreen from "@/screens/LoginScreen";

const prefix = Linking.createURL("/"); // Cria a URL base (ex: http://localhost:19006/)
const Stack = createNativeStackNavigator();

function Routes() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        Details: "details",
        Login: "login",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

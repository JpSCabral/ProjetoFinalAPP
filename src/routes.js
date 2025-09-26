import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import HomeScreen from "@/screens/HomeScreen";
// import DetailsScreen from "./DetailsScreen";
import LoginScreen from "@/screens/LoginScreen";
import InitialScreen from "@/screens/InitialScreen";

const prefix = Linking.createURL("/");
const Stack = createNativeStackNavigator();

function Routes() {
  const linking = {
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

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Initial" component={InitialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

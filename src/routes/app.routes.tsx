// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as Linking from "expo-linking";

// import HomeScreen from "@/screens/HomeScreen";
// // import DetailsScreen from "./DetailsScreen";
// import LoginScreen from "@/screens/LoginScreen";
// import InitialScreen from "@/screens/InitialScreen";

// const prefix = Linking.createURL("/");
// const Stack = createNativeStackNavigator();

// function AppRoutes() {
//   const linking = {
//     prefixes: [prefix],
//     config: {
//       screens: {
//         Home: "home",
//         Details: "details",
//         Login: "login",
//         Initial: "initial",
//       },
//     },
//   };

//   return (
//     <NavigationContainer linking={linking}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Initial" component={InitialScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppRoutes;

// Em src/routes/app.routes.tsx----------------------------------------------------------------

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { HomeScreen } from "@/screens/HomeScreen";
import { ProfileScreen } from "@/screens/Profile"
// import { ProfileScreen } from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="user" color={color} size={size} />
                ),
              }}
            />
    </Tab.Navigator>
  );
}

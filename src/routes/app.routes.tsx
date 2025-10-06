import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { HomeScreen } from "@/screens/HomeScreen";
import { ShopList } from "@/screens/ShopList"
import { ProfileScreen } from "@/screens/Profile"
// import { ProfileScreen } from "@/screens/ProfileScreen";
import { AddMealRoutes } from "./addMeal.stack.routes";

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
            <Tab.Screen
              name="ShopList"
              component={ShopList}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="box" color={color} size={size} />
                ),
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Adicionar"
        component={AddMealRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

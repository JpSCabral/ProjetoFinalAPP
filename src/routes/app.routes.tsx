import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

// Pilhas de navegação
import { HomeRoutes } from "./home.stack.routes";
import { ProfileRoutes } from "./profile.stack.routes";

// Telas de aba "únicas"
import { ShopList } from "@/screens/ShopList";
import { StatsScreen } from "@/screens/StatsScreen"; // (Tela nova para "Progresso")

export type AppTabParamList = {
  Home: undefined;
  Profile: undefined;
  ShopList: undefined;
  Adicionar: undefined;
  EditProfile: undefined;
  Stats: undefined;
  // Adicione as outras abas...
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export type AppTabNavigationProp = BottomTabNavigationProp<AppTabParamList>;
export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingTop: 12, // Dê um padding superior
          paddingBottom: 12, // E inferior
          backgroundColor: "#4C763B",
        },
        tabBarActiveTintColor: "#FFFFFF", // Ícone ativo fica BRANCO
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)", // Inativo fica Branco 50%
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileRoutes}
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
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="box" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

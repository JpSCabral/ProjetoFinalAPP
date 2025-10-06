import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

import AddMeal from "@/screens/AddMeal";
import LogMeal from "@/screens/LogMeal";

export type AddMealStackNavigatorParamList = {
  add: undefined; // 'undefined' significa que a rota não precisa de parâmetros
  log: undefined;
};

const { Navigator, Screen } = createStackNavigator();

export function AddMealRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="add" component={AddMeal} />
      <Screen name="log" component={LogMeal} />
    </Navigator>
  );
}
export type AddMealScreenNavigationProp =
  StackNavigationProp<AddMealStackNavigatorParamList>;

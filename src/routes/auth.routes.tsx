// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";

function SignUpScreen() {
  // ... sua UI de Cadastro
  return null;
}

type AuthRoutesProps = {
  onLogin: () => void;
};

const Stack = createNativeStackNavigator();

export function AuthRoutes({ onLogin }: AuthRoutesProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn">
        {() => <LoginScreen onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

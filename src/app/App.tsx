import "react-native-gesture-handler";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DiaryProvider } from "@/contexts/DiaryContext";

import { AppRoutes } from "@/routes/app.routes";
import { AuthRoutes } from "@/routes/auth.routes";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    setIsAuthenticated(true);
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DiaryProvider>
          <AppRoutes />
        </DiaryProvider>
      ) : (
        <AuthRoutes onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}

// src/navigation/index.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GymkhanasScreen from "../screens/GymkhanasScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Gymkhanas" component={GymkhanasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

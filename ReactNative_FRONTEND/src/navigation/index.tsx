import * as React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import GymkhanaList from "@/screens/GymkhanaList";
import GymkhanaDetail from "@/screens/GymkhanaDetail";
import GymkhanaForm from "@/screens/GymkhanaForm";

export type RootStackParamList = {
  List: undefined;
  Detail: { id: number };
  Form: { id?: number } | undefined;
};

const Stack =
  Platform.OS === "web"
    ? createStackNavigator<RootStackParamList>() // 👈 Web
    : createNativeStackNavigator<RootStackParamList>(); // 👈 iOS/Android

const linking =
  Platform.OS === "web"
    ? {
        prefixes: [window.location.origin + "/"],
        config: {
          screens: { List: "", Detail: "gymkhana/:id", Form: "form/:id?" },
        },
      }
    : undefined;

export default function RootNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={GymkhanaList}
          options={{ title: "Gymkhanas" }}
        />
        <Stack.Screen
          name="Detail"
          component={GymkhanaDetail}
          options={{ title: "Detalle" }}
        />
        <Stack.Screen
          name="Form"
          component={GymkhanaForm}
          options={{ title: "Nueva / Editar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

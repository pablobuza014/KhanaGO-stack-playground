import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import RootNavigator from "@/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text
          testID="boot-flag"
          style={{ position: "absolute", top: 6, left: 8, opacity: 0.6 }}
        >
          App loaded
        </Text>
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

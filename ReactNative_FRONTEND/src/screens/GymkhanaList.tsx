import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Gymkhana } from "@/types";
import { GymkhanaAPI } from "@/api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function GymkhanaList({ navigation }: Props) {
  const [items, setItems] = React.useState<Gymkhana[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [q, setQ] = React.useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await GymkhanaAPI.list({ q, skip: 0, limit: 50 });
      setItems(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          placeholder="Buscar por nombre o ubicación"
          value={q}
          onChangeText={setQ}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={load}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => String(it.id)}
          onRefresh={load}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Detail", { id: item.id })}
            >
              <Text style={styles.title}>{item.name}</Text>
              {item.location ? (
                <Text style={styles.subtitle}>{item.location}</Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.btn, { marginTop: 8 }]}
        onPress={() => navigation.navigate("Form")}
      >
        <Text style={styles.btnText}>Nueva gymkhana</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  row: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  btn: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "600" },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "700" },
  subtitle: { color: "#6b7280" },
});

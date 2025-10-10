import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Gymkhana } from "@/types";
import { GymkhanaAPI } from "@/api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function GymkhanaDetail({ route, navigation }: Props) {
  const { id } = route.params;
  const [item, setItem] = React.useState<Gymkhana | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await GymkhanaAPI.get(id);
      setItem(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (!item) return <Text style={{ padding: 16 }}>No encontrado</Text>;

  const onDelete = async () => {
    Alert.alert("Eliminar", "¿Seguro que quieres eliminarla?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await GymkhanaAPI.remove(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      {item.description ? (
        <Text style={styles.text}>{item.description}</Text>
      ) : null}
      {item.location ? (
        <Text style={styles.text}>📍 {item.location}</Text>
      ) : null}

      <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Form", { id })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#991b1b" }]}
          onPress={onDelete}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 22, fontWeight: "800" },
  text: { fontSize: 16, color: "#374151" },
  btn: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "600" },
});

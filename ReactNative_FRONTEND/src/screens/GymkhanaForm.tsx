import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { GymkhanaAPI } from "@/api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Form">;

export default function GymkhanaForm({ route, navigation }: Props) {
  const editingId = route.params?.id;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    if (editingId) {
      GymkhanaAPI.get(editingId).then((d) => {
        setName(d.name ?? "");
        setDescription(d.description ?? "");
        setLocation(d.location ?? "");
      });
    }
  }, [editingId]);

  const submit = async () => {
    if (!name.trim()) {
      Alert.alert("Nombre requerido");
      return;
    }
    const payload = { name, description, location };
    if (editingId) {
      await GymkhanaAPI.update(editingId, payload);
    } else {
      await GymkhanaAPI.create(payload);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Ubicación"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={styles.btnText}>{editingId ? "Guardar" : "Crear"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  input: {
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
});

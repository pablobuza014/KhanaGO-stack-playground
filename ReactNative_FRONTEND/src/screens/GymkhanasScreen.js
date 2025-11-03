// src/screens/GymkhanasScreen.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { GymkhanaAPI } from "../api/client";

const INDIGO = "#3F51B5";
const DIV = "#E5E7EB";

const Field = ({ label, value, onChangeText, placeholder }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.fieldInput}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

export default function GymkhanasScreen() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [editing, setEditing] = React.useState(null);

  // LOAD
  const load = async () => {
    setLoading(true);
    try {
      const data = await GymkhanaAPI.list();
      setItems(data);
    } catch (e) {
      console.warn("Error cargando:", e?.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setEditing(null);
  };

  // SUBMIT
  const submit = async () => {
    const n = name.trim();
    const d = description.trim();
    const l = location.trim();
    if (!n) return;
    const payload = {
      name: n,
      description: d || null,
      location: l || null,
    };
    try {
      if (editing) {
        await GymkhanaAPI.update(editing.id, payload);
      } else {
        await GymkhanaAPI.create(payload);
      }
      resetForm();
      load();
    } catch (e) {
      Alert.alert("Error", e?.message || "No se pudo guardar");
    }
  };

  // UPDATE
  const startEdit = (g) => {
    setName(g.name || "");
    setDescription(g.description || "");
    setLocation(g.location || "");
    setEditing(g);
  };

// DELETE
const deleteItem = async (g) => {

    try {
        await GymkhanaAPI.delete(g.id);
        if (editing && editing.id === g.id) resetForm();
    } catch(e) {
        console.log("Error al eliminar: " + e);
    }
    load();
};


  const renderItem = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.leading}>#{item.id}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          {item.location || item.description || "—"}
        </Text>
      </View>
      <View style={styles.trailing}>
        <TouchableOpacity onPress={() => startEdit(item)} style={styles.iconBtn}>
          <MaterialIcons name="edit" size={22} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item)} style={styles.iconBtn}>
          <MaterialIcons name="delete" size={22} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const isEditing = !!editing;

  return (
    <View style={styles.root}>
      {/* NAVBAR */}
      <View style={styles.appbar}>
        <Text style={styles.appbarTitle}>Gymkhanas</Text>
        <TouchableOpacity onPress={load} style={styles.appbarBtn}>
          <MaterialIcons name="refresh" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Field
          label="Nombre *"
          value={name}
          onChangeText={setName}
          placeholder="Nombre *"
        />
        <Field
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
        />
        <Field
          label="Ubicación"
          value={location}
          onChangeText={setLocation}
          placeholder="Ubicación"
        />
        <View style={styles.formRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={submit}>
            <Text style={styles.primaryTxt}>
              {isEditing ? "Guardar cambios" : "Crear"}
            </Text>
          </TouchableOpacity>
          {isEditing ? (
            <TouchableOpacity onPress={resetForm}>
              <Text style={styles.cancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.divider} />

      {/* LIST */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : items.length === 0 ? (
          <View style={styles.center}>
            <Text style={{ color: "#6B7280" }}>Sin registros</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => String(it.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  appbar: {
    height: 56,
    backgroundColor: INDIGO,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  appbarTitle: { color: "white", fontSize: 20, fontWeight: "600" },
  appbarBtn: { padding: 4 },
  form: { padding: 12, backgroundColor: "#FFFFFF" },
  fieldLabel: { fontSize: 13, color: "#374151", marginBottom: 2 },
  fieldInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    height: 36,
    fontSize: 14,
  },
  formRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: INDIGO,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTxt: { color: "white", fontWeight: "600" },
  cancelTxt: { marginLeft: 10, color: INDIGO, fontWeight: "500" },
  divider: { height: 1, backgroundColor: DIV },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  tile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  leading: { marginRight: 12, color: "#4B5563" },
  title: { fontSize: 15, fontWeight: "500", color: "#111827" },
  subtitle: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  trailing: {
    flexDirection: "row",
    marginLeft: 8,
  },
  iconBtn: { padding: 4 },
  separator: { height: 1, backgroundColor: DIV },
});

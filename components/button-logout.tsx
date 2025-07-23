import { COLORS } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export function ButtonLogout() {
  const { signOut } = useAuth();
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Logout", "Você foi desconectado com sucesso.");
      navigate.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Erro", "Não foi possível desconectar.");
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={24} color="#fff" />
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
   logoutButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
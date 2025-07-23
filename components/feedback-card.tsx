import { COLORS } from "@/constants/theme";
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface FeedbackCardProps {
  id: string;
  message: string;
  rating: number;
  userName: string;
  createdAt: string;
}

export function FeedbackCard({
  message,
  createdAt,
  userName,
  rating,
  id,
}: FeedbackCardProps) {
  const { removeFeedback } = useFeedbacks();
  const handleDelete = (id: string) => {
    Alert.alert("Remover feedback", "Deseja realmente remover este feedback?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          await removeFeedback(id);
        },
      },
    ]);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{userName}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.date}>{new Date(createdAt).toLocaleString()}</Text>
      <Text style={styles.rating}>Nota: {rating}/5</Text>
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={18} color="#fff" />
        <Text style={styles.deleteButtonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  username: {
    fontWeight: "600",
    marginBottom: 4,
  },
  rating: {
    color: COLORS.stars,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  deleteButton: {
    width: 100,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f64e60",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

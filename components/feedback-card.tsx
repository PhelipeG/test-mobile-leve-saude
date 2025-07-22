import { COLORS } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface FeedbackCardProps {
  message: string;
  rating: number;
  username: string;
  createdAt: string;
}

export function FeedbackCard({ message, createdAt, username, rating }: FeedbackCardProps) {
  return (
    <View style={styles.card}>
       <Text style={styles.username}>{username}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.date}>{new Date(createdAt).toLocaleString()}</Text>
      <Text style={styles.rating}>Nota: {rating}/5</Text>
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
});

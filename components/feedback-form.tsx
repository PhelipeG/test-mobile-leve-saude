import { COLORS } from "@/constants/theme";
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const { addFeedback } = useFeedbacks();

  const handleSubmit = async () => {
    if (!message.trim() || rating === 0) {
      Alert.alert("Erro", "Preencha a mensagem e selecione uma nota.");
      return;
    }
    if (message.trim().length < 10) {
      Alert.alert("Erro", "A mensagem deve ter pelo menos 10 caracteres.");
      return;
    }

    try {
      await addFeedback(message, rating);
      Alert.alert("Sucesso", "Feedback enviado!");
      setMessage("");
      setRating(0);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Como você avaliaria sua experiência?</Text>
      <Text style={styles.ratingText}>Nota: {rating}/5</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Pressable
            key={num}
            onPress={() => setRating(num)}
            style={styles.starButton}
          >
            <Text style={rating >= num ? styles.starSelected : styles.star}>
              ★
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Deixe seu comentário:</Text>
      <TextInput
        placeholder="Digite seu feedback (minimo 10 caracteres)..."
        value={message}
        onChangeText={setMessage}
        style={[
          styles.input,
          message.length > 0 && message.length < 10 && styles.inputError,
        ]}
        multiline
      />
      <Text style={styles.charCounter}>
        {message.length}/10 caracteres mínimos
      </Text>
      <Button title="Enviar Feedback" onPress={handleSubmit} color="#4F46E5" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    fontWeight: "600",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  starButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  star: {
    fontSize: 32,
    color: COLORS.gray,
    marginRight: 8,
  },
  starSelected: {
    fontSize: 32,
    color: COLORS.stars,
    marginRight: 8,
  },
  input: {
    height: 100,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: COLORS.error,
  },
  charCounter: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 12,
    textAlign: 'right',
  },
});

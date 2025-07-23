import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { COLORS } from '@/constants/theme'
import { useFeedbacks } from '@/hooks/useFeedbacks'

export function FeedbackForm() {
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(0)
  const { addFeedback } = useFeedbacks()

  const handleSubmit = async () => {
    if (!message.trim() || rating === 0) {
      Alert.alert('Erro', 'Preencha a mensagem e selecione uma nota.')
      return
    }
    if (message.trim().length < 10) {
      Alert.alert('Erro', 'A mensagem deve ter pelo menos 10 caracteres.')
      return
    }

    try {
      await addFeedback(message, rating)
      Alert.alert('Sucesso', 'Feedback enviado!')
      setMessage('')
      setRating(0)
    } catch (error: any) {
      Alert.alert('Erro', error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.label}>Como você avaliaria sua experiência?</Text>
          <Text style={styles.ratingText}>Nota: {rating}/5</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable
                key={num}
                onPress={() => setRating(num)}
                style={({ pressed }) => [styles.starButton, pressed && styles.starPressed]}
              >
                <Text style={rating >= num ? styles.starSelected : styles.star}>★</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Deixe seu comentário:</Text>
          <TextInput
            placeholder="Digite seu feedback (mínimo 10 caracteres)..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            multiline
            numberOfLines={4}
          />
          <Text style={styles.charCounter}>{message.length}/10 caracteres mínimos</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  container: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 16,
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  starButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  starPressed: {
    transform: [{ scale: 1.1 }],
  },
  star: {
    fontSize: 32,
    color: COLORS.gray,
    marginRight: 6,
  },
  starSelected: {
    fontSize: 32,
    color: COLORS.stars,
    marginRight: 6,
  },
  input: {
    width: '100%',
    minHeight: 80,
    maxHeight: 150,
    borderWidth: 1.5,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  charCounter: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 16,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
})

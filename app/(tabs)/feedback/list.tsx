import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../../config/firebase';
import { COLORS } from '../../../constants/theme';
import { useFeedbacks } from '../../../hooks/useFeedbacks';

export default function FeedbackList() {
  const router = useRouter();
  const { feedbacks, loading } = useFeedbacks();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Text key={index} style={index < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    ));
  };

  const renderFeedback = ({ item }: { item: any }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Avaliação:</Text>
        <View style={styles.starsRow}>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.ratingText}>{item.rating}/5</Text>
      </View>
      <Text style={styles.feedbackText}>{item.comment}</Text>
      <Text style={styles.feedbackDate}>
        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Feedbacks</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : feedbacks.length > 0 ? (
        <FlatList
          data={feedbacks}
          renderItem={renderFeedback}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum feedback encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  feedbackItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starFilled: {
    color: '#facc15',
    fontSize: 16,
  },
  starEmpty: {
    color: '#d1d5db',
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 5,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});
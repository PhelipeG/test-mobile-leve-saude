import { FlatList, StyleSheet, Text, View } from 'react-native'

import { ButtonLogout } from '@/components/button-logout'
import { FeedbackCard } from '@/components/feedback-card'

import { useFeedbacks } from '../../../hooks/useFeedbacks'

export default function FeedbackList() {
  const { feedbacks, loading } = useFeedbacks()

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : feedbacks.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={feedbacks}
            renderItem={({ item }) => (
              <FeedbackCard
                id={item.id}
                message={item.comment}
                createdAt={item.createdAt}
                userName={
                  item.userName && item.userName.trim() !== '' ? item.userName : 'Usuário Anônimo'
                }
                rating={item.rating}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text style={styles.emptyText}>Nenhum feedback encontrado</Text>
      )}
      <View style={styles.footerFixed}>
        <ButtonLogout />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 80,
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
  footerFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
})

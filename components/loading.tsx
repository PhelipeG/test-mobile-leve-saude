import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { COLORS } from '@/constants/theme'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.text,
  },
})

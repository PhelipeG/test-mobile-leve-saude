import { Image, StyleSheet, Text, View } from 'react-native'

import LogoMain from '@/assets/images/logo-main.jpg'
import { COLORS } from '@/constants/theme'

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image source={LogoMain} style={styles.imageContainer} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Feedback Hub</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
})

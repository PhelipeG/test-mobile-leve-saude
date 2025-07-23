import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import { FeedbackForm } from '@/components/feedback-form'
import { Header } from '@/components/header'

import { COLORS } from '../../../constants/theme'

export default function NewFeedback() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerWrapper}>
              <Header />
            </View>
            <View style={styles.container}>
              <FeedbackForm />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
})

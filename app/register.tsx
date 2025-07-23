import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Header } from '@/components/header'
import { auth } from '@/config/firebase'
import { COLORS } from '@/constants/theme'

export default function RegisterScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      Alert.alert('Sucesso', 'Conta criada!')
      router.replace('/feedback/new')
    } catch (error: any) {
      Alert.alert('Erro', error.message)
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Header />
              <Text style={styles.title}>Criar Conta</Text>

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#888"
              />

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={styles.linkText}>Já tem conta? Entrar</Text>
              </TouchableOpacity>
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
    marginTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  linkText: {
    color: COLORS.primary,
    marginTop: 8,
  },
})

import { useRouter } from 'expo-router'
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
import { login } from '@/services/authService'

import { COLORS } from '../constants/theme'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleLogin = async () => {
    setCarregando(true)
    try {
      await login(email, senha)
      Alert.alert('Login realizado com sucesso!')
      router.replace('/feedback/new')
    } catch (error: any) {
      Alert.alert('Erro no login', error.message)
    } finally {
      setCarregando(false)
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
              <Text style={styles.title}>Entrar</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                onChangeText={setSenha}
                value={senha}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={carregando}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace('/register')}>
                <Text style={styles.linkText}>Não tem conta? Registre-se aqui</Text>
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
    marginBottom: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
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

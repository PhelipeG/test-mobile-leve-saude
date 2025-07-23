import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

import { Loading } from '@/components/loading'
import { AuthProvider, useAuthContext } from '@/context/AuthContext'

export function LayoutWithAuth() {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.replace('/(tabs)/feedback/new')
    } else {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutWithAuth />
    </AuthProvider>
  )
}

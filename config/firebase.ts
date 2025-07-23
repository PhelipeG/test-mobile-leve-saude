import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCNzFga3wYGHSKpK8PAdSiSnrFVq7Ox1AE',
  authDomain: 'backend-leve-saude.firebaseapp.com',
  projectId: 'backend-leve-saude',
  storageBucket: 'backend-leve-saude.firebasestorage.app',
  messagingSenderId: '1060629432200',
  appId: '1:1060629432200:web:ffbff04d342def2f921c3d',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)

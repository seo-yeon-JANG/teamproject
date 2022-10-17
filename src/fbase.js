import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getStorage } from 'firebase/storage'

//DB 초기화
const firebaseConfig = {
  apiKey: 'AIzaSyBZR27PTotzjEbXCfJgZnl46l-1m7nCnaY',
  authDomain: 'healthycogy.firebaseapp.com',
  projectId: 'healthycogy',
  storageBucket: 'healthycogy.appspot.com',
  messagingSenderId: '901407742602',
  appId: '1:901407742602:web:dd8869e57f8f9e806dab73',
  measurementId: 'G-HWHQZSE7SW',
}

firebase.initializeApp(firebaseConfig)

export const firebaseInstance = firebase
export const authService = firebase.auth()
export const dbService = firebase.firestore()
export const storage = getStorage()

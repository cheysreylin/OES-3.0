import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBScHqEccZOo8GxXCZL8scL31qkP9Juc1M',
  authDomain: 'kit-oes.firebaseapp.com',
  projectId: 'kit-oes',
  storageBucket: 'kit-oes.appspot.com',
  messagingSenderId: '1001468702673',
  appId: '1:1001468702673:web:67125d7e611af867783af0',
  measurementId: 'G-CT8ESXQPH7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }

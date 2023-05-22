'use strict'

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import { auth } from './firebase-config.js'

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location = '../screens/lobby.html'
    return
  }
})

// Html Elements
const emailElem = document.getElementById('email')
const passwordElem = document.getElementById('password')
const loginBtn = document.getElementById('login_button')

const resetForm = function () {
  emailElem.value = ''
  passwordElem.value = ''
}

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const email = emailElem.value
  const password = passwordElem.value

  if (email && password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location = '../screens/lobby.html'
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode)
        resetForm()
      })
  }
})

'use strict'

import {
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import { auth } from './firebase-config.js'

const button = document.getElementById('open-kiosk-window')
const logOutBtn = document.getElementById('logOut')

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location = '../screens/login_form.html'
    return
  }
})

button.addEventListener('click', () => {
  window.api.send('open-kiosk-window')
})

logOutBtn.addEventListener('click', () => {
  signOut(auth)
  window.location = '../screens/login_form.html'
})

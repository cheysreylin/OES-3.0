'use strict'

import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import { auth } from './firebase-config.js'

const emailElem = document.getElementById('email')
const loginBtn = document.getElementById('login_button')

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const email = emailElem.value

  if (email) {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        emailElem.value = ''
      })
      .catch((error) => {
        const errorCode = error.code
        emailElem.value = ''
      })
  }
})

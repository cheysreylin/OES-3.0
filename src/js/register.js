'use strict'

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import {
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

import { auth, db } from './firebase-config.js'

const nameElem = document.getElementById('name')
const emailElem = document.getElementById('email')
const passworldElem = document.getElementById('password')
const confirmPasswordElem = document.getElementById('confirm_password')
const registerBtn = document.getElementById('register_btn')

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location = '../screens/lobby.html'
    return
  }
})

const resetForm = function () {
  nameElem.value = ''
  emailElem.value = ''
  passworldElem.value = ''
  confirmPasswordElem.value = ''
}

const createUser = async function (email, password) {
  let userCred
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userCred = userCredential.user
      console.log(userCred)
    })
    .catch((error) => {
      const errorMessage = error.message
      console.log(errorMessage)
    })
  return userCred
}

const addUser = async function (userCred, username, email) {
  await addDoc(collection(db, 'examinees'), {
    _id: userCred.uid,
    name: username,
    email: email,
  })
}

registerBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const username = nameElem.value
  const email = emailElem.value
  const password = passworldElem.value
  const confirmPassword = confirmPasswordElem.value

  if (password !== confirmPassword) {
    resetForm()
  } else {
    if (username && email && password && confirmPassword) {
      const userCred = await createUser(email, password)
      await addUser(userCred, username, email)
      resetForm()
    }
  }
})

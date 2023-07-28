require('dotenv').config()

const { applicationDefault, initializeApp } = require('firebase-admin/app')
const {getFirestore} = require('firebase-admin/firestore')

initializeApp({
    credential: applicationDefault()
})

const db = getFirestore()

module.exports = {
    db,
};
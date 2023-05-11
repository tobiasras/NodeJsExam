import express from 'express'
import db from '../database/database.js'
const router = express.Router()

router.get('/users/:username', (req, res) => {

})

router.post('/users', async (req, res) => {
  const newUser = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    name: 'John Doe',
    age: 30,
    location: 'New York'
  }

  try {
    const usersCollection = db.users
    const result = await usersCollection.insertOne(newUser)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

router.put('/users', (req, res) => {

})

router.delete('/users/:username', (req, res) => {

})

export default router

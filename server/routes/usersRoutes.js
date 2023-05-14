import express from 'express'
import db from '../database/database.js'
import { userIsUnique } from '../library/users/userIsUnique.js'
import isEmail from 'validator/lib/isEmail.js'
const router = express.Router()

router.get('/users/:companyname', async (req, res) => {
  const companyName = req.params.companyname
  try {
    const promise = await db.companies.findOne({ company_name: companyName })
    const response = await promise

    if (response) {
      res.send(response.users)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post('/users/:companyname', async (req, res) => {
  const companyName = req.params.companyname
  const user = req.body

  const result = await userIsUnique(user.username, user.email, companyName)

  console.log(result)

  if (result) {
    try {
      const response = await db.companies.updateOne(
        { company_name: companyName },
        { $push: { users: { user } } })
      if (response.modifiedCount === 1) {
        res.send(user)
      } else {
        res.status(404).send({ message: 'Company not found' })
      }
    } catch (error) {
      res.status(500).send({ message: `error: ${error.message}` })
    }
  } else {
    res.status(400).send({ message: 'not valid user' })
  }
})

router.put('/users/:companyname/:username', async (req, res) => {
  const companyName = req.params.companyname
  const username = req.params.username
  const user = req.body

  // CHECK FOR UNIQUE NESS IN USERNAME AND EMAIL
  let isValid
  if (user.username || user.email) {
    isValid = await userIsUnique(user.username, user.email, companyName)
  } else {
    isValid = true
  }

  if (isValid) {
    // FIELDS TO BE UPDATED
    const updateFields = {}
    if (user.email && isEmail(user.email)) {
      updateFields['users.$.user.email'] = user.email
    }
    if (user.name) {
      updateFields['users.$.user.name'] = user.name
    }
    if (user.username) {
      updateFields['users.$.user.username'] = user.username
    }
    if (user.password) {
      updateFields['users.$.user.password'] = user.password
    }

    try {
      const response = await db.companies.updateOne(
        { company_name: companyName, 'users.user.username': username },
        { $set: updateFields }
      )
      if (response.modifiedCount === 1) {
        res.sendStatus(201)
      } else {
        res.status(404).send({ message: 'not found' })
      }
    } catch (error) {
      res.status(500).send({ message: `error: ${error.message}` })
    }
  } else {
    res.status(400).send({ message: 'not valid parameters' })
  }
})

router.delete('/users/:companyname/:username', async (req, res) => {
  const companyName = req.params.companyname
  const username = req.params.username
  try {
    const response = await db.companies.updateOne(
      { company_name: companyName },
      { $pull: { users: { 'user.username': username } } }
    )

    if (response.modifiedCount === 1) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ message: 'not found' })
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

export default router

import express from 'express'
import db from '../database/database.js'
import isEmail from 'validator/lib/isEmail.js'
import bcrypt from 'bcrypt'
import { authenticateToken, checkCompany } from '../middleware/authenticationMiddleware.js'

const router = express.Router()

router.use(authenticateToken)

const generatePassword = async (plainText) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plainText, salt)
}

router.get('/users/:companyname', checkCompany, async (req, res) => {
  const companyName = req.params.companyname
  try {
    const users = await db.users.find({ company_name: companyName }).toArray()
    if (users) {
      res.send(users)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.get('/users', async (req, res) => {
  const username = req.query.username

  console.log('im here', username)

  try {
    const users = await db.users.find({ username }).toArray()
    console.log(users)
    if (users.length === 0) {
      res.sendStatus(204)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post('/users/:companyname', authenticateToken, checkCompany, async (req, res) => {
  const companyName = req.params.companyname

  if (!req.body.password.length >= 8) {
    res.status(400).send({ message: 'not valid password' })
    return
  }

  if (!isEmail(req.body.email)) {
    res.status(400).send({ message: 'not valid email' })
    return
  }

  const user = {
    company_name: req.body.company_name,
    name: req.body.name,
    username: req.body.username,
    password: await generatePassword(req.body.password),
    email: req.body.email
  }

  const company = await db.companies.findOne({ company_name: companyName })

  if (company) {
    await db.users.insertOne(user)

    res.status(200)
    res.send(user)
  } else {
    res.status(404)
    res.send({ message: `${companyName} not found` })
  }
})

router.put('/users/:companyname/:username', authenticateToken, checkCompany, async (req, res) => {
  const companyName = req.params.companyname
  const username = req.params.username
  const user = req.body

  // FIELDS TO BE UPDATED
  const updateFields = {}
  if (isEmail(user.email)) {
    updateFields.email = user.email
  }
  if (user.name) {
    updateFields.name = user.name
  }
  if (user.username) {
    updateFields.username = user.username
  }
  if (user.password) {
    updateFields.password = generatePassword(user.password)
  }

  try {
    const company = db.companies.findOne({ company_name: companyName })

    if (company) {
      const response = await db.users.updateOne(
        { company_name: companyName, username },
        { $set: updateFields }
      )
      if (response.modifiedCount === 1) {
        res.sendStatus(201)
      } else if (response.modifiedCount === 0) {
        res.status(400).send({ message: 'not field updated' })
      } else if (response.matchedCount === 0) {
        res.status(404).send({ message: 'not found' })
      }
    } else {
      res.status(400).send({ message: `${companyName} not found` })
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: `${error.message}` })
    } else {
      res.status(500).send({ message: `error: ${error.message}` })
    }
  }
})

router.delete('/users/:companyname/:username', authenticateToken, checkCompany, async (req, res) => {
  const username = req.params.username

  try {
    const response = await db.users.deleteOne({ username })

    if (response.deletedCount === 1) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ message: 'not found' })
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

export default router

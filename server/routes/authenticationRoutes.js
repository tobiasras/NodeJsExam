import express from 'express'
import db from '../database/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createLimiter } from '../middleware/limiter.js'

const router = express.Router()

router.use(createLimiter(15, 50))

router.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const userFromDb = await db.users.findOne({ username })
  if (!userFromDb) {
    return res.status(401).send({ message: 'could not authenticate user' })
  }
  const result = await bcrypt.compare(password, userFromDb.password)
  if (!result) {
    return res.status(401).send({ message: 'could not authenticate user' })
  }

  const userData = {
    username: userFromDb.username,
    company: userFromDb.company_name,
    role: userFromDb.role
  }

  const accessToken = generateAccessToken(userData)
  const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)

  // SAVES REFRESH TOKEN TO DATABASE
  await db.tokens.insertOne({ refresh_token: refreshToken })

  const expires = new Date()
  expires.setMinutes(expires.getMinutes() + 30)

  userData.token = {
    expires: expires.toISOString(),
    accessToken,
    refreshToken
  }

  res.send(userData)
})

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token

  if (refreshToken === null) return res.sendStatus(401)

  const result = await db.tokens.findOne({ refresh_token: refreshToken })

  if (result) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)

      const userData = {
        username: user.username,
        company: user.company,
        role: user.role
      }

      const accessToken = generateAccessToken(userData)

      const expires = new Date()
      expires.setMinutes(expires.getMinutes() + 30)

      const data = {
        accessToken,
        expires
      }
      res.send(data)
    })
  } else {
    res.status(403).send({ message: 'could not authenticate token' })
  }
})

router.delete('/logout', async (req, res) => {
  const token = req.body.token
  db.tokens.deleteOne({ refresh_token: token })
  res.sendStatus(204)
})

function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

export default router

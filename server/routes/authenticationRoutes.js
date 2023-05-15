import express from 'express'
import db from '../database/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(username)
  console.log(password)

  const userFromDb = await db.users.findOne({ username })

  const result = await bcrypt.compare(password, userFromDb.password)

  if (result) {
    const userData = {
      username: userFromDb.username,
      company: userFromDb.company_name,
      role: userFromDb.role
    }
    const accessToken = generateAccessToken(userData)
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)

    // SAVES REFRESH TOKEN TO DATABASE
    const reponse = await db.tokens.insertOne({ refresh_token: refreshToken })
    console.log(reponse)

    res.send({
      accessToken,
      refreshToken
    })
  } else {
    res.status(401).send({ message: 'could not authenticate user' })
  }
})

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token

  if (refreshToken === null) return res.sendStatus(401)

  const result = await db.tokens.findOne({ refresh_token: refreshToken })
  console.log(result)

  if (result) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)

      const userData = {
        username: user.username,
        company: user.company_name,
        role: user.role
      }

      const accesToken = generateAccessToken(userData)

      res.send({ accesToken })
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' })
}

export default router

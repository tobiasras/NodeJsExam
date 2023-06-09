import express from 'express'
import db from '../database/database.js'
import { namespace } from '../namespaces/companyNamespace.js'
import { generatePassword } from './usersRoutes.js'
import { createLimiter } from '../middleware/limiter.js'

const router = express.Router()

router.use(createLimiter(15, 300))

router.post('/companies', async (req, res) => {
  const { companyName, cvr } = req.body

  const company = {
    company_name: companyName,
    cvr
  }

  try {
    await db.companies.insertOne(company)
    namespace(req.app.get('io'), companyName)

    const user = {
      company_name: req.body.user.company_name,
      name: req.body.user.name,
      username: req.body.user.username,
      password: await generatePassword(req.body.user.password),
      email: req.body.user.email
    }

    try {
      await db.users.insertOne(user)
      res.sendStatus(204)
    } catch (e) {
      console.log(e)
      res.statusCode = 400
      res.send(e)
    }
  } catch (e) {
    console.log(e)
    res.statusCode = 400
    res.send(e)
  }
})

export default router

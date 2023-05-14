import express from 'express'
import db from '../database/database.js'

const router = express.Router()

router.get('/companies', async (req, res) => {
  const allCompanies = await db.companies.find()
  res.send(allCompanies)
})

router.get('/companies/:name', async (req, res) => {
  res.sendStatus(400)
})

router.post('/companies', async (req, res) => {
  const company = req.body

  try {
    const response = await db.companies.insertOne(company)
    console.log(response)
    res.sendStatus(200)
  } catch (e) {
    res.send(e)
  }
})

export default router

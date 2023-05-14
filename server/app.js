import './config/env.js'
import express from 'express'
import path from 'path'
import fs from 'fs'
import usersRoutes from './routes/usersRoutes.js'
import companiesRoutes from './routes/companiesRoutes.js'

const app = express()

app.use(express.json())

app.use(express.static(path.resolve('../client/dist')))
const application = fs.readFileSync('../client/dist/index.html').toString()

app.use('/api', usersRoutes)
app.use('/api', companiesRoutes)

app.get('/', (req, res) => {
  res.send(application)
})

const port = process.env.SERVER_PORT || 8080

app.listen(port, () => {
  console.log(`Running on ${port}`)
})

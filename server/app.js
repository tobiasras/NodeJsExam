import './config/env.js'
import express from 'express'
import usersRoutes from './routes/usersRoutes.js'
import companiesRoutes from './routes/companiesRoutes.js'
import authenticationRoutes from './routes/authenticationRoutes.js'
import http from 'http'
import helmet from 'helmet'
import { Server } from 'socket.io'
import loadCompanies from './namespaces/companyNamespace.js'
import path from 'path'
const app = express()

// GLOBAL MIDDLEWARE
app.use(helmet())
app.use(express.json())

// SOCKETS
const server = http.createServer(app)
const io = new Server(server)

app.set('io', io)
loadCompanies(io)

// ROUTES
app.use('/api', authenticationRoutes)
app.use('/api', companiesRoutes)
app.use('/api', usersRoutes)

// PAGES
app.use(express.static('../client/dist/'))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'))
})

const port = process.env.SERVER_PORT || 8080
server.listen(port, () => {
  console.log(`Running on ${port}`)
})

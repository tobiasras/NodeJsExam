import './config/env.js'
import express from 'express'
import usersRoutes from './routes/usersRoutes.js'
import companiesRoutes from './routes/companiesRoutes.js'
import authenticationRoutes from './routes/authenticationRoutes.js'
import cors from 'cors'
import http from 'http'
import helmet from 'helmet'
import { Server } from 'socket.io'
import companyNamespace from './namespaces/companyNamespace.js'

const app = express()

// GLOBAL MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(express.json())

// SOCKETS
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['*']
  }
})
companyNamespace(io)

// ROUTES
app.use('/api', authenticationRoutes)
app.use('/api', companiesRoutes)
app.use('/api', usersRoutes)

const port = process.env.SERVER_PORT || 8080
server.listen(port, () => {
  console.log(`Running on ${port}`)
})

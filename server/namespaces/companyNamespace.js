import db from '../database/database.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { dashboard } from './dashboard/dashboardSocket.js'

const companyNameSpaces = async (io) => {
  const companies = await db.companies.find().toArray()

  companies.forEach(company => {
    namespace(io, company.company_name)
  })
}

const namespace = (io, namespace) => {
  const companyNamespace = io.of('/' + namespace)

  companyNamespace.use((socket, next) => {
    const { token } = socket.handshake.auth

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log('ERROR IN JTW SOCKET VERIFY', user)
        next(new Error('invalid'))
      }
      next()
    })
  })

  companyNamespace.on('connection', async socket => {
    socket.on('create lead', data => {
      data.id = new ObjectId()
      db.companies.updateOne({ company_name: namespace }, {
        $push: {
          leads: data
        }
      })

      const changes = {
        type: 'create',
        changes: [
          data
        ]

      }

      companyNamespace.emit('lead changes', changes)
    })

    dashboard(socket, namespace, companyNamespace)
  })
}

export default companyNameSpaces

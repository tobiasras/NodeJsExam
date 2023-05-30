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

const namespace = (io, companyName) => {
  const companyNamespace = io.of('/' + companyName)

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
    dashboard(socket, companyName, companyNamespace)

    socket.on('load call', async (data) => {
      data = new ObjectId(data) // Ensure this matches the lead ID you're looking for

      const result = await db.companies.aggregate([
        { $match: { company_name: companyName } },
        {
          $project: {
            leads: {
              $filter: {
                input: '$leads',
                as: 'lead',
                cond: { $eq: ['$$lead.id', data] }
              }
            }
          }
        },
        { $unwind: '$leads' },
        { $replaceRoot: { newRoot: '$leads' } }
      ]).next()

      socket.emit('initial load call', result)
    })
  })
}

export default companyNameSpaces

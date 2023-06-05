import db from '../database/database.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { leadSockets } from '../sockets/leadSockets.js'

const companyNameSpaces = async (io) => {
  const companies = await db.companies.find().toArray()
  companies.forEach(company => {
    namespace(io, company.company_name)
  })
}

export const namespace = (io, companyName) => {
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
    leadSockets(socket, companyName, companyNamespace)
    socket.on('load teampage', async () => {
      const initialLoad = await db.users.find({ company_name: companyName },
        { projection: { password: 0 } }).toArray()

      socket.emit('initial load teampage', initialLoad)
    })

    socket.on('load company data', async () => {
      const initialLoad = {
        company: await db.companies.findOne({ company_name: companyName })
      }
      socket.emit('company data', initialLoad)
    })

    socket.on('load call', async (data) => {
      data = new ObjectId(data)

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

    socket.on('update user', async (data) => {
      jwt.verify(data.sender, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err || user.role !== 'admin') {
          socket.emit('error update user')
        }

        const response = await db.users.replaceOne(
          { company_name: companyName, username: data.user.username },
          data.user
        )
        console.log(response)
      })
    })
  })
}

export default companyNameSpaces

import db from '../database/database.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const companyNameSpaces = async (io) => {
  const companies = await db.companies.find().toArray()

  companies.forEach(company => {
    namespace(io, company.company_name)
  })
}

const namespace = (io, namespace) => {
  const adminNamespace = io.of('/' + namespace)

  adminNamespace.use((socket, next) => {
    const { token } = socket.handshake.auth

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log('ERROR IN JTW SOCKET VERIFY', user)
        next(new Error('invalid'))
      }
      next()
    })
  })

  adminNamespace.on('connection', async socket => {
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

      adminNamespace.emit('lead changes', changes)
    })

    const initialLoad = {
      company: await db.companies.findOne({ company_name: namespace })
    }

    socket.on('load dashboard', () => {
      socket.emit('initial load', initialLoad)
    })

    socket.on('delete lead', async data => {
      console.log(data)

      data.id = new ObjectId(data.id)

      const result = await db.companies.updateOne(
        { company_name: namespace },
        { $pull: { leads: data } }
      )

      if (result.modifiedCount === 1) {
        const changes = {
          type: 'delete',
          data
        }

        adminNamespace.emit('lead changes', changes)
      } else {
        socket.emit('error delete', {
          message: 'could not delete',
          lead: {
            data
          }
        })
      }
    })

    socket.on('delete field', async data => {
      const lead = data.lead
      lead.id = new ObjectId(lead.id)

      console.log(lead)

      const field = data.field

      console.log(field)

      const update = {}
      update[`leads.$.${field}`] = 1

      const res = await db.companies.updateOne(
        { company_name: namespace, 'leads.id': lead.id },
        { $unset: update }
      )

      console.log(res)
    })

    socket.on('update lead', async data => {
      data.id = new ObjectId(data.id)

      const response = await db.companies.updateOne(
        { company_name: namespace },
        { $set: { 'leads.$[element]': data } },
        { arrayFilters: [{ 'element.id': data.id }] }
      )

      if (response.modifiedCount === 1) {
        const changes = {
          type: 'update',
          changes: {
            [data.id]: data
          }
        }

        adminNamespace.emit('lead changes', changes)
      } else {
        socket.emit('error update', {
          message: 'could not update',
          lead: {
            data
          }
        })
      }
    })
  })
}

export default companyNameSpaces

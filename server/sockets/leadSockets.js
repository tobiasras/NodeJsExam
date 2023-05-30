import db from '../database/database.js'
import { ObjectId } from 'mongodb'

export const leadSockets = async (socket, companyName, companyNamespace) => {
  socket.on('create lead', data => {
    data.id = new ObjectId()
    db.companies.updateOne({ company_name: companyName }, {
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

  socket.on('delete lead', async data => {
    data.id = new ObjectId(data.id)

    const result = await db.companies.updateOne(
      { company_name: companyName },
      { $pull: { leads: data } }
    )

    if (result.modifiedCount === 1) {
      const changes = {
        type: 'delete',
        data
      }
      companyNamespace.emit('lead changes', changes)
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
    const field = data.field
    const update = {}
    update[`leads.$.${field}`] = 1

    await db.companies.updateOne(
      { company_name: companyName, 'leads.id': lead.id },
      { $unset: update }
    )
  })

  socket.on('update lead', async data => {
    data.id = new ObjectId(data.id)

    const response = await db.companies.updateOne(
      { company_name: companyName },
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

      companyNamespace.emit('lead changes', changes)
    } else {
      socket.emit('error update', {
        message: 'could not update',
        lead: {
          data
        }
      })
    }
  })
}

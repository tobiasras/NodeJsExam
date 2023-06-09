import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const db = client.db('coldcanvas')
export default {
  users: db.collection('users'),
  companies: db.collection('companies'),
  tokens: db.collection('tokens')
}

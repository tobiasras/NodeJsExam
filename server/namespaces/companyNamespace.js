import db from '../database/database.js'
import jwt from 'jsonwebtoken'

const companyNameSpaces = async (io) => {
  const companies = await db.companies.find().toArray()

  companies.forEach(company => {
    namespace(io, company.company_name)
  })
}

const namespace = (io, namespace) => {
  const adminNamespace = io.of(namespace)

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

  adminNamespace.on('connection', socket => {
    console.log('is connected')
  })
}

export default companyNameSpaces

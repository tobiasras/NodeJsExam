import '../config/env.js'
import db from './database.js'

db.companies.createIndex({ company_name: 1 }, { unique: true })

db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })

console.log('indexes created for database')

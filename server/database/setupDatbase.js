import '../config/env.js'
import db from './database.js'

db.companies.createIndex({ company_name: 1 }, { unique: true })

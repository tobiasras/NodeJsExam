import '../config/env.js'
import db from './database.js'
import { generatePassword } from '../routes/usersRoutes.js'
import { ObjectId } from 'mongodb'

const company = {
  cvr: '2518234912',
  company_name: 'test-company'
}
db.companies.insertOne(company).then(() => {
  const lead1 = {
    description: "# Meeting next week\n\n- Discuss contract details\n- Finalize deal\n\n## Additional Info\nDon't forget to bring the report.\nCall beforehand for confirmation.",
    phone: '+4520676561',
    email: 'andrea.jones@new-tech.com',
    name: 'Andrea Jones',
    category: 'called',
    Type: 'Called for contract details'
  }
  lead1.id = new ObjectId(1)

  db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
      leads: lead1
    }
  }).then(result => {
    console.log(result)
  })

  const lead2 = {
    description: '# Pending Order\n\nThe client needs to confirm the order details.\nPlan to reach out early next week.',
    phone: '26436413',
    email: 'michael.brown@new-tech.com',
    name: 'Michael Brown',
    category: 'waiting',
    'Low Price': '2000',
    'High Price': '2500'
  }
  lead2.id = new ObjectId(2)
  db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
      leads: lead2
    }
  })

  const lead3 = {
    description: '# Product Shipment\n\nThe client is waiting for the new product shipment. \nFollow up on the estimated delivery time.',
    phone: '+4520676562',
    email: 'julia.smith@new-tech.com',
    name: 'Julia Smith',
    category: 'waiting'
  }
  lead3.id = new ObjectId(3)
  db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
      leads: lead3
    }
  })

  const lead4 = {
    description: '# Potential Partnership\n\nThe client wants to discuss a potential partnership.\nSchedule a meeting to explore this opportunity.',
    phone: '452345231',
    email: 'tom.johnson@new-tech.com',
    name: 'Tom Johnson',
    category: 'called'
  }
  lead4.id = new ObjectId(4)
  db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
      leads: lead4
    }
  })
})

generatePassword('00000000').then(password => {
  const userAdmin = {
    company_name: 'test-company',
    name: 'jensen jensen',
    username: 'tofu',
    password: `${password}`,
    email: 'template@gmail.com',
    role: 'admin'
  }

  const userUser = {
    company_name: 'test-company',
    name: 'rudolf engle mus',
    username: 'soya',
    password: `${password}`,
    email: 'template2@gmail.com',
    role: 'user'
  }

  db.users.insertOne(userAdmin)
  db.users.insertOne(userUser)
})

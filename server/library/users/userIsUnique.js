import db from '../../database/database.js'

export async function userIsUnique (username, email, companyName) {
  const response = await db.companies.aggregate([
    { $match: { company_name: companyName } },
    { $unwind: '$users' },
    {
      $project: {
        username: '$users.user.username',
        email: '$users.user.email',
        _id: 0
      }
    }
  ])

  const allUsers = await response.toArray()

  if (email && username) {
    const emailIsUnique = !allUsers.some(userInDb => userInDb.username === username)
    const usernameIsUnique = !allUsers.some(userInDb => userInDb.email === email)
    return (emailIsUnique && usernameIsUnique)
  }

  if (username) {
    return !allUsers.some(userInDb => userInDb.username === username)
  }

  if (email) {
    return !allUsers.some(userInDb => userInDb.email === email)
  }
}

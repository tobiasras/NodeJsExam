import jwt from 'jsonwebtoken'
export function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

export function checkCompany (req, res, next) {
  const companyNameFromRequest = req.params.companyname
  const companyNameFromToken = req.user.company
  if (companyNameFromRequest !== companyNameFromToken) return res.sendStatus(401)
  next()
}

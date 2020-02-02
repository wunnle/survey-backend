const connectToDatabase = require('../../helpers/dbHelper')
const { compare } = require('../../helpers/passwordHelper')

module.exports = async (req, res) => {
  console.log(req.method)

  console.log(req.body)

  if (req.method === 'POST' && req.body && req.body.username && req.body.password) {
    console.log('considering!')

    if (req.body.username === 'guest') {
      const db = await connectToDatabase()

      const collection = await db.collection('users')

      const users = await collection.find({ username: 'guest' }).toArray()

      const passwordHash = users[0].passwordHash

      if (compare(req.body.password, passwordHash)) {
        res.end('good dog')
      } else {
        res.end('bad dog')
      }
    }
  } else {
    res.status(500)
    res.end('error')
  }
}

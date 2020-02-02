const connectToDatabase = require('../../helpers/dbHelper')
const { compare } = require('../../helpers/passwordHelper')

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.body && req.body.username && req.body.password) {
    const { username, password, updates } = req.body

    if (username === 'guest') {
      const db = await connectToDatabase()

      const usersCollection = await db.collection('users')
      const topicsCollection = await db.collection('topics')

      const users = await usersCollection.find({ username: 'guest' }).toArray()

      const passwordHash = users[0].passwordHash

      if (compare(password, passwordHash) && updates) {
        updates.forEach(async (u, i) => {
          await topicsCollection.findOneAndUpdate(
            { topicId: u.topicId },
            { $inc: { rate: u.rate } },
            { returnNewDocument: true }
          )

          if (i === updates.length - 1) {
            const updatedTopics = await topicsCollection.find({}).toArray()
            res.status(200).send(updatedTopics)
          }
        })
      } else {
        res.status(500)
        res.end('bad input')
      }
    }
  } else {
    res.status(500)
    res.end('error')
  }
}

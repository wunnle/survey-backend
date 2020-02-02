const connectToDatabase = require('../../helpers/dbHelper')

module.exports = async (_req, res) => {
  const db = await connectToDatabase()

  console.log('connected')

  const collection = await db.collection('topics')

  const topics = await collection.find({}).toArray()

  res.status(200).send(topics)
}

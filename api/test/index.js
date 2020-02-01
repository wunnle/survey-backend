const connectToDatabase = require('../../helpers/dbHelper')


module.exports = async (req, res) => {

  const db = await connectToDatabase()

  console.log('connected')

  const collection = await db.collection('admins')

  const users = await collection.find({}).toArray()

  res.status(200).send(users);
}
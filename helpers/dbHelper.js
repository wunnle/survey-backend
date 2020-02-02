const url = require('url')
const MongoClient = require('mongodb').MongoClient


let cachedDb = null
async function connectToDatabase() {
  const uri = process.env.SURVEY_DB_URI


  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  const db = await client.db(url.parse(uri).pathname.substr(1))

  cachedDb = db
  return db
}


module.exports = connectToDatabase
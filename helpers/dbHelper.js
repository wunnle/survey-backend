// const mongoose = require('mongoose')

// function connect() {
//   mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
//   const db = mongoose.connection

//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', () => {
//     console.log('connected to db')
//   })
// }


// module.exports = {
//   connect
// }

// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null
async function connectToDatabase() {
  const uri = process.env.MONGO_DB_URL

  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1))

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}


module.exports = connectToDatabase
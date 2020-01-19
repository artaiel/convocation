const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let db

const mongoConnect = async callback => {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://Anders:T1CA2ZTSfNRm7CX1@peregrin-bcrjy.azure.mongodb.net/convocation?retryWrites=true&w=majority',
      { useUnifiedTopology: true }
    )
    console.log('connected to DB')
    db = client.db()
    callback()
  } catch (err) {
    console.log(err)
  }
}

const getDB = () => {
  if (db) return db
  throw 'no db'
}

module.exports = {
  mongoConnect,
  getDB
}
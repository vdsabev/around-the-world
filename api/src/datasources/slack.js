const { MongoClient } = require('mongodb')
const {
  MONGO_DB_NAME,
  MONGO_DB_COLLECTION,
  MONGO_DB_URL,
} = require('../settings')

const client = new MongoClient(MONGO_DB_URL, { useNewUrlParser: true })

module.exports = () => {
  return new Promise((resolve, reject) => {
    client.connect((error) => {
      if (error) {
        reject(error)
        client.close()
        return
      }

      const collection = client
        .db(MONGO_DB_NAME)
        .collection(MONGO_DB_COLLECTION)

      collection.find({}).toArray((error, documents) => {
        if (error) {
          reject(error)
          client.close()
          return
        }

        resolve(documents)
        client.close()
      })
    })
  })
}

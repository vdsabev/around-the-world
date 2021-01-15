const { MongoClient } = require('mongodb')
const {
  MONGO_DB_NAME,
  MONGO_DB_COLLECTION,
  MONGO_DB_URL,
} = require('./settings')

const client = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = {
  async find(query = {}, options) {
    try {
      await client.connect()

      const collection = client
        .db(MONGO_DB_NAME)
        .collection(MONGO_DB_COLLECTION)

      const documents = await collection.find(query, options).toArray()
      return documents
    } finally {
      client.close()
    }
  },

  async findOneAndReplace(filter = {}, update, options) {
    try {
      await client.connect()

      const collection = client
        .db(MONGO_DB_NAME)
        .collection(MONGO_DB_COLLECTION)

      const document = await collection.findOneAndReplace(
        filter,
        update,
        options
      )
      return document
    } finally {
      client.close()
    }
  },
}

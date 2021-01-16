const mongodb = require('mongodb')
const {
  MONGO_DB_NAME,
  MONGO_DB_COLLECTION,
  MONGO_DB_URL,
} = require('./settings')

const client = new mongodb.MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

/** @typedef {import('./types').StoredPerson} StoredPerson */
/** @typedef {import('./types').Person} Person */

/** @returns {mongodb.Collection<StoredPerson>} */
async function getCollection() {
  await client.connect()
  return client.db(MONGO_DB_NAME).collection(MONGO_DB_COLLECTION)
}

module.exports = {
  /** @type {(filter: mongodb.FilterQuery<StoredPerson>, options?: mongodb.FindOneOptions) => Promise<Person[]>} */
  async find(filter = {}, options) {
    try {
      const collection = await getCollection()
      const documents = await collection.find(filter, options).toArray()
      return documents
    } finally {
      client.close()
    }
  },

  /** @type {(filter: mongodb.FilterQuery<StoredPerson>, options?: mongodb.FindOneOptions) => Promise<Person>} */
  async findOne(filter = {}, options) {
    try {
      const collection = await getCollection()
      const document = await collection.findOne(filter, options).toArray()
      return document
    } finally {
      client.close()
    }
  },

  /** @type {(filter: mongodb.FilterQuery<StoredPerson>, update: StoredPerson, options?: mongodb.ReplaceOneOptions) => Promise<void>} */
  async replaceOne(filter = {}, update, options) {
    try {
      const collection = await getCollection()
      await collection.replaceOne(filter, update, options)
    } finally {
      client.close()
    }
  },
}

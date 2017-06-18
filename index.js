'use strict'

const { MongoClient } = require('mongodb')
const is = require('samesame')

class Client {
  constructor (options = {}) {
    if (is(options, 'String')) {
      this.url = options
    } else if (is(options, 'Object')) {
      const { host = '127.0.0.1', port = '27017', db } = options

      if (!db) {
        throw new Error('No database name provided')
      }

      delete options.host
      delete options.port
      delete options.db

      this.url = `mongodb://${host}:${port}/${db}`
      this.options = options
    } else {
      throw new Error('URL for Mongo connection is not valid')
    }
  }

  collection (name) {
    if (!is(name, 'String')) {
      throw new Error('Name of collection must be string')
    }

    return new Collection(this, name)
  }

  open (name) {
    if (this.db) {
      return Promise.resolve(this.db.collection(name))
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, this.options, (error, db) => {
        if (error) {
          return reject(error)
        }

        this.db = db
        resolve(db.collection(name))
      })
    })
  }

  close () {
    if (this.db) {
      this.db.close()
      this.db = undefined
      return true
    }

    return false
  }
}

class Collection {
  constructor (client, name) {
    this.client = client
    this.name = name
  }

  find (doc, options = {}) {
    if (is(doc, 'String')) {
      doc = { _id: doc }
    }

    return this.client.open(this.name).then(collection => {
      return new Promise((resolve, reject) => {
        const { fields, limit, skip, sort } = options
        const subset = fields && Array.isArray(fields)
          ? options.fields.reduce((fields, current) => {
            if (is(current, 'String')) {
              fields[current] = 1
            }

            return fields
          }, {})
          : {}

        let cursor = collection.find(doc, subset)

        if (limit) {
          cursor.limit(limit)
        }

        if (skip) {
          cursor.skip(skip)
        }

        if (sort) {
          cursor.sort(sort)
        }

        cursor.toArray((error, response) => {
          if (error) {
            return reject(error)
          }

          resolve(response)
        })
      })
    })
  }

  save (doc) {
    return this.client.open(this.name).then(collection => {
      if (Array.isArray(doc)) {
        return Promise.all(
          doc.map(doc => {
            return new Promise((resolve, reject) => {
              collection.save(doc, (error, response) => {
                if (error) {
                  return reject(error)
                }

                return resolve(response && response.result.n > 0 ? response.ops : [])
              })
            })
          })
        )
      }

      return new Promise((resolve, reject) => {
        collection.save(doc, (error, response) => {
          if (error) {
            return reject(error)
          }

          resolve(response && response.result.n > 0 ? response.ops : [])
        })
      })
    })
  }

  count (doc) {
    if (is(doc, 'String')) {
      doc = { _id: doc }
    }

    return this.client.open(this.name).then(collection => {
      return new Promise((resolve, reject) => {
        collection.count(doc, (error, response) => {
          if (error) {
            return reject(error)
          }

          resolve(Number.parseInt(response) || 0)
        })
      })
    })
  }

  update (doc, data, options = {}) {
    if (is(doc, 'String')) {
      doc = { _id: doc }
    }

    return this.client.open(this.name).then(collection => {
      return new Promise((resolve, reject) => {
        collection.update(doc, data, options, error => {
          if (error) {
            return reject(error)
          }

          resolve(true)
        })
      })
    })
  }

  remove (doc) {
    if (is(doc, 'String')) {
      doc = { _id: doc }
    }

    return this.client.open(this.name).then(collection => {
      return new Promise((resolve, reject) => {
        collection.remove(doc, (error, response) => {
          if (error) {
            return reject(error)
          }

          resolve(response && response.result.n > 0)
        })
      })
    })
  }
}

module.exports = Client

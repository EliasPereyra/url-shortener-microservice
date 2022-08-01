const mongoose = require("mongoose")

module.exports = function () {
  const dbHost = process.env.DB_HOST
  const dbName = process.env.DB_NAME

  const mongo_uri = `mongodb+srv://${dbHost}/${dbName}retryWrites=true&w=majority`

  mongoose.connect(mongo_uri).catch(error => console.error(error))

  mongoose.connection.on('connection', () => {
    console.log(`Database connected to: ${mongo_uri}`)
  })

  mongoose.connection.on('disconnected', () => console.error('DB disconnected!'))

  mongoose.connection.on('error', (e) => {
    console.error(`Error at connecting with db: ${e}`)
  })
}

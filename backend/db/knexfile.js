const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '../' + process.env.DB_URI
    },
    migrations: {
      directory: __dirname + '/migrations/dev'
    },
    seed: {
      directory: __dirname + '/seeds/dev'
    } 
  }
}
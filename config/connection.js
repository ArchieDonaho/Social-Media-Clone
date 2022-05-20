//import sequelize constructor
const Sequelize = require('sequelize');

//use environment variables created in the .env file
require('dotenv').config();

//create connection to our new database, pass in MySQL info
let sequelize;
if (process.env.JAWSDB_URL) {
  // if we are uploaded to heroku, and have access to jawsdb
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // if running locally
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;

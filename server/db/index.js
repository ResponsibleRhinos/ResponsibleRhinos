const pgp = require('pg-promise')();

const connection = {
  host: process.env.DATABASE_URL,
};

const db = pgp(connection);


module.exports = db;
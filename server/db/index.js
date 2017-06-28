const pgp = require('pg-promise')();

const connection = {
  host: process.env.DATABASE_URL,
  database: 'mad_map_db',
  user: 'mad_map_db',
};

const db = pgp(connection);


module.exports = db;
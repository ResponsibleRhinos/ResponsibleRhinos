const pgp = require('pg-promise')();

// const connection = {
//   host: process.env.DATABASE_URL
// };

const db = pgp(process.env.DATABASE_URL);


module.exports = db;
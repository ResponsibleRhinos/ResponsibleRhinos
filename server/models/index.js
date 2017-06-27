var db = require('../db');

// db.query('SELECT ${columns^} FROM ${table~}', {
//     columns: 'user_name',
//     table: 'mad_map_users'
// });

module.exports.users = () => {
  console.log("running query method");
  return db.query('select * from mad_map_users');
};

// module.exports =
var db = require('../db');

module.exports = {
  users: {  
    findOrCreate: function (username) {
      return db.query('select * from mad_map_users');     
    },
    get: function () {
      return db.query('select * from mad_map_users');   
    }
  }
};
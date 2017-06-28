var db = require('../db');

module.exports = {
  users: {  
    findOrCreate: function (githubId) {
      return db.query(`select * from mad_map_users where githubId='${githubId}'`);     
    },
    get: function () {
      return db.query('select * from mad_map_users');   
    }
  }
};
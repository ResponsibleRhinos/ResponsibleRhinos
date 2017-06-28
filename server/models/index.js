var db = require('../db');

module.exports = {
  users: {  
    findOrCreate: function (githubId) {
      return db.query(
        `INSERT INTO mad_map_users
            (user_name)
        SELECT '${githubId}'
        WHERE
            NOT EXISTS (
                SELECT user_name FROM mad_map_users WHERE user_name = '${githubId}'
            );
          SELECT * 
          FROM mad_map_users 
          WHERE user_name='${githubId}'`);
    },
    get: function () {
      return db.query('select * from mad_map_users');   
    },
    findById: function (id) {
      return db.query(`select * from mad_map_users where id='${id}'`);   
    },
    
  }
};
// var githubId = "dandersonstack";
// db.query(
//   )
// .then((result)=>{
//   console.log("This was successful: ", result);
// })
// .catch((err)=>{
//   console.log("There was an error", err);
// });

// INSERT mad_map_users (user_name)
// SELECT user_name
// FROM mad_map_users
// WHERE
//    NOT EXISTS (SELECT * FROM mad_map_users
//               WHERE mad_map_users.user_name = c.cName)

// `insert into mad_map_users (user_name)
//   select ${githubId}
//   where not exists (
//       select 1 
//       from mad_map_users
//       where mad_map_users.user_name='${githubId}'
//   );`;













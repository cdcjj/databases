var mysql = require('mysql');
dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});
exports.dbConnection = dbConnection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var insertIntoTable = function(tableName, fieldname, value, callback) {
  var queryString = `INSERT IGNORE INTO ${tableName} (${fieldname}) VALUES (?)`;
  var queryArgs = [value];
  dbConnection.query(queryString, queryArgs, function(err, result) {
    // console.log('===================================================', JSON.stringify(result));
    if (err) {
      throw err;
      // callback(err, null);
    } else {
      // console.log('PASSED INSERT in ELSE:::::::::::::::::::::::::::::value = ', value);
     
      dbConnection.query(`SELECT id FROM ${tableName} WHERE ${fieldname}=?`, value, function(err, result) {
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIRST LINE OF SELECT');
        if (err) {
          throw err;
          // callback(err, null);
        } else {
          // console.log('PASSED SELECT ID????????????????????????');
          callback(null, result[0].id);
        }
        // console.log('AFTER WUERY SELECT');
      });
    }
  });
};

// var queryServer = function(tableName, fieldname, value, callback) {
//   dbConnection.query(`SELECT id FROM ${tableName} WHERE ${fieldname}='?'`, value, function(err, result) {
//     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIRST LINE OF SELECT');
//     if (err) {
//       callback(err, null);
//     } else {
//       console.log('PASSED SELECT ID????????????????????????');
//       callback(null, result[0].id);
//     }
//   });
//   console.log('AFTER WUERY SELECT');
// };

// exports.insertMessage({username: 'doris', roomname: 'rooms', text: 'kitchen'}, function(err, res){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
//   //dbConnection.end();
// });

exports.insertIntoTable = insertIntoTable;
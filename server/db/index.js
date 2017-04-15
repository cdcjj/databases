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
    if (err) {
      throw err;
    } else {
      dbConnection.query(`SELECT id FROM ${tableName} WHERE ${fieldname}=?`, value, function(err, result) {
        if (err) {
          throw err;
        } else {
          callback(null, result[0].id);
        }
      });
    }
  });
};

exports.insertIntoTable = insertIntoTable;
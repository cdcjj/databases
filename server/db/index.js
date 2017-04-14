var mysql = require('mysql');
dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});
dbConnection.connect();
exports.dbConnection = dbConnection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var insertIntoTable = function(tableName, value, callback) {
  var queryString = `INSERT IGNORE INTO ${tableName} (name) VALUES (?)`;
  var queryArgs = [value];
  dbConnection.query(queryString, queryArgs, function(err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      dbConnection.query(`SELECT id FROM ${tableName} WHERE name=?`, value, function(err, id) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, id);
        }
      })
    }
  })
}

exports.insertMessage = function(message, callback) {
  insertIntoTable('rooms', message.roomname, function(err, roomid) {
    if (err) {
      console.log('Insert room error: ', err);
      callback(err, null);
    }
    insertIntoTable('users', message.username, function(err,userid) {
      if (err) {
        console.log('Insert user error: ', err);
        callback(err, null);
      }
      var queryString = 'INSERT INTO messages (text, createdAt, room, user) VALUES (?, ?, ?, ?)'
      var qArgs = [message.text, message.createdAt, roomid, userid];

      dbConnection.query(queryString, qArgs, function(err, result) {
        if (err) {
          console.log('Insert message error: ', err);
          throw err;
        }
        callback(err, result);
      });

    });
  });
}
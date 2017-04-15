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

var insertIntoTable = function(tableName, fieldname, value, callback) {
  var queryString = `INSERT IGNORE INTO ${tableName} (${fieldname}) VALUES (?)`;
  var queryArgs = [value];
  dbConnection.query(queryString, queryArgs, function(err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      dbConnection.query(`SELECT id FROM ${tableName} WHERE ${fieldname}=?`, value, function(err, result) {
        console.log('===================================================', JSON.stringify(result));
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, result[0].id);
        }
      });
    }
  });
};

exports.insertMessage = function(message, callback) {
  insertIntoTable('rooms', 'name', message.roomname, function(err, roomid) {
    if (err) {
      console.log('Insert room error: ', err);
      callback(err, null);
    }
    insertIntoTable('users', 'username', message.username, function(err, userid) {
      console.log('asdf======================================asdf', userid);
      if (err) {
        console.log('Insert user error: ', err);
        callback(err, null);
      }
      var queryString = 'INSERT INTO messages (text, createdAt, room, user) VALUES (?, ?, ?, ?)';
      var qArgs = [message.text, message.createdAt, roomid, userid];

      dbConnection.query(queryString, qArgs, function(err, result) {
        if (err) {
          console.log('Insert message error: ', err);
          throw err;
        }
        console.log('=======================================asdf')
        callback(err, result);
      });

    });
  });
};

exports.insertMessage({username: 'doris', roomname: 'rooms', text: 'kitchen'}, function(err, res){
  if(err) {
    console.log(err);
  } else {
    console.log(res);
  }
  //dbConnection.end();
});

exports.insertIntoTable = insertIntoTable;

//dbConnection.end();
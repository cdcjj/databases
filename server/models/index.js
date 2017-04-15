var db = require('../db');
var connection = db.dbConnection;
var insertMessage = db.insertMessage;
var insertIntoTable = db.insertIntoTable;

var getAllMessages = "SELECT u.username, m.text, m.createdAt, r.name, m.objectId FROM messages m INNER JOIN users u ON m.user = u.id INNER JOIN rooms r ON m.room = r.id";

module.exports = {
  messages: {
    get: function (callback) {
      connection.connect(function() {
        connection.query(getAllMessages, [], function(error, rows) {
          if (error) {
            throw error;
          } else {
            callback(null, rows);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      connection.connect(function() {
        insertIntoTable('rooms', 'name', message.roomname, function(err, roomid) {
          if (err) {
            throw err;
          }
          insertIntoTable('users', 'username', message.username, function(err, userid) {
            if (err) {
              callback(err, null);
            }
            var queryString = 'INSERT INTO messages (text, room, user) VALUES (?, ?, ?)';
            var qArgs = [message.text, roomid, userid];

            connection.query(queryString, qArgs, function(err, result) {
              if (err) {
                throw err;
              }
              callback(err, result);
            });

          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, callback) {
      connection.connect(function(error) {
        connection.query('SELECT username FROM users ORDER BY id', function(error, rows) {
          if (error) {
            throw error;
          } else {
            callback(null, rows);
          }
        });
      });
    },
    post: function (user, callback) {
      connection.connect(function(error) {
        insertIntoTable('users', 'username', user.username, function(err, id) {
          if (err) {
            throw err;
          }
          callback();
        });
      });
      
    }
  }
};


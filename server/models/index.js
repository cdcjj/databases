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
          if(error) {
            console.log('-----------------------------------------error !@#', error);
            throw error;
          } else {
            console.log('------------------------------------------query ended\nresults: ', JSON.stringify(rows));
            callback(null, rows);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      connection.connect(function() {
        // console.log('starting POST_---------------------------');
        insertIntoTable('rooms', 'name', message.roomname, function(err, roomid) {
          if (err) {
            console.log('Insert room error: ', err);
            throw err;
            // callback(err, null);
          }
          // console.log('_______________________________________________________________roomid while adding msg ', roomid);
          insertIntoTable('users', 'username', message.username, function(err, userid) {
            // console.log('_______________________________________________________________userid while adding msg ', userid);
            if (err) {
              // console.log('Insert user error: ', err);
              callback(err, null);
            }
            var queryString = 'INSERT INTO messages (text, createdAt, room, user) VALUES (?, ?, ?, ?)';
            var qArgs = [message.message, message.createdAt? message.createdAt : null, roomid, userid];
            // console.log('text, cAt, roomid, userid ========================================================== ', qArgs, ' asdf ', message);

            connection.query(queryString, qArgs, function(err, result) {
              if (err) {
                console.log('Query--Insert message error: ', err);
                throw err;
              }
              // console.log('end=======================================asdf');
              callback(err, result);
              //connection.end();
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
        connection.query('SELECT * FROM users', function(error, rows) {
          if(error) {
            throw error;
          } else {
            callback(null, rows);
          }
        });
      });
    },
    post: function (user, callback) {
      connection.connect(function(error){
        // console.log('IN POST MODEL USERS________________________', user);
        insertIntoTable('users', 'username', user.username, function(err, id) {
          if (err) {
            throw err;
          }
          console.log("Success!!! :D", id);
          callback();
        });
      });
      
    }
  }
};


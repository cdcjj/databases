var db = require('../db');
var connection = db.dbConnection;
var insertMessage = db.insertMessage;

var getAllMessages = "SELECT * FROM messages m INNER JOIN users u ON m.user = u.id INNER JOIN rooms r ON m.room = r.id";

module.exports = {
  messages: {
    get: function (callback) {
      connection.get().query(getAllMessages, [], function(error, rows) {
        if(error) {
          console.log('-----------------------------------------error !@#');
        }
        else {
          console.log('------------------------------------------query ended\nresults: ', rows);
          callback(null, rows);
        }
      })
    }, // a function which produces all the messages
    post: function (message, callback) {
      var values = []
      connection.get(connection.WRITE, function(err, connection){
        if(err) {
          return callback('database problem');
        } else {
          insertMessage(message, function(err, result) {
            callback(err, result);
          })
          //room user message thing
        }
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req) {},
    post: function () {}
  }
};


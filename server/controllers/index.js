var models = require('../models');

function resultsToSend(results) {
  console.log('IN RESULTS TO SEND');
  return results.map(function(result) {
    return {
      message: result.text, 
      objectId: result.objectId, 
      createdAt: result.createdAt, 
      roomname: result.name,
      text: result.text,
      username: result.username
    };
  });
}

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, results) {
        if (err) {
          res.send('error');
        } else {
          console.log('IN CONTROLLER GET -----------------------> results= ',results);
          res.send(JSON.stringify(resultsToSend(results)));
          res.end();
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log('in controllers::::=================== req.body of POST       ******   ', JSON.stringify(req.body));
      models.messages.post(req.body, function() {
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(err, results) {
        res.send(results);
        res.end();  
      });
    },
    post: function (req, res) {
      models.users.post(req.body, function() {
        res.end();
      }); 
    }
  }
};

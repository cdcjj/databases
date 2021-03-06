var models = require('../models');

function resultsToSend(results) {
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
          res.json(resultsToSend(results));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function() {
        res.sendStatus(201);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req, function(err, results) {
        res.json(results);
        res.end();
      });
    },
    post: function (req, res) {
      models.users.post(req.body, function() {
        res.sendStatus(201); 
      }); 
    }
  }
};

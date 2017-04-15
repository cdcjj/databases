var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      res.send(models.messages.get());
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('in controllers::::=================== req.body of POST       ******   ', JSON.stringify(req.body));
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.end(models.users.get());
    },
    post: function (req, res) {
      console.log('==============================username>>>>>>', JSON.stringify(req.body))
      models.users.post(req.body); 
      res.end();
    }
  }
};


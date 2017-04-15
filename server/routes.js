var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/messages', controller.messages.get);

// router.get('/messages', function(req, res) {
//   res.json({results: [{}]});
// });

router.post('/messages', controller.messages.post);

router.get('/users', controller.users.get);



router.post('/users', controller.users.post);

router.options('/*', function(req, res) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
module.exports = router;


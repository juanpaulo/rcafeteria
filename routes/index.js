var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res) {
  console.dir(req.body);
  var message = {
    "color": "green",
    "message": "Hello, world!",
    "notify": false,
    "message_format": "text"
  };
  res.send(message);
});

module.exports = router;

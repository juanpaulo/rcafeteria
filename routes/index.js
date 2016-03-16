var express = require('express');
var router = express.Router();

var https = require('https');

function getMenu(menuDate, callback) {
  https.get(process.env.MENULIST_URL + menuDate, (res) => {
    // console.log('statusCode: ', res.statusCode);
    // console.log('headers: ', res.headers);
    var body = '';
    res.on('data', (d) => {
      body += d;
    });
    res.on('end', () => {
      callback(JSON.parse(body));
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

function constructQuery(foo) {
  return '';
}

function findMeal(menu, query, callback) {
  var result = '';

  menu.data.forEach(function(meal){
    result += meal.title + '\n';
  });

  callback(result);
}

router.post('/', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  console.log(req.body);

  var today = new Date(); //TODO get from request
  var yyyy = today.getFullYear();
  var mm = today.getMonth() + 1; //January is 0!
  var dd = today.getDate();
  if(dd < 10) {
      dd = '0' + dd
  }
  if(mm < 10) {
      mm = '0' + mm
  }
  console.log(yyyy + mm + dd);

  getMenu(yyyy + mm + dd, function(menu) {
    var query = constructQuery(req.body); //TODO basic NLP
    var message = findMeal(menu, query, function(meals) {
      var message = {
        "color": "green",
        "message": meals,
        "notify": false,
        "message_format": "text"
      };
      res.send(message);
    });
  });
});

module.exports = router;

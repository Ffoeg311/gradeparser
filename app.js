var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/parse', urlencodedParser, function(req, res){
  console.log(req.body);
  res.send('parsing...');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
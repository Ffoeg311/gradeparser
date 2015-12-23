var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/parse', upload.single('fileurl'), function (req, res, next) {
  console.log(req.file);
  res.send("yay!");
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
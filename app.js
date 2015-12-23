var express = require('express');

bodyParser = require('body-parser');
multer  = require('multer')
upload = multer({ dest: 'uploads/' })
fs = require('fs');
parse = require('csv-parse');

var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.post('/parse', upload.single('fileurl'), function (req, res, next) {
  var filePath = req.file.path;
  function onNewRecord(record){ console.log(record) }

  function onError(error){ console.log(error) }

  function done(linesRead){ res.sendStatus(200) }

  var columns = true;
  parseCSVFile(filePath, columns, onNewRecord, onError, done);

})

function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, done) {
  var source = fs.createReadStream(sourceFilePath);

  var linesRead = 0;

  var parser = parse({
    delimiter: ',',
    columns:columns
  });

  parser.on("readable", function(){
    var record;
    while (record = parser.read()) {
      linesRead++;
      onNewRecord(record);
    }
  });

  parser.on("error", function(error){
    handleError(error)
  });

  parser.on("end", function(){
    done(linesRead);
  });

  source.pipe(parser);
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


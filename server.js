var path = require('path');
var express = require('express');

var app = express();

var publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

app.listen(8888, function() {
  console.log('listening on port 8888');
});
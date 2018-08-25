var express = require('express');
var morgan = require('morgan');
var routes = require('./routes.js');

var app = express();
var port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);

app.use('/api', function(req, res) {
    res.send('Qtify Server');
});

app.listen(port, function() {
    console.log('Server running on port ' + port);
});
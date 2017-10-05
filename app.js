let express = require('express'),
    app     = express();

let routes = require('./routes');
routes(app);

module.exports = app;

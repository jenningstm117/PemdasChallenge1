let express = require('express'),
    app = express(),
    port = 3000;

let routes = require('./routes');
routes(app);

app.listen(port);

console.log('server started on: ' + port);
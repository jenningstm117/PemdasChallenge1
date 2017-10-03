'use strict';

let http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/resource?id=foo&bar=baz',
    method: 'POST'
};

http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}).end();
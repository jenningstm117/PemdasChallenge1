'use strict';
module.exports = function(app) {
    let api = require('./controller');

    app.route('/')
        .get(api.index);

    app.route('/numbers')
        .get(api.randomInts);
};
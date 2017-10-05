'use strict';

let rp = require('request-promise');

exports.getNumbers = () => {
    let start = new Date();
    return rp('http://localhost:3000/numbers')
        .then(function (result) {
            let response_time = new Date() - start;
            let obj = JSON.parse(result);
            return {response_time, numbers: obj.numbers}
        });
};

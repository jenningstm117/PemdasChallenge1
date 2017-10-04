'use strict';

let async = require('async');
let request = require('request');


exports.randomInts = function(req, res) {
    let randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));

    let data = {valid: Math.random() >= 0.3, numbers: randomArray(10, 10)};
    setTimeout(function(){
        res.json(data);
    }, Math.random()*150);
};



let invalid_results = 0,
    valid_results = 0,
    invalid_sum = 0,
    sum = 0;

let getNumbers = (callback) => {
    let url = "http://localhost:3000/numbers";
    let start = new Date();
    request(url, function(err, response, body) {
        let response_time = new Date() - start;
        let obj = JSON.parse(body);
        console.log(start, response_time, obj.numbers, obj.numbers.reduce((a, b) => a + b));

        sumValues(obj.numbers, response_time);

        callback(false, {sum: obj.numbers.reduce((a, b) => a + b), response_time: response_time});
    });
};

let sumValues = (numbers, response_time) => {
    if (response_time >= 100 && invalid_results < 2) {
        invalid_results += 1;
        invalid_sum += numbers.reduce((a, b) => a + b);
    }
    else if (response_time < 100){
        valid_results += 1;
        sum += numbers.reduce((a, b) => a + b);
    }
};

exports.index = function(req, res){
    invalid_results = 0;
    valid_results = 0;
    invalid_sum = 0;
    sum = 0;


    let start = new Date();
    async.parallel([
            getNumbers,
            getNumbers,
            getNumbers
        ],
        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }

            let value = valid_results > 0 ? sum : invalid_sum;

            res.send({api1:results[0], api2:results[1], api3:results[2], value});
        });

    console.log(sum);
};
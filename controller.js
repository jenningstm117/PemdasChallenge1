'use strict';

let rp = require('request-promise');


let invalid_results = 0,
    valid_results = 0,
    invalid_sum = 0,
    sum = 0;

let getNumbers = () => {
    let start = new Date();
    return rp('http://localhost:3000/numbers')
        .then(function (result) {
            let response_time = new Date() - start;
            let obj = JSON.parse(result);
            sumValues(obj.numbers, response_time);
            return {response_time, numbers: obj.numbers, sum: obj.numbers.reduce((a, b) => a + b)}
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

 async function fetchSumValues(){
    invalid_results = 0;
    valid_results = 0;
    invalid_sum = 0;
    sum = 0;

    await Promise.all([
        getNumbers(),
        getNumbers(),
        getNumbers()
    ]).then(result => {
        result.sort((a, b) => a.response_time > b.response_time).forEach(item => {
            console.log(`response time: ${item.response_time}   sum: ${item.sum}   numbers: ${item.numbers}`);
        });
    });

    return valid_results > 0 ? sum : invalid_sum;
}


exports.randomInts = function(req, res) {
    let randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));

    let data = {valid: Math.random() >= 0.3, numbers: randomArray(10, 10)};
    setTimeout(function(){
        res.json(data);
    }, Math.random()*150);
};

exports.index = async function(req, res){
    console.log('-------------');
    let sum_values = await fetchSumValues();
    console.log(`value sum: ${sum_values}`);
    console.log('-------------');
};
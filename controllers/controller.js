'use strict';
let utils = require('../utils/utils');

//  /numbers
//  Endpoint for returning an array of random numbers
exports.randomInts = function(req, res) {
    let randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));

    let data = {numbers: randomArray(10, 10)};
    //setTimeout to force a longer response time so that some are over 100ms
    setTimeout(function(){
        res.json(data);
    }, Math.random()*150);
};

//  index route invoking Challenge function. logs result obj to console and sends in response
exports.index = async function(req, res){
    console.log('-------------');
    let sum_values = await fetchSumValues();
    console.log(`\nvalue sum: ${sum_values}`);
    console.log('-------------');
    res.json({sum: sum_values});
};

//  Challenge Function
//  invokes /numbers 3 times and waits for result
async function fetchSumValues(){
    let invalid_results     = 0,
        valid_results       = 0,
        invalid_sum         = 0,
        sum                 = 0;

    await Promise.all([
        utils.getNumbers(),
        utils.getNumbers(),
        utils.getNumbers()
    ]).then(result => {
        //  Sort final results by response time ascending and sum up values.
        result.sort((a, b) => a.response_time > b.response_time).forEach(item => {
            let sum_nums = item.numbers.reduce((a, b) => a + b);
            if (item.response_time >= 100 && invalid_results < 2) {
                invalid_results += 1;
                invalid_sum += sum_nums;
            }
            else if (item.response_time < 100){
                valid_results += 1;
                sum += sum_nums;
            }
            //  log the details of the call to /numbers
            console.log(`response time: ${item.response_time}\tsum: ${sum_nums}\t\tnumbers: ${item.numbers}`);
        });
    });
    return valid_results > 0 ? sum : invalid_sum;
}

exports.fetchSumValues = fetchSumValues;

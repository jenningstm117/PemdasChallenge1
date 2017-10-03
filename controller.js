'use strict';

let rp = require('request-promise');


exports.random_ints = function(req, res) {
    let randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));

    // res.json({numbers: randomArray(10, 10)});
    let data = {valid: Math.random() >= 0.3, numbers: randomArray(10, 10)};
    res.json(data);
};

exports.index = function(req, res) {
    let options = {
        uri: 'http://localhost:3000/numbers',
    };
    let promises = [rp(options), rp(options), rp(options)];
    Promise.all(promises)
        .then(result => {
            let sum = sumValues(result);

            console.log(sum);
        });
};

function sumValues(values){
    let sum = 0,
        invalid_sum = 0,
        invalid_count = 0,
        use_invalid = false;

    let values_sum = values.map(item => {
        let json_item = JSON.parse(item);
        return {valid: json_item.valid, sum: json_item.numbers.reduce((a, b) => a + b)}
    });

    console.log(values_sum);

    values_sum.forEach((item, index) => {
        if (item.valid){
            sum += item.sum
        }else{
            if (invalid_count === 1 && index === 1 ){
                use_invalid = true;
                invalid_sum += item.sum
            }else if (!use_invalid){
                invalid_sum += item.sum
            }
            invalid_count += 1;
        }
    });

    if (use_invalid){
        return invalid_sum;
    }else{
        return sum;
    }
}
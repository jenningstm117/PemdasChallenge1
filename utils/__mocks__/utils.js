const getNumbers = jest.fn(
    () => Promise.resolve({response_time: 20, numbers: [1, 2, 3]})
);

exports.getNumbers = getNumbers;
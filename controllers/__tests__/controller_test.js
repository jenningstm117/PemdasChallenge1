let controller = require('../controller');
const { getNumbers } = require('../../utils/utils');

jest.mock('../../utils/utils');

//  suppress the console logs
console.log = function() {};

describe('Test the challenge function', () => {
    test('It should return the sum when all calls are valid', (done) => {
        getNumbers.mockReturnValueOnce({response_time: 1, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 50, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 99, numbers: [1, 2, 3]});
        controller.fetchSumValues().then(data => {
            expect(data).toBe(18);
            done();
        });
    });

    test('It should return the sum of the first two sets when final set is invalid', (done) => {
        getNumbers.mockReturnValueOnce({response_time: 1, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 50, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 100, numbers: [1, 2, 3]});
        controller.fetchSumValues().then(data => {
            expect(data).toBe(12);
            done();
        });
    });

    test('It should return the sum of first set when it is the only valid set', (done) => {
        getNumbers.mockReturnValueOnce({response_time: 23, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 100, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 210, numbers: [1, 2, 3]});
        controller.fetchSumValues().then(data => {
            expect(data).toBe(6);
            done();
        });
    });

    test('It should return the sum of the first two sets when all sets are invalid', (done) => {
        getNumbers.mockReturnValueOnce({response_time: 100, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 121, numbers: [1, 2, 3]});
        getNumbers.mockReturnValueOnce({response_time: 150, numbers: [1, 2, 3]});
        controller.fetchSumValues().then(data => {
            expect(data).toBe(12);
            done();
        });
    });

    test('It should call the api three times', (done) => {
        getNumbers.mockClear();
        controller.fetchSumValues().then(data => {
            expect(getNumbers.mock.calls.length).toBe(3);
            done();
        });
    });

});

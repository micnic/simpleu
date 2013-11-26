
var tests = {
    'test one': function (test) {
        test.params
        test.ok(true);
        test.done();
    },
    'test four': function (test) {
        setTimeout(function () {
            test.done();
        }, 500);
        test.ok(true);

    },
    'test five': function (test) {
        test.ok(true);
        test.done();
    },
    'test six': function (test) {
        test.ok(true);
        test.done();
    }
};

module.exports = {
    'tests': tests
};
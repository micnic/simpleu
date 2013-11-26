
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
var config = {
    'timeout': 1000,
    'start': function (callback) {
        callback();
    },
    'before': function(callback) {
        callback();
    },
    'after': function(callback) {
        callback();
    },
    'end': function () {
    }
};

module.exports = {
    'tests': tests,
    'config':config
};
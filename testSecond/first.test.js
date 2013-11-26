
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
        console.log('start');
        callback();
    },
    'before': function(callback) {
        console.log('before');
        callback();
    },
    'after': function(callback) {
        console.log('after');
        callback();
    },
    'end': function () {
        console.log('end');
    }
};

module.exports = {
    'tests': tests,
    'config':config
};
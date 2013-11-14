var simpleu = require('../index');

simpleu({
    'test one': function (test) {
        test.params
        test.ok(true);
        test.done();
    },
    'test four': function (test) {
        setTimeout(function () {
            test.done();
        }, 2000);
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
}, {
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
});
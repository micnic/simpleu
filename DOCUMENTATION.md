```javascript
var simpleu = require('simpleu');
```

## Run tests
`simpleu(tests[, config, callback])`

tests: object

config: object

callback: function()

simpleU uses Node.JS [assert](http://nodejs.org/api/assert.html) core module to make the necessary assertions in the provided tests, each test is ran inside a anonymous function with the test as parameter. It is possible to make any amount of assertions on the test and then call the `.done()` method to end it. Also it is possible to configure the test suite by providing the timeout limit of a single test case and functions to be executed before and after each test or on the start or the end of the whole test suite. Also, if it is necessary, an callback function can be defined to be executed when all test cases are done.

```javascript
simpleu({
    'test1': function (test) {
        test.ok(true);
        test.equal(1, 1);
        test.done();
    },
    'test2': function (test) {
        test.ok(true);
        test.done();
    },
    'test3': function (test) {
        test.ok(true);
        test.done();
    }
}, {
    timeout: 2000,                 // Set the maximum time, in miliseconds, to wait for a test case to executed, default is 1000 ms
    start: function (callback) {   // Run something before all the test cases begin
        // Application logic
        callback();
    },
    before: function (callback) {  // Run something before each test case execution
        // Application logic
        callback();
    },
    after: function (callback) {   // Run something after each test case execution
        // Application logic
        callback();
    },
    end: function () {             // Run something after all the test cases ended
        // Application logic
    }
});
```

## Run from command line
`simpleu /path/to/tests [/path/to/other/tests ...]`

**Be sure to have simpleU installed globally (npm i -g simpleu).**

SimpleU accepts unlimited number of parameters which can be files or folders, tests files must have extension `.test.js`.
`config` attribute is optional.

Structure of test file:
```javascript
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
```
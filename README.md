<img src="https://raw.github.com/micnic/simpleU/master/logo.png"/>
# simpleU 0.0.3

simpleU is a simple unit testing tool for Node.JS that has some special features:

- Simple structure with minimum configuration
- No dependencies
- Oriented for Test-Driven Development
- Uses Node.JS [assert](http://nodejs.org/api/assert.html) core module

#### Works in Node.JS 0.10+
#### Any feedback is welcome!

#### More simple modules:
- [simpleR](http://micnic.github.com/simpleR/)
- [simpleS](http://micnic.github.com/simpleS/)
- [simpleT](http://micnic.github.com/simpleT/)

### [Changelog](https://github.com/micnic/simpleU/wiki/Changelog)
### [Documentation](https://github.com/micnic/simpleU/wiki/Documentation)

## Instalation

    npm install simpleu

or install globally

    npm install -g simpleu

## Running a test suite

```javascript
var simpleu = require('simpleu');

simpleu(/* tests object */);
```

## Structure of a test

    {
        'test name 1': function (test) {
            test.ok(/* true value */);
            test.done();
        },
        'test name 2': function (test) {
            test.ok(/* another true value*/);
            test.done();
        },
        'test name 3': function (test) {
            test.equal(/* actual value, expected value, message */);
            test.done();
        }
    }

## Running from command line

    simpleu /path/to/tests

## Structure of a test from command line

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

module.exports = {
    tests: tests
};
```
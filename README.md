<img src="https://raw.github.com/micnic/simpleU/master/logo.png"/>
# simpleU 0.0.2

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

### [Changelog](https://github.com/micnic/simpleS/wiki/Changelog)
### [Documentation](https://github.com/micnic/simpleS/wiki/Documentation)

## Instalation

    npm install simpleu

## Running a test suite

    var simpleu = require('simpleu');

    simpleu(/* tests object */);

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
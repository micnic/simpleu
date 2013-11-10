```javascript
var simpleu = require('simpleu');
```

## Run tests
`simpleu(tests)`

tests: object

simpleU uses Node.JS [assert](http://nodejs.org/api/assert.html) core module to make the necessary assertions in the provided tests, each test is ran inside a anonymous function with the test as parameter. It is possible to make any amount of assertions on the test and then call the `.done()` method to end it. Also it is possible to run a suite of tests by grouping them in an object literal and adding it to the parent object.

```javascript
simpleu({
    'test1': function (test) {
        test.ok(true);
        test.equal(1, 1);
        test.done();
    },
    'test suite': {
        'test2': function (test) {
            test.ok(true);
            test.done();
        },
        'test3': function (test) {
            test.ok(true);
            test.done();
        }
    }
});
```
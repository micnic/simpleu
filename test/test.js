var simpleu = require('simpleu');

var dummyTest = {
	'test 1': function (test) {
		test.ok(true);
		test.done();
	},
	'test suite 1': {
		'test 2': function (test) {
			test.ok(true);
			test.done();
		},
		'test 3': function (test) {
			test.ok(true);
			test.done();
		}
	}
};

simpleu(dummyTest);
var simpleu = require('simpleu');

simpleu({
	'test 1': function (test) {
		setTimeout(function () {
			0 = infinity;
			test.ok(true);
			test.done();
		}, 100);
	},
	'test 2': function (test) {
		setTimeout(function () {
			test.ok(true);
			test.done();
		}, 500);
	},
	'test 3': function (test) {
		setTimeout(function () {
			test.ok(true);
			test.done();
		}, 900);
	}
});
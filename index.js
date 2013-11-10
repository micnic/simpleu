'use strict';

var assert = require('assert'),
	domain = require('domain');

function runSuite(tests, indent) {

	var name,
		keys,
		start,
		test = {
			deepEqual     : assert.deepEqual,
			doesNotThrow  : assert.doesNotThrow,
			done          : done,
			equal         : assert.equal,
			fail          : assert.fail,
			ifError       : assert.ifError,
			notDeepEqual  : assert.notDeepEqual,
			notEqual      : assert.notEqual,
			notStrictEqual: assert.notStrictEqual,
			ok            : assert.ok,
			strictEqual   : assert.strictEqual,
			throws        : assert.throws
		};

	// Domain error listener
	function onError(error) {
		console.log(indent + name + ': \u001b[31mFail\u001b[39m\n\n' + error.stack + '\n');
	}

	// Domain run callback
	function onRun() {
		name = keys.shift();

		if (name) {
			start = Date.now();
			run(tests[name]);
		}
	}

	// Test end method
	function done() {
		console.log('\u001b[37m' + indent + name + ': \u001b[32mSucces \u001b[34m[' + (Date.now() - start) + 'ms]\u001b[39m');
		domain.create().on('error', onError).run(onRun);
	}

	// Run a test or a test suite
	function run(testEntity) {
		if (typeof testEntity === 'function') {
			testEntity(test);
		} else if (typeof testEntity === 'object') {
			console.log('\n\u001b[37m' + indent + name + ':');
			runSuite(testEntity, indent + '  ', done);
		} else {
			throw new Error('Invalid Test Structure');
		}
	}

	keys = Object.keys(tests);

	console.log(indent + '\u001b[37mRun ' + keys.length + ' tests:');

	// Start the test chain
	domain.create().on('error', onError).run(onRun);
}

module.exports = function (tests) {
	runSuite(tests, '');
};
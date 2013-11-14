'use strict';

var assert = require('assert'),
	domain = require('domain');

// Run a suite of test cases
module.exports = function (tests, config) {

	var context = new domain.Domain(),
		name,
		keys = Object.keys(tests),
		start,
		timer,
		finishedInTime = true,
		test = {},
		timeout;

	// The end of a test case
	function done() {
		if (finishedInTime){
			clearTimeout(timer);

			console.log('\u001b[37m' + name +
				': \u001b[32mSucces \u001b[34m[' + (Date.now() - start) +
				'ms]\u001b[39m');

			if (config.after && typeof config.after === 'function') {
				config.after(function () {
					context.run(onRun);
				})
			} else {
				context.run(onRun);
			}
		}
	}

	// Test case before callback
	function onBefore() {
		if (config.before && typeof config.before === 'function') {
			config.before(function () {
				tests[name](test);
			});
		} else {
			tests[name](test);
		}
	}

	// Test suite end callback
	function onEnd() {
		if (config.end && typeof config.end === 'function') {
			config.end();
		}
	}

	// Domain run callback
	function onRun() {
		if (finishedInTime) {
			name = keys.shift();
			runNext();
		}
	}

	// Run next test case
	function runNext() {
		if (typeof name === 'string' && typeof tests[name] === 'function') {
			start = Date.now();
			setTimer();
			onBefore();
		} else if (typeof name === 'string') {
			throw new Error('Invalid Test Structure');
		} else {
			onEnd();
		}
	}

	function setTimer() {
		timer = setTimeout(function () {
			finishedInTime = false;
			throw new Error('time limit has been exceeded');
		}, timeout);
	}

	// Start the test chain
	function setup() {
		context.on('error',function (error) {
			console.error(name + ': \u001b[31mFail\u001b[39m\n');
			console.error(error.stack + '\n');
		}).run(onRun);
	}

	// Define the test object
	test = {
		deepEqual: assert.deepEqual,
		doesNotThrow: assert.doesNotThrow,
		done: done,
		equal: assert.equal,
		fail: assert.fail,
		ifError: assert.ifError,
		notDeepEqual: assert.notDeepEqual,
		notEqual: assert.notEqual,
		notStrictEqual: assert.notStrictEqual,
		ok: assert.ok,
		strictEqual: assert.strictEqual,
		throws: assert.throws
	};

	// Show the number of tests to run
	console.log('\u001b[37mRun ' + keys.length + ' tests:');

	// Set the timeout for a test case
	if (config.timeout && typeof config.timeout === 'number') {
		timeout = config.timeout;
	} else {
		timeout = 1000;
	}

	// Start the test suite
	if (config.start && typeof config.start === 'function') {
		config.start(setup);
	} else {
		setup();
	}
}
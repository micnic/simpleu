'use strict';

var assert = require('assert'),
	domain = require('domain');

// Run a suite of test cases
module.exports = function (tests, config, callback) {

	var context = new domain.Domain(),
		failed = false,
		keys = Object.keys(tests),
		name,
		start,
		test = {},
		timer;

	// Print the succes message for a test case
	function printSucces() {

		var print = '\u001b[37m' + name + ': \u001b[32mSucces ',
			time = Date.now() - start;

		// Print execution time color depending on its value
		if (time > 2 * config.timeout / 3) {
			print += '\u001b[31m';
		} else if (time > config.timeout / 3) {
			print += '\u001b[33m';
		}

		// Add the execution time value and reset color
		print += '[' + time + ' ms]\u001b[39m';

		// Print the message
		console.log(print);
	}

	// The end of a test case
	function done() {
		if (!failed) {
			clearTimeout(timer);

			printSucces();

			// Execute a function on test end if defined
			onAfter();
		}
	}

	// Execute a function after a test case
	function onAfter() {

		// Callback for after function
		function afterCallback() {
			context.run(onRun);
		}

		// After test process
		if (typeof config.after === 'function') {
			config.after(afterCallback);
		} else {
			context.run(onRun);
		}
	}

	// Execute a function before a test case
	function onBefore() {

		// Callback for before function
		function beforeCallback() {
			setTimer();
			tests[name](test);
		}

		// Before test process
		if (typeof config.before === 'function') {
			config.before(beforeCallback);
		} else {
			setTimer();
			tests[name](test);
		}
	}

	// Test suite end callback
	function onEnd() {

		// Execute the test suite end function
		if (typeof config.end === 'function') {
			config.end();
		}

		// Execute the callback when all tests are done
		if (!failed && typeof callback === 'function') {
			callback();
		}
	}

	// Domain error listener
	function onError(error) {
		failed = true;
		clearTimeout(timer);
		console.error(name + ': \u001b[31mFail\u001b[39m\n');
		console.error(error.stack + '\n');
		onEnd();
	}

	// Timeout listener
	function onTimeout() {
		failed = true;
		throw new Error('Time limit has been exceeded');
	}

	// Domain run callback
	function onRun() {
		if (!failed) {
			name = keys.shift();
			runNext();
		}
	}

	// Run next test case
	function runNext() {
		if (typeof name === 'string' && typeof tests[name] === 'function') {
			start = Date.now();
			onBefore();
		} else if (typeof name === 'string') {
			throw new Error('Invalid Test Structure');
		} else {
			onEnd();
		}
	}

	// Set a limit for test execution
	function setTimer() {
		timer = setTimeout(onTimeout, config.timeout);
	}

	// Start the test chain
	function setup() {
		context.on('error', onError).run(onRun);
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
	console.log('\u001b[39m\u001b[37mRunning ' + keys.length + ' tests:\n');

	// Set an empty object for config if not defined
	if (typeof config === 'function') {
		callback = config;
		config = {};
	} else if (typeof config !== 'object') {
		config = {};
	}

	// Set the timeout for a test case
	if (!config.timeout || typeof config.timeout !== 'number') {
		config.timeout = 1000;
	}

	// Start the test suite
	if (typeof config.start === 'function') {
		config.start(setup);
	} else {
		setup();
	}
}
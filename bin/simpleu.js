#!/usr/bin/env node
'use strict';

var fs = require('fs'),
	path = require('path'),
	simpleu = require('simpleu');

// Unit test runner prototype constructor
var runner = function () {
	this.container = [];
};

// Run the list of test files files
runner.runSuite = function (files, index, callback) {

	var filename = files[index],
		start = 0,
		suite = null;

	// Check if there are more files to run
	if (index < files.length) {

		// Remove the previous test case and prepare the current one
		delete require.cache[files[index - 1]];
		suite = require(filename);

		// Check for the tests object
		if (typeof suite.tests !== 'object') {
			throw new Error('simpleU: Invalid Test Structure');
		}

		// Check for the config object
		if (typeof suite.config !== 'object') {
			suite.config = {};
		}

		// Print message for current test suite
		console.log('\u001b[33mFile: ' + filename);

		// Get execution start time
		start = Date.now();

		// Execute the current test suite
		simpleu(suite.tests, suite.config, function () {

			// Print execution time for current test suite
			console.log('\n\u001b[34mTime [' + (Date.now() - start) + ' ms]\n');

			// Get next file to read
			runner.runSuite(files, index + 1, callback);
		});
	} else {
		callback();
	}
};

// Start a new unit tests runner
runner.start = function (instance) {

	var ready = 0,
		total = process.argv.length - 2;

	// Check when the arguments are ready to run the test suites
	function prepareArguments() {

		var start = Date.now();

		// Show a message when all test suites are done
		function onEnd() {

			var end = Date.now() - start;

			// Print the message
			console.log('All tests are done \u001b[34m[' + end + ' ms]');

			// Reset to white color
			process.stdout.write('\u001b[39m');
		}

		// Increase the number of ready arguments
		ready++;

		// Check if all arguments are ready
		if (ready === total) {
			runner.runSuite(instance.container, 0, onEnd);
		}
	}

	// Get the provided paths
	process.argv.slice(2).forEach(function (argument) {

		var location = path.join(process.cwd(), argument);

		// Check root directory stats and prepare the cache container
		fs.stat(location, function (error, stats) {
			if (error) {
				console.error('\nsimpleU: Can not read "' + location + '"');
				throw error;
			} else if (stats.isDirectory()) {
				instance.addDirectory(location, prepareArguments);
			} else {
				instance.container.push(location);
				prepareArguments();
			}
		});
	});
};

// Cache the provided directory
runner.prototype.addDirectory = function (location, callback) {

	var that = this;

	// Process the firectory elements
	function processDirectory(files) {

		// Add the files
		if (files.length) {
			that.addElement(location, files, callback);
		} else {
			callback();
		}
	}

	// Read the directory content
	fs.readdir(location, function (error, files) {
		if (error) {
			console.error('\nsimpleU: Can not read "' + location + '"');
			console.error(error.stack + '\n');
		} else {
			processDirectory(files);
		}
	});
};

// Check the stats of the provided location
runner.prototype.addElement = function (location, stack, callback) {

	var name = path.join(location, stack.shift()),
		that = this;

	// Get next element
	function getNext() {
		if (stack.length) {
			that.addElement(location, stack, callback);
		} else {
			callback();
		}
	}

	// Check element stats and add it to the cache
	fs.stat(name, function (error, stats) {

		// Check for errors and add the element to the cache
		if (error) {
			console.error('\nsimpleU: Can not read "' + name + '"');
			console.error(error.stack + '\n');
		} else if (stats.isDirectory()) {
			that.addDirectory(name, getNext);
		} else if (name.substr(-8) === '.test.js') {
			that.container.push(name);
			getNext();
		} else {
			getNext();
		}
	});
};

// Start the tests processing
runner.start(new runner());
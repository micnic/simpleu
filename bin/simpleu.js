#!/usr/bin/env node
var fs = require('fs'),
	path = require('path'),
	runSuite = require('simpleu'),
	loaderObj = null,
	start = 0;

var loader = function (path) {
	this.path = path;
	this.tests = [];
}

loader.prototype.setPath = function (path) {
	this.path = path;
	this.tests = [];
}

loader.prototype.loadFromDirectory = function (callback) {

	function walk(dir, done) {

		var results = [],
			stats = fs.statSync(dir);

		function chectFileType(file) {
			if (file.slice(-8) === '.test.js') {
				results.push(file);
			}
		}

		// if specified path is file return this file as test
		if (stats.isFile()) {
			chectFileType(dir);
			done(null, results);
			return;
		}

		fs.readdir(dir, function (err, list) {
			if (err) return done(err);
			var pending = list.length;
			if (!pending) return done(null, results);
			list.forEach(function (file) {
				file = dir + '/' + file;
				fs.stat(file, function (err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function (err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
					} else {
						chectFileType(file);
						if (!--pending) done(null, results);
					}
				});
			});
		});
	}
	walk(this.path, callback);
};

function runner(testFiles, callback) {

	var testFile = testFiles.pop(),
		testsFromFile,
		testsObject,
		configObject;

	if (testFile) {

		testsFromFile = require(testFile);

		// check test structure
		if (testsFromFile.tests && testsFromFile.tests instanceof Object) {
			testsObject = testsFromFile.tests;
		}else {
			throw new Error('Invalid Test Structure');
		}

		// set config for test
		if (testsFromFile.config && testsFromFile.config instanceof Object) {
			configObject = testsFromFile.config;
		} else {
			configObject = {};
		}

		console.log('\u001b[33mBegin test for file: ' + testFile);
		var start = Date.now();
		runSuite(testsObject, configObject, function () {
			console.log('\n\u001b[34mTime [' + (Date.now() - start) + ' ms]');
			console.log('\u001b[33mEnd test for file: ' + testFile + '\n\n');

			runner(testFiles, callback);
		});
	} else {
		callback();
	}
}

function runFromPaths(arrPath, loader, callback) {

	var fullPath = path.join(process.cwd(), arrPath.pop());

	loader.setPath(fullPath);

	loader.loadFromDirectory(function (err, tests) {
		if (err) {
			throw new Error(err);
		}
		runner(tests, function () {

			if (arrPath.length > 0) {
				runFromPaths(arrPath, loader, callback);
			} else {
				callback();
			}
		})
	});
}

loaderObj = new loader();
start = Date.now();

if (process.argv.length < 3) {
	throw new Error('simpleU: Need path to tests files');
}

runFromPaths(process.argv.slice(2), loaderObj, function () {
	console.log('All tests finished \u001b[34m[' + (Date.now() - start) + ' ms]\u001b[39m');
});
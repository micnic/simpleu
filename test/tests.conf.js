module.exports = {
    'timeout': 1000,
    'start': function (callback) {
        console.log('global start');
        callback();
    },
    'before': function(callback) {
        console.log('global before');
        callback();
    },
    'after': function(callback) {
        console.log('global after');
        callback();
    },
    'end': function () {
        console.log('global end');
    }
};
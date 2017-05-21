var moment = require('moment')

console.log(moment().format());
var now = moment();
console.log('Current timestamp', now.unix());

var timestamp = 1495362867;
var currentMoment = moment.unix(timestamp)
console.log("Current moment", currentMoment.format("YYYY, MM, DD"));

console.log("Current moment", currentMoment.format("MMMM Do, YYYY @ H:m A"));

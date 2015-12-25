var fs = require("fs");

var fsModule = {};
var filePath = 'public/searchHistory.txt';
fsModule.writeToFile = function(searchId, url, cb) {
	// Create a writable stream
	var writerStream = fs.createWriteStream(filePath);
	searchId =searchId + ' -- '+ new Date().toLocaleString();
	var data = ',' + searchId + ':' + url;

	console.log('Wrting to file : ' + searchId + " " + url + " " + data);

	writerStream.write(data, 'UTF8');

	// Mark the end of file
	writerStream.end();

	// Handle stream events --> finish, and error
	writerStream.on('finish', function() {
		console.log("Write completed.");
		cb();
	});

	writerStream.on('error', function(err) {
		console.log(err.stack);
	});

	console.log("Program Ended");
};


fsModule.readFromFile = function(searchId, cb) {
	var readerStream = fs.createReadStream(filePath);

	// Set the encoding to be utf8. 
	readerStream.setEncoding('UTF8');

	// Handle stream events --> data, end, and error
	readerStream.on('data', function(chunk) {
		data += chunk;

	});

	readerStream.on('end', function() {
		console.log(data);
		var url = fsModule.getURLBasedOnId(data, searchId);
		cb(url);
	});

	readerStream.on('error', function(err) {
		console.log(err.stack);
	});

	console.log("Program Ended");

};

fsModule.getURLBasedOnId = function(data, searchId) {
	var dString = data;
	dString = '{' + data + '}';
	if (dString.indexOf('{,') === 0) {
		dString = dString.substring(1);
	}
	var json = JSON.parse(dString);
	var url = json[searchId] || 'no url';
	return url;
};
module.exports = fsModule;
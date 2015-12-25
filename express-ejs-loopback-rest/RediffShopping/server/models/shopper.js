module.exports = function(Shopper) {

	Shopper.authenticate = function(username, password, cb) {
		var accessToken = 'adfaseere33434343s434' + Math.random();
		var filter = {
			where: {
				username: username
			},
			limit: 1
		};

		console.log('-------Validating username and passwrod : ' + username + ' : ' + password);
		var findOneCb = function(err, result) {
			console.log('----------Inside Callback findOneCB: error: ' + err + ' response :' + result);
			try {
				var response = {};
				if (result && result.password === password) {
					response = {
						accessToken: accessToken,
						authentication: 'success',
						shopper: result
					};
				} else if (err || (result && result.password !== password)) {
					response = {
						authentication: 'failed'
					};
				}

				cb(null, response);
			} catch (e) {
				console.log('error ' + e);
				cb(null, {});
			}

		};
		Shopper.findOne(filter, findOneCb);
	};
	var replaceSearchString = function(rediffService, searchString) {
		var url = rediffService.settings.operations[0].template.url;
		var startIdx = url.indexOf('/productv2/');
		var endIdx = url.indexOf('/?output');
		var newURL = url.substring(0, startIdx + 11) + searchString + url.substring(endIdx);
		console.log('--------------new url ' + newURL);
		return newURL;
	}
	Shopper.searchRediff = function(searchString, cb) {

		console.log('-------------searchRediff : ' + searchString);

		var rediffService = Shopper.app.dataSources.RediffService;

		rediffService.settings.operations[0].template.url = replaceSearchString(rediffService, searchString);

		console.log('-------------URL To be	 Hit : ' + rediffService.settings.operations[0].template.url);

		rediffService.find(searchString, function(err, response, context) {
			console.log('----------Inside Callback: error: ' + err + ' response :' + response);
			if (err) {
				response = [];
			}
			cb(null, response);

		});

	};

	Shopper.remoteMethod(
		'authenticate', {
			http: {
				path: '/authenticate',
				verb: 'post'
			},
			accepts: [{
				arg: 'username',
				type: 'string'
			}, {
				arg: 'password',
				type: 'string'
			}],

			returns: {
				root: 'true',
				type: 'object'
			}
		});

	Shopper.remoteMethod(
		'searchRediff', {
			http: {
				path: '/searchRediff',
				verb: 'get'
			},
			accepts: [{
				arg: 'searchString',
				type: 'string'
			}],
			returns: {
				root: 'true',
				type: 'object'
			}
		});


};
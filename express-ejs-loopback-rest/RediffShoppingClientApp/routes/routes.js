var express = require('express');
var router = express.Router();
var restModule = require('./restController');
var fsModule = require('./fsModule');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Welcome to Rediff Shopping'
	});
});

router.get('/register', function(req, res, next) {
	res.render('registration-page', {
		title: 'Please fill the below form',
		shopper: {}
	});
});

router.get('/searchProducts', function(req, res, next) {
	var searchString = req.param('query');
	restModule.log('Search String is: ' + searchString);

	restModule.searchProducts(searchString, function(data, url) {
        
        fsModule.writeToFile(searchString,url, function(){
			console.log('written', url);
		});


		res.send(data || {
			'response': 'Some error'
		});
	});

});

router.post('/submit', function(req, res, next) {
	restModule.log('reached submitRegistration' + req.body.username);

	restModule.registerUser(req, function(data) {
		restModule.log('registerUser callback data :' + data);
		data = JSON.parse(data);
		restModule.log('registerUser callback :' + data);

		try {
			if (data && data.username) {
				restModule.log('registerUser callback valid data recieved : ' + data.username);

				res.render('welcome', {
					title: 'welcome',
					shopper: data
				});
			} else {
				restModule.log('registerUser callback no valid data recieved : ' + data);
				res.render('error');
			}
		} catch (e) {
			restModule.log('registerUser callback some error ' + e);
		}

	});

});


router.get('/login', function(req, res, next) {
	res.render('login-page', {
		title: 'Enter username and password'
	});
});


router.get('/error', function(req, res, next) {

});

router.get('/userDetails', function(req, res, next) {

	var id = req.param('id');

	restModule.log('Get User Detail of : ' + id);

	restModule.findUserById(id, function(data) {
		data = JSON.parse(data);
		restModule.log('Inside userDetails callback ');
		res.render('registration-page', {
			title: 'User Detail Page',
			shopper: data
		});
	});
});

router.post('/authenticate', function(req, res, next) {
	restModule.authenticate(req, function(data) {
		restModule.log(' authenticate cb data :' + data);
		data = JSON.parse(data);
		restModule.log('authenticate cb data :' + data);

		try {
			if (data && data.authentication) {
				restModule.log('authenticate cb valid data recieved : ' + data.authentication);
				if (data.authentication === 'failed') {
					res.render('error', {
						title: 'authentication ' + data.authentication
					});
				} else {
					res.render('search-page', {
						title: 'Search Page',
						shopper: data.shopper
					});
				}
			} else {
				restModule.log('authenticate cb no valid data recieved : ' + data);
				res.render('error', {
					title: 'authentication Failed or some error'
				});
			}
		} catch (e) {
			restModule.log('authenticate cb some error ' + e);
		}
	});
});


router.get('/welcome', function(req, res, next) {

});

module.exports = router;
var express = require('express');
var router = express.Router();
var Compliment = require('../models/compliment');

function randomColor() {
	var colors = ["#FFBF00", "#0080FF","#01DF3A","#FF0080"];
	return colors[Math.floor(Math.random()*colors.length)];
}

function randomCompliment (compliments) {
	return compliments[Math.floor(Math.random()*compliments.length)];
}

/* GET compliment form. */
router.get('/compliment_form', function(req, res, next) {
	var color = randomColor();
	res.render('compliment_form', { title: 'WDI Emergency Compliment', color: color });
});

/* GET home page with queried name. */
router.get('/(:name)?', function(req, res, next) {
	name = req.params.name || "Friend";
	var color = randomColor();
	Compliment.find({}, function(err, compliments) {
		if (err) console.log('Database Error:', err)

		console.log('Compliments ', compliments);

		var randomComp = randomCompliment(compliments);

		console.log('Random compliments: ', randomComp);

		res.render('index', {
			title: 'WDI Emergency Compliment',
			color: color,
			name: name,
			compliment: randomComp.compliment
		  });

	})
	});

	// USE MONGOOSE TO GET A RANDOM COMPLIMENT FROM THE DATABASE, THEN RENDER THE VIEW

	 //var compliment = null // this line is just here to temporarily prevent an undefined error. You can remove it once you get a real compliment from the DB.




/* POST compliment. */
router.post('/', function(req, res, next) {
	var newCompliment = new Compliment({
		compliment: req.body.compliment
	});

	newCompliment.save(function(err, compliment, next){
		if(err){
			res.status(500).send({
				status: 'Error',
				error: err
			});
		} else {
			res.redirect('/');
		//	res.status(200).json({
			//	status: 'OK',
				//compliment: compliment
			//});
		}
	});
	// USE MONGOOSE TO SAVE A NEW COMPLIMENT TO THE DATABASE, THEN REDIRECT TO THE ROOT URL

});

module.exports = router;

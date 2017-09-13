var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

/* GET home page. */
router.get('/', (req, res, next) => {
	  Restaurant.find({}).select('name description location -_id').exec((error, restaurants) => {
	  	if (error) {
	  		next(error);
	  	} else {
	  		res.render('restaurants/index', { restaurants });
	  	}
	  })
	})
	
router.post('/', (req, res, next) => {
  	var restaurant = new Restaurant();
  	restaurant.name = req.body.name;
  	restaurant.description = req.body.description;
  	restaurant.location.type = 'Point';
  	restaurant.location.coordinates = [req.body.longitude, req.body.latitude];
  	restaurant.save((error) => {
  		if (error) {
  			next(error);
  		} else {
  			res.redirect('/');
  		}
  	})
  	
  });


router.get('/new', (req, res, next) => {
		res.render('restaurants/new');
	});

router.get('/:restaurant_id', (req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/show', {restaurant});
			}
		})
	})

router.post('/:restaurant_id', (req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				restaurant.name = req.body.name;
				restaurant.description = req.body.description;
				restaurant.location.coordinates = [req.body.longitude, req.body.latitude];
				restaurant.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	})
			}
		})
	});

router.get('/:restaurant_id/edit', (req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/update', { restaurant });
			}
		})
	});

router.get('/:restaurant_id/edit', (req, res, next) => {
		Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')	
	    }
    });
	});

module.exports = router;

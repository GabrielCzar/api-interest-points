module.exports = function (app) {
	let cheerio = require('cheerio')
	,   request = require('request')
	,   overpass = require('query-overpass');

	return {
		index: function (req, res) {
			res.render('pt-index')
		},
		us_index: function (req, res) {
			res.render('us-index')
		},
		city: function (req, res) {

			coord = req.params

			box = `${coord.ilat},${coord.ilon},${coord.flat},${coord.flon}`

			query = `
				node(${box})[amenity];out;
			 `.replace(/\s/g, '')

			overpass(query, (err, data) => {			
				if (data.hasOwnProperty('features')) {
					data = data.features

					let amenities = unique = [...new Set(data.map(value => value.properties.tags.amenity))];

					console.log('amenities >> ' + amenities.length);

					data = data.map(value => Object.assign({}, {
						id: value.properties.id
					,	amenity: value.properties.tags.amenity
					,	name: value.properties.tags.name || ''
					,	lat: value.geometry.coordinates[1]
					, 	lon: value.geometry.coordinates[0]
					,   geometry: value.geometry
					})).filter(value =>	value['name'] !== '');

					console.log('interest points >> ' + data.length)

					res.json(data);
				} else 
					res.json([]);
			});

		},
		scrape_cities: function (req, res) {
			let OSM_URL = 'http://download.bbbike.org/osm/bbbike/'

			request(OSM_URL, function (err, rs, html) {
				if (!err) {
					let $ = cheerio.load(html);

					let list = $('tbody').first().children()

					let data = []
					Object.keys(list).forEach(key => {
						value = list[key]
						if (key !== '0' && value !== 'undefined' && value.hasOwnProperty('children'))
							data.push(value.children[0].children[0].children[0].data)
					})
					
					console.log('cities: ' + data.length)
					
					res.json(data)
				}
			})
		},
		scrape_location: function (req, res) {
			let params = req.params;
			let city = params.city;

			let LOCATION_URL = `http://download.bbbike.org/osm/bbbike/${city}/${city}.poly`

			request(LOCATION_URL, function (err, rs, html) {
				if (!err) {
					let $ = cheerio.load(html);

					let data = $('body').first().text();
					data = data.split('\n').splice(2, 4);
					firstPoint = data[0].slice(3).split(' ').reverse().join().split(',,')
					lastPoint = data[2].slice(3).split(' ').reverse().join().split(',,')
					result = firstPoint.concat(lastPoint)

					res.json(result)
				}
			});
		},
		interest_points: function (req, res) {
			let params = req.params;
			let city = params.city;
			let coords = [];

			let LOCATION_URL = `http://download.bbbike.org/osm/bbbike/${city}/${city}.poly`

			request(LOCATION_URL, function (err, rs, html) {
				if (!err) {
					let $ = cheerio.load(html);

					let data = $('body').first().text();
					data = data.split('\n').splice(2, 4);
					firstPoint = data[0].slice(3).split(' ').reverse().join().split(',,')
					lastPoint = data[2].slice(3).split(' ').reverse().join().split(',,')
					result = firstPoint.concat(lastPoint)

					let [ ilat, ilon, flat, flon ] = result;

					box = `${ilat},${ilon},${flat},${flon}`

					query = `node(${box})[amenity];out;`.replace(/\s/g, '')

					overpass(query, (err, data) => {			
						if (data !== undefined 
							&& data.hasOwnProperty('features')) {
							data = data.features

							let amenities = unique = [...new Set(data.map(value => value.properties.tags.amenity))];

							console.log('amenities >> ' + amenities.length);

							data = data.map(value => Object.assign({}, {
								id: value.properties.id
							,	amenity: value.properties.tags.amenity
							,	name: value.properties.tags.name || ''
							,	lat: value.geometry.coordinates[1]
							, 	lon: value.geometry.coordinates[0]
							,   geometry: value.geometry
							})).filter(value =>	value['name'] !== '');

							console.log('interest points >> ' + data.length)

							res.json(data);
						} else 
							res.json([]);
					});
				}
			});
		},
		localization: function (req, res) {
			const params = req.params;
			const city = params.city;

			const LOCATION_URL = `http://download.bbbike.org/osm/bbbike/${city}/${city}.poly`

			if (city.includes('Quixada')) {
				res.json({
					initial: {
						latitude: "-4.87714", 
						longitude: "-39.17844"
					},
					final: {
						latitude: "-5.08715", 
						longitude: "-38.8928"
					}
				});
				return;
			}

			request(LOCATION_URL, function (err, rs, html) {
				if (!err) {
					let $ = cheerio.load(html);

					let data = $('body').first().text();
					data = data.split('\n').splice(2, 4);
					firstPoint = data[0].slice(3).split(' ').reverse().join().split(',,')
					lastPoint = data[2].slice(3).split(' ').reverse().join().split(',,')
					result = firstPoint.concat(lastPoint)
					
					let [ ilat, ilon, flat, flon ] = result;

					res.json({
						initial: {
							latitude: ilat,
							longitude: ilon
						},
						final: {
							latitude: flat,
							longitude: flon
						}
					});
				};
			});	
		},
		amenities: function (req, res) {

		},
		api_error: function (req, res) {
			res.status(400).send({ error: 'Bad Request'})
		},
		pt_error: function (req, res) {
			res.render('pt-error')
		},
		us_error: (req, res) => {
			res.render('us-error')
		}
	}
}

module.exports = function (app) {
	
	return {
		index: function (req, res) {
			res.render('index')
		},
		city: function (req, res) {
			let overpass = require('query-overpass')

			coord = req.params

			box = `${coord.ilat},${coord.ilon},${coord.flat},${coord.flon}`

			query = `
				node(${box})[amenity];out;
			 `.replace(/\s/g, '')

			overpass(query, (err, data) => {			
				data = data.features

				let amenities = unique = [...new Set(data.map(value => value.properties.tags.amenity))];

				console.log(amenities.length);

				data = data.map(value => Object.assign({}, {
					id: value.properties.id
				,	amenity: value.properties.tags.amenity
				,	name: value.properties.tags.name
				,	lat: value.geometry.coordinates[1]
				, 	lon: value.geometry.coordinates[0]
				})).filter(value =>
					(value.hasOwnProperty('name') !== 'undefined') &&
					(value.hasOwnProperty('lat') !== 'undefined') &&
					(value.hasOwnProperty('lon') !== 'undefined')
				);

				console.log(data.length)

				res.json(data);
			});

		},
		scrape: function (req, res) {
			let cheerio = require('cheerio')
			,   request = require('request');

			let osm_url = 'http://download.bbbike.org/osm/bbbike/'

			request(osm_url, function (err, rs, html) {
				if (!err) {
					var $ = cheerio.load(html);

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
		}
	}
}

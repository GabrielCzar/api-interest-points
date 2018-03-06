module.exports = function (app) {
	let overpass = require('query-overpass')

	return {
		index: function (req, res) {
			res.render('index')
		},
		city: function (req, res) {
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

		}
	}
}

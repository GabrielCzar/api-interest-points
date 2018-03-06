module.exports = function (app) {
	let overpass = require('query-overpass')

	return {
		index: function (req, res) {
			res.json('Api')
		},
		city: function (req, res) {
			coord = req.params

			box = `${coord.ilat},${coord.ilon},${coord.flat},${coord.flon}`

			query = `
				node(${box});out;
			 `.replace(/\s/g, '')

//			  	way(${box})["amenity"="restaurant"];out;
//			  	relation(${box})["amenity"="restaurant"];out;

			overpass(query, (err, data) => {			
				data = data.features

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

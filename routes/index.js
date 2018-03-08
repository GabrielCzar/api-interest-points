module.exports = function (app) {
	var home = app.controllers.index

	app.get('/', home.index)
	app.get('/us', home.us_index)
	app.get('/ilat/:ilat/ilon/:ilon/flat/:flat/flon/:flon/city/*.json', home.city)
	app.get('/scrape-cities', home.scrape_cities)
	app.get('/scrape-location/:city', home.scrape_location)

}

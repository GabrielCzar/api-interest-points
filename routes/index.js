module.exports = function (app) {
	var home = app.controllers.index

	app.get('/', home.index)
	app.get('/us', home.us_index)
	app.get('/scrape-location/:city', home.scrape_location)

	// routes api
	app.get('/api/cities', home.scrape_cities)
	app.get('/api/interest-points/city/:city*', home.interest_points)

	// Deprecated
	app.get('/ilat/:ilat/ilon/:ilon/flat/:flat/flon/:flon/', home.city) 

	// Error page
	app.get('/api*', home.api_error);
	app.get('/us*', home.us_error);
	app.get('*', home.pt_error);
}

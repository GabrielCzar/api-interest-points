module.exports = function (app) {
	var home = app.controllers.index

	app.get('/', home.index)
	app.get('/city/ilat/:ilat/ilon/:ilon/flat/:flat/flon/:flon', home.city)
	// /city/ilat/39.68/ilon/116.08/flat/40.18/flon/116.77
	app.get('/scrape', home.scrape)

}

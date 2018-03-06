module.exports = function (app) {
	var home = app.controllers.index

	app.get('/', home.index)
	app.get('/city/ilat/:ilat/ilon/:ilon/flat/:flat/flon/:flon', home.city)

}

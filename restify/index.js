const restify = require('restify');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'pt'],
  directory: __dirname + '/locales',
  queryParameter: 'lang',
  defaultLocale: 'en',
});

const server = restify.createServer({
  name: 'Interest Points'
});

server.use(i18n.init);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', function (req, res, next) {

  res.send(200, {
    'locale' : req.getLocale(),
    'somevartoreturn': res.__('Hello'),
  });
  return next();
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Running on http://localhost:3000')
});

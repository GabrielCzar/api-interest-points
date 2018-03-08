let express = require('express')
,   load = require('express-load') 
,   bodyParser = require('body-parser')
,   router = express.Router()

let app = express()

// configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// load
load('controllers').then('routes').into(app);

// Server listen
app.listen(app.get('port'), () => { console.log('Api for Interest Points from Overpass') })

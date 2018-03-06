let express = require('express')
,   load = require('express-load') 
,   bodyParser = require('body-parser')
,   router = express.Router()

let app = express()

// configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

load('controllers').then('routes').into(app);

app.listen(app.get('port'), () => { console.log('Api for Interest Points from Overpass') })

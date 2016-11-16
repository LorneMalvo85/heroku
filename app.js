var restify = require('restify');
var assert = require('assert')
var config = require('./config');
var morgan = require("morgan");
var app = restify.createServer({
    name: 'REST-api'
});

var corsMiddleware = require('restify-cors-middleware');
var cors = corsMiddleware({
    origins: ['*']
        /* ,allowHeaders: ['API-Token'],
         exposeHeaders: ['API-Token-Expiry']*/
});

app.pre(cors.preflight);
app.use(cors.actual);
app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(morgan('dev')); // LOGGER
app.use(restify.CORS({
    origins: ['*'],
    credentials: true, // defaults to false
    headers: [''] // sets expose-headers
}));

app.listen(config.port, function() {
    console.log('server listening on port number', config.port);
});
var routes = require('./routes')(app);
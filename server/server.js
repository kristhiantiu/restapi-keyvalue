require('./config/config');

var {mongoose} = require('./db/mongoose');

const express = require('express');
var app = express();

var cors = require('cors');
app.use(cors())

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    next();
});

const rateLimit = require("express-rate-limit");
app.enable("trust proxy");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

var object = require('../object/object');
app.use('/object', object);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Started on port ${port}`);    
});

module.exports = {
    app
}
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
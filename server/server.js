require('./config/config');
const port = process.env.PORT;
var cors = require('cors');
const express = require('express');
var app = express();

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

app.listen(port, () => {
    console.log(`Started on port ${port}`);    
});

module.exports = {
    app
}
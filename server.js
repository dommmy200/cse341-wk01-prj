const express = require('express');
const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const router = require('./routes');
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', router);

mongodb.initDatabase((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Database: listing; Server: running on Port: ${port}`);
        });
    }
});
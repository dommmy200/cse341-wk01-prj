const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const router = require('./routes');
const mongodb = require('./data/database');


const port = process.env.PORT || 3000;

app.use(express.json());
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
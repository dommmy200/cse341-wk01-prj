const express = require('express');
const router = express.Router();

const contactsRoute = require('./contacts');

router.get('/', (req, res) => {
    res.send('Hello My World!');
});

router.use('/contacts', contactsRoute);

module.exports = router;
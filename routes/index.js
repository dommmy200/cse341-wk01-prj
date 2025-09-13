const express = require('express');
const router = express.Router();

const contactsRoute = require('./contacts');

router.get('/', (req, res) => {
    //swagger.tags=['Hello World']
    res.send('Hello My World!');
});

router.use('/', require('./swagger'))
router.use('/contacts', contactsRoute);

module.exports = router;
const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');

router.get('/', contactController.getAll);
router.get('/:id', contactController.getSingle);
router.post('/posts', contactController.insertPosts);
router.put('/posts/:id', contactController.updateRecords);
router.delete('/delete/:id', contactController.deleteOne);

module.exports = router;
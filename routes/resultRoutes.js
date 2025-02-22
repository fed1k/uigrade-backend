const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitAnswer);
router.post('/check', resultController.checkAnswer);

module.exports = router;

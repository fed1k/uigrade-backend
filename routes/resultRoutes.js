const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitAnswer);
router.post('/check', resultController.checkAnswer);
router.post('/result', resultController.createResult);
router.get('/result', resultController.getResults);
router.post("/mark-incomplete", resultController.markInComplete)
router.get("/result/:result_id", resultController.getResult)

module.exports = router;

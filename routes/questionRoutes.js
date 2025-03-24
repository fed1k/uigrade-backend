const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const uploadService = require("../services/uploadService");

router.get('/questions', questionController.getQuestionsByLevel);
router.post('/questions', uploadService.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }]), questionController.addQuestion);
router.delete("/questions", questionController.deleteQuestion)
router.patch('/questions', uploadService.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }]), questionController.editQuestion);

module.exports = router;

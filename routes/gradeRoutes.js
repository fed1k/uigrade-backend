const express = require('express');
const router = express.Router();
const gradeController = require("../controllers/gradeController")

const route = "/grade"
router.get(route, gradeController.getGrades)
router.post(route, gradeController.addGrade)
router.patch(route, gradeController.editGrade)
router.delete(route, gradeController.deleteGrade)


module.exports = router;
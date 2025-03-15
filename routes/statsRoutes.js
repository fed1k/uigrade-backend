const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statisticsController');

const route = "/stats";
const tgRoute = "/tg_visit"
const finished = "/finished"
const unfinished = "/unfinished"

router.get(route, statsController.getStatistics);
router.post(tgRoute, statsController.addTgVisitorCount)
router.post(finished, statsController.incrementFinishedCount)
router.post(unfinished, statsController.incrementUnfinishedCount)

module.exports = router
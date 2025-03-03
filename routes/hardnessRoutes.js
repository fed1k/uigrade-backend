const express = require('express');
const router = express.Router();
const hardnressController = require('../controllers/hardnessController');

const route = "/hardness"
router.get(route, hardnressController.getHardnessLevels)
router.post(route, hardnressController.addHardnessLevel)
router.delete(route, hardnressController.deleteHardnessLevel)
router.patch(route, hardnressController.editHardnessLevel)

module.exports = router;
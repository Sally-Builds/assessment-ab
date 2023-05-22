const express = require('express');
const controller = require("./controller")

const router = express.Router();

router.route('/').post(controller.create)
router.route('/:order_id').get(controller.get)
router.route('/:id').patch(controller.completePayment)


module.exports = router;
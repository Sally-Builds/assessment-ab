const express = require('express');
const controller = require("./controller")
const authenticate = require('./middleware/authenticate')

const router = express.Router();

router.route('/checkout/:id').post(authenticate.protect, controller.checkout)
router.route('/checkout/complete/:id').patch(authenticate.protect, controller.completeOrder)

router
  .route('/')
  .post(authenticate.protect, controller.create)

router
  .route('/:id')
  .patch(authenticate.protect, controller.updateStatus)
  .get(authenticate.protect, controller.getOrder)

module.exports = router;
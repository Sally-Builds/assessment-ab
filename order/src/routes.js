const express = require('express');
const controller = require("./controller")
const authenticate = require('./middleware/authenticate')

const router = express.Router();

router.route('/checkout').post(authenticate.protect, controller.checkout)

// router
//   .route('/')
//   .post(controller.create)
//   .get(blogController.getAllBlogs);

module.exports = router;
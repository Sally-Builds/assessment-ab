const express = require('express');
const controller = require("./controller")

const router = express.Router();

router.route('/login').post(controller.login)

router
  .route('/')
  .post(controller.create)
//   .get(blogController.getAllBlogs);

module.exports = router;
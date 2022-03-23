const router = require('express').Router();
const {
  createReview,
  getSingleReview,
} = require('../../controllers/review-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user

router.route('/:imbdID').get(getSingleReview);
router.route('/:imbdID').post(authMiddleware, createReview);

module.exports = router;
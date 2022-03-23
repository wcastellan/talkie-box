const { Review } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleReview({ params }, res) {
    const foundReview = await Review.find({imdbID: params.imdbID});

    if (!foundReview) {
      return res.status(400).json({ message: 'Cannot find a review with this id!' });
    }

    res.json(foundReview);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createReview({ body }, res) {
    const review = await review.create(body);

    if (!review) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    res.json({ review });
  },
};
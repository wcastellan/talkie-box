const { AuthenticationError } = require("apollo-server-errors");
const { User, Media, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .select("-__v -password");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveMedia: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedMedias: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeMedia: async (parent, { imdbID }, context) => {
      if (context.user) {

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMedias: { imdbID: imdbID } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addReview: async (parent, args, context) => {
    //   if (context.user) {
    //     const review = await Review.create({ ...args, username: context.user.username })
    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { reviews: review._id } },
    //       { new: true }
    //     );
    //     return review;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    addReview: async (parent, { input }, context) => {
      if (context.user) {

        const imdbID = input.imdbID
        const rest = {"username": input.username, "reviewText": input.reviewText}
        const updateMedia = await Media.findOneAndUpdate(
          {imdbID: imdbID},
          { $addToSet: { review: rest} },
          { new: true, runValidators: true }
        );
        return updateMedia;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
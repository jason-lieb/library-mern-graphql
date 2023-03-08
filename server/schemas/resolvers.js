const { Book, User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return User.findOne(args.id).populate('book')
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      const correctPw = await user.isCorrectPassword(password)
      if (!correctPw) return
      const token = signToken(user)
      return { token, user }
    },
    addUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password })
    },
    saveBook: async (
      parent,
      { bookId, authors, description, title, image, link }
    ) => {
      // return await User.findOneAndUpdate(
      //   { _id: user._id },
      //   { $addToSet: { savedBooks: body } },
      //   { new: true, runValidators: true }
      // )
    },
    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ bookId })
    },
  },
}

module.exports = resolvers

// server-side utility functions

const mongoose = require('mongoose');

/**
 * Check if valid mongoose ObjectId.
 * @param {String} x variable to check
 * @return {Boolean} true if valid; false otherwise
 */
const validId = (x) => mongoose.Types.ObjectId.isValid(x);

/**
 * Determine if a user is logged in based on the request.
 * @param {Object} req Express request object
 * @return {Boolean} true if logged in; false otherwise
 */
const loggedIn = (req) => validId(req.session.uid);

module.exports = {
  loggedIn,
  validId,
};
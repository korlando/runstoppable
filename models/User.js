const { UNIT_ENUM } = require('../constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  un: { // username
    type: String,
    required: true,
  },
  em: { // email
    type: String,
    required: true,
  },
  name: String,
  pw: String, // password
  pic: String, // profile pic
  dc: { // date created
    type: Date,
    default: Date.now,
  },
  dm: Date, // date modified
  gid: String, // google ID
  gtoken: String, // google token
  units: {
    type: String,
    enum: UNIT_ENUM,
  },
}, {
  autoIndex: false,
});

module.exports = (conn) => conn.model('User', UserSchema);
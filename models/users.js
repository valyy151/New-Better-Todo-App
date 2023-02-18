const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [3, 'Password must have at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post('save', function (doc, next) {
  console.log('New user was created and saved', doc);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Username doesnt exist');
};

module.exports = mongoose.model('users', userSchema);

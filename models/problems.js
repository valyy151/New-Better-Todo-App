const { default: mongoose } = require('mongoose');

const problemsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('problems', problemsSchema);

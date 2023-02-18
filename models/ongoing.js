const { default: mongoose } = require('mongoose');

const ongoingTaskSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	user: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ongoingTasks', ongoingTaskSchema);

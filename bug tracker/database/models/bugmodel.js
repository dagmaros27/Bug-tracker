const mongoose = require('mongoose')

const Bug = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String},
		priority: { type: String, required: true },
        status: { type: String, required: true },
        assigned: { type: String, required: true},
	},
	{
		timestamps: true,
	},
	{ collection: 'bug-data' }
)

const model = new mongoose.model('BugData', Bug)

module.exports = model
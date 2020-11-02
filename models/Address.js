const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
	houseName: {
		type: String,
		required: true,
	},
	locality: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
		required: true,
	},
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

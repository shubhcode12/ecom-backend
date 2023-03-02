const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
        name: {
			type: String,
			required: true,
			maxLength: 50,
		},	
        address: {
			type: String,
			required: true,
			maxLength: 80,
		},				
        company: {
			type: String,
			required: false,
			maxLength: 50,
		},	
        email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: BigInt64Array,
			required: true,
			unique: true,
		},
		password: {
			type: String,
            required: true,
			unique: true,
		},			
	}
);
const MyModel = mongoose.model("user", userSchema);

module.exports = MyModel;
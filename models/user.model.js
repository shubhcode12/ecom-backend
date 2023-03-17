const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
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
			type: Number,
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
const MyModel = mongoose.model("users", usersSchema);

module.exports = MyModel;
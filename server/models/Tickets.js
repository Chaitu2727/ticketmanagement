const mongoose = require("mongoose");
//const dummy=require("mongoose-dummy")
const ticketShema = new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
	name: { type: String, required: true },
	// lastName: { type: String, required: true },
	description: { type: String, required: true },
	assignee: { type: String, required: true },
	status:{type:String}

},
{ timestamps: true });
const Ticket = mongoose.model("Ticket", ticketShema);
module.exports=(Ticket)
//  let randomObject = dummy(Ticket, {

//       returnDate: true
  
//   })
  
//   console.log(randomObject);

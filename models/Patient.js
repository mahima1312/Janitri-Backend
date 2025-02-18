const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gender:{type:String,required:true}
});
module.exports = mongoose.model("Patient", patientSchema);

const mongoose = require("mongoose");
const heartRateSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  bpm: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("HeartRate", heartRateSchema);

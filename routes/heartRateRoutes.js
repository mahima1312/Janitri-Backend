const express = require("express");
const HeartRate = require("../models/HeartRate");
const router = express.Router();

// Add Heart Rate Data
router.post("/:patientId", async (req, res) => {
  const { bpm, } = req.body;
  try {
    const heartRate = new HeartRate({ patientId: req.params.patientId, bpm });
    await heartRate.save();
    res.status(201).json({ message: "Heart rate data added", heartRate });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Get Heart Rate Data
router.get("/:patientId", async (req, res) => {
  try {
    const heartRates = await HeartRate.find({ patientId: req.params.patientId });
    res.json(heartRates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

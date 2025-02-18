const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

// Add Patient
router.post("/", async (req, res) => {
  const { name, age, userId,gender } = req.body;
  try {
    const patient = new Patient({ name, age, userId,gender });
    await patient.save();
    res.status(201).json({ message: "Patient added successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add multiple patients
router.post("/addMultiplePatients", async (req, res) => {
  const patients = req.body;  // Assuming the body contains an array of patient objects

  try {
    // Check if the data array is empty
    if (!Array.isArray(patients) || patients.length === 0) {
      return res.status(400).json({ message: "No patients provided" });
    }

    // Create an array of Patient instances
    const patientDocuments = patients.map(patientData => new Patient(patientData));

    // Insert all the patients into the database at once
    await Patient.insertMany(patientDocuments);

    res.status(201).json({ message: "Patients added successfully", patients: patientDocuments });
  } catch (error) {
    console.error("Error adding patients:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// Get Patient Details
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

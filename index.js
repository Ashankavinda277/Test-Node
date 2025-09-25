const express = require("express");
require("dotenv").config();
require("./config/db");
const app = express();  
const PORT = process.env.PORT || 5000;

app.use(express.json());

const patientCollection = require("./model/patient");

app.post("/send-patient", async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = new patientCollection(patientData);
    await newPatient.save();
    res.status(200).send({ message: "Patient data saved successfully", data: newPatient });
  } catch (error) {
    res.status(500).send({ message: "Error saving patient data", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
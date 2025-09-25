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

app.get("/view-patients", async (req, res) => {
  const patient = req.body;
  try {
    const patients = await patientCollection.find();
    res.status(200).send({ message: "Patients retrieved successfully", data: patients });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving patients", error: error.message });
  }
});


app.post("/id", async (req, res) => {
  const id =req.body.id;
  try {
    const data = await patientCollection.findById(id);
    res.status(200).send({
      Message: "Data fetched Successfully",
      Data: data
          });
  } catch (error) {
    res.status(500).send({ message: "Error fetching patient data", error: error.message });
  }
});


app.get("/age/:age", async (req, res) => {
  const ageParam = req.params.age;
  try {
    const age = parseInt(ageParam);
    if (isNaN(age)) {
      return res.status(400).send({
        message: "Age must be a valid number",
        data: null
      });
    }
    const patients = await patientCollection.find({ Age: age });
    res.status(200).send({
      message: "Data fetched Successfully",
      data: patients
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching patient data", error: error.message });
  }
});

app.get("/contact/:contact", async (req, res) => {
  const contact = req.params.contact;
  try {
    const patients = await patientCollection.find({ Phone: contact });
    res.status(200).send({
      message: "Data fetched Successfully",
      data: patients
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching patient data", error: error.message });
  }
});

app.get("/disease/:disease", async (req, res) => {
  const disease = req.params.disease;
  try {
    const patients = await patientCollection.find({ Disease: disease });
    res.status(200).send({
      message: "Data fetched Successfully",
      data: patients
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching patient data", error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
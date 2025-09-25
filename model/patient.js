const mongoose = require("mongoose");

const db = mongoose.connection.useDb("Hospital");

const patientSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Age: {
    type: Number,
  },
  Gender: {
    type: String,
  },
Email:{
    type: String,
},
  Address: {
    type: String,
  },
  Phone: {
    type: String,
  },
    Disease: {
    type: String,
  },
});

const Patient = db.model("Patient", patientSchema);

module.exports = Patient;

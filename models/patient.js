const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  gender: {type: String},
  weightInKgs: {type: Number},
  healthIssue: {type: String},
  phoneNumber: {type: String},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: process.env.userTable },
  createdAt: { type: String, default: () => new Date().toISOString()},
  updatedAt: { type: String, default: () => new Date().toISOString()},
});


module.exports =
    mongoose.models[process.env.patientTable] ||
    mongoose.model(process.env.patientTable, patientSchema);
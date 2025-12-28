const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {type: String},
  specialization: {type: String},
  experienceInYears: {type: Number},
  phoneNumber: {type: String, unique: true},
  email: {type: String, unique: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: process.env.userTable },
  createdAt: { type: String, default: () => new Date().toISOString()},
  updatedAt: { type: String, default: () => new Date().toISOString()},
});


module.exports =
    mongoose.models[process.env.doctorTable] ||
    mongoose.model(process.env.doctorTable, doctorSchema);
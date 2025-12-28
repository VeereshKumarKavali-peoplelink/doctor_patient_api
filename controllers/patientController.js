const mongoose = require('mongoose');
const dbQueries = require("../dbQueries");
const { success, failure } = require("../utils/response");
const errors = require("../utils/error.js");

const createPatientAPI = async (request, response) => {
    const { name, age, gender, weightInKgs, healthIssue, phoneNumber } = request.body;
    try {
        if (name && age && gender && weightInKgs && phoneNumber && healthIssue) {
            const patient = { name, age, gender, weightInKgs, healthIssue, phoneNumber, createdBy: request.user.id };
            const result = await dbQueries.create(
                process.env.patientTable,
                patient
            );
            return success({ status: true, data: result, msg: "Patient Created Successfully" }, response);
        } else {
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS }, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

const getAllPatientsAPI = async (request, response) => {
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;
    try {
        const patientsArray = await dbQueries.find(
            process.env.patientTable,
            {},
            {},
            { skip, limit }
        );
        return success({ status: true, data: patientsArray }, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

const updatePatientAPI = async (request, response) => {
    const { patientId } = request.params;
    const { name, age, gender, weightInKgs, healthIssue, phoneNumber } = request.body;
    try {
        if (name && age && gender && weightInKgs && phoneNumber && healthIssue) {
            const patient = await dbQueries.updateOne(process.env.patientTable, { _id: new mongoose.Types.ObjectId(patientId) }, {  name, age, gender, weightInKgs, healthIssue, phoneNumber, updatedAt: new Date().toISOString(), createdBy: request.user.id }, { new: true });
            return success({ status: true, data: patient, msg: "Patient details updated Successfully" }, response);
        } else {
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS }, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

const deletePatientAPI = async (request, response) => {
   const { patientId } = request.params;
    try {
        const patient = await dbQueries.deleteOne(process.env.patientTable, {_id: new mongoose.Types.ObjectId(patientId)});
        return success({status: true, msg: "Patient Deleted Successfully"}, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

module.exports = { createPatientAPI, getAllPatientsAPI, updatePatientAPI, deletePatientAPI }
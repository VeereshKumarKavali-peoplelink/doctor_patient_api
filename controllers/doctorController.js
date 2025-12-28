const mongoose = require('mongoose');
const dbQueries = require("../dbQueries");
const { success, failure } = require("../utils/response");
const errors = require("../utils/error.js");

//Create Doctor
const createDoctorAPI = async (request, response) => {
    const { name, specialization, experienceInYears, phoneNumber, email } = request.body;
    try {
        if (name && specialization && experienceInYears && phoneNumber && email) {
            const doctor = { name, specialization, experienceInYears, phoneNumber, email, createdBy: request.user.id };
            const result = await dbQueries.create(
                process.env.doctorTable,
                doctor
            );
            return success({ status: true, data: result, msg: "Doctor Created Successfully" }, response);
        } else {
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS }, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

//Get All Doctors (with Pagination)
const getAllDoctorsAPI = async (request, response) => {
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;
    try {
        const doctorsArray = await dbQueries.find(
            process.env.doctorTable,
            {},
            {},
            { skip, limit }
        );
        return success({ status: true, data: doctorsArray }, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


//Update a Doctor
const updateDoctorAPI = async (request, response) => {
    const { doctorId } = request.params;
    const { name, specialization, experienceInYears, phoneNumber, email } = request.body;
    try {
        if (name && specialization && experienceInYears && phoneNumber && email) {
            const doctor = await dbQueries.updateOne(process.env.doctorTable, { _id: new mongoose.Types.ObjectId(doctorId) }, { name, specialization, experienceInYears, phoneNumber, email, updatedAt: new Date().toISOString(), createdBy: request.user.id }, { new: true });
            return success({ status: true, data: doctor, msg: "doctor details updated Successfully" }, response);
        } else {
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS }, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

//Delete a Doctor
const deleteDoctorAPI = async (request, response) => {
    const { doctorId } = request.params;
    try {
        const doctor = await dbQueries.deleteOne(process.env.doctorTable, { _id: new mongoose.Types.ObjectId(doctorId) });
        return success({ status: true, msg: "Doctor Deleted Successfully" }, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

//Get all doctor and patient data 
const getAllDoctorsandPatientsAPI = async (request, response) => {
    try {
        const [doctorsArray, patientsArray] = await Promise.all([
            dbQueries.find(
                process.env.doctorTable,
                {}
            ),
            dbQueries.find(
                process.env.patientTable,
                {}
            )
        ]);
        return success({ status: true, data: {doctorsData: doctorsArray, patientsData: patientsArray}}, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
}


module.exports = { createDoctorAPI, getAllDoctorsAPI, updateDoctorAPI, deleteDoctorAPI, getAllDoctorsandPatientsAPI }
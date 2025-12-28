const express = require('express');
const {  createPatientAPI, getAllPatientsAPI, updatePatientAPI, deletePatientAPI  } = require('../controllers/patientController');
const router = express.Router();
const {authMiddleware, authorize} = require('../middleware/authMiddleware');
const {validatePatient} = require('../middleware/validations');

router.post('/', authMiddleware, authorize(["admin"]), validatePatient, createPatientAPI); 
router.get('/',  getAllPatientsAPI);
router.put('/:patientId', authMiddleware, authorize(["admin"]), validatePatient, updatePatientAPI);
router.delete('/:patientId', authMiddleware, authorize(["admin"]), deletePatientAPI);

module.exports = router;

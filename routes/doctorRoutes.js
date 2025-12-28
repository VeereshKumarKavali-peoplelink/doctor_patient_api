const express = require('express');
const {  createDoctorAPI, getAllDoctorsAPI, updateDoctorAPI, deleteDoctorAPI } = require('../controllers/doctorController');
const router = express.Router();
const {authMiddleware, authorize} = require('../middleware/authMiddleware');
const {validateDoctor} = require('../middleware/validations');

router.post('/', authMiddleware, authorize(["admin"]), validateDoctor, createDoctorAPI); 
router.get('/',  getAllDoctorsAPI);
router.put('/:doctorId', authMiddleware, authorize(["admin"]), validateDoctor, updateDoctorAPI);
router.delete('/:doctorId', authMiddleware, authorize(["admin"]), deleteDoctorAPI);

module.exports = router;

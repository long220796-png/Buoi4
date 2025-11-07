// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

// Định tuyến API cho Sinh viên 1 [cite: 44]
router.post('/signup', authController.signup); 
router.post('/login', authController.login); 
router.post('/logout', authController.logout); 

module.exports = router;
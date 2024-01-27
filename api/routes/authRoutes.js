const express = require('express');
const router = express.Router();
const {registerUser, loginUser,logoutUser, getUserProfile,verifyOTP} = require('../controller/authController');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',getUserProfile);
router.get('/logout',logoutUser);
router.post('/verify/otp',verifyOTP);
module.exports = router;
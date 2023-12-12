const express = require('express');
const router = express.Router();
const {registerUser, loginUser,logoutUser, getUserProfile} = require('../controller/authController');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',getUserProfile);
router.get('/logout',logoutUser);
module.exports = router;
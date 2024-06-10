const express = require('express');
const {AuthController} = require("../../controller");
const router = express.Router();

router.post('/signup',AuthController.signUp);

module.exports = router;
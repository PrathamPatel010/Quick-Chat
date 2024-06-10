const express = require('express');
const v1ApiRoutes = require('./v1/index');

const router = express.Router();

router.use('/v1/auth',v1ApiRoutes.authRoutes);

module.exports = router;
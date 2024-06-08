const express = require('express');
const {fetchMessagesForSelectedUser} = require("../controller/messageController");
const router = express.Router();

router.get('/:userId',fetchMessagesForSelectedUser);

module.exports = router;
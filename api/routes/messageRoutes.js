const express = require('express');
const {sendMessagesForSelectedUser} = require("../controller/messageController");
const router = express.Router();

router.get('/:userId',sendMessagesForSelectedUser);

module.exports = router;
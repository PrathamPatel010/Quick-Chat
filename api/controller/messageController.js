require('dotenv').config();
const Message = require("../model/Message");
const jwt = require("jsonwebtoken");
const {encrypt, decrypt} = require("./encryptionController");
const jwtSecret = process.env.jwt_secret;

async function getUserdata(req){
    return new Promise((resolve,reject)=>{
        const {jwt_token} = req.cookies;
        if (!jwt_token){
            reject('No JWT Token Found');
        }
        jwt.verify(jwt_token,jwtSecret,{},(err,userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    });
}
async function fetchMessagesForSelectedUser(req,res){
    const {userId} = req.params;
    const userData = await getUserdata(req);
    const ourUserId = userData.userId;
    const encryptedMessages = await Message.find({
        sender:{$in:[userId,ourUserId]},
        recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt:1});

    const decryptedMessages = encryptedMessages.map((message) => ({
        ...message.toObject(),
        text:decrypt({iv: message.iv, encryptedText: message.text})
    }));
    res.json(decryptedMessages);
}


async function handleSentMessage(message,connection,wss){
    message = JSON.parse(message.toString());
    const {recipient,text} = message;
    console.log(text);  // intentionally putting here..
    const encryptedData = encrypt(text);
    const decryptedData = decrypt(encryptedData);
    const messageDocument = await Message.create({
        sender:connection.userId,
        recipient,
        text:encryptedData.encryptedText,
        iv:encryptedData.iv
    });

    [...wss.clients]
        .filter(c=>c.userId===recipient)
        .forEach(c=>c.send(JSON.stringify({text:decryptedData,sender:messageDocument.sender,recipient:messageDocument.recipient,_id:messageDocument._id,createdAt:messageDocument.createdAt})));
}

module.exports = {handleSentMessage,fetchMessagesForSelectedUser};
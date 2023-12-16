require('dotenv').config();
const Message = require("../model/Message");
const jwt = require("jsonwebtoken");
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
async function sendMessagesForSelectedUser(req,res){
    const {userId} = req.params;
    const userData = await getUserdata(req);
    const ourUserId = userData.userId;
    const messages = await Message.find({
        sender:{$in:[userId,ourUserId]},
        recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt:1});
    res.json(messages);
}


async function handleMessage(message,connection,wss){
    message = JSON.parse(message.toString());
    const {recipient,text} = message;
    const messageDocument = await Message.create({
        sender:connection.userId,
        recipient,
        text
    });

    [...wss.clients]
        .filter(c=>c.userId===recipient)
        .forEach(c=>c.send(JSON.stringify({text:messageDocument.text,sender:messageDocument.sender,recipient:messageDocument.recipient,_id:messageDocument._id,createdAt:messageDocument.createdAt})));
}

module.exports = {handleMessage,sendMessagesForSelectedUser};
require('dotenv').config();
const Message = require("../model/Message");
const jwt = require("jsonwebtoken");
const {encrypt, decrypt} = require("./encryptionController");
const jwtSecret = process.env.jwt_secret;
const fs = require('fs');

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

    for (message of encryptedMessages){
        if (!message.read && message.recipient.toString()===ourUserId){
            await Message.findByIdAndUpdate(message._id,{read:true},{new:false});
        }
    }

    const decryptedMessages = encryptedMessages.map((message) => ({
        ...message.toObject(),
        text:decrypt({iv: message.iv, encryptedText: message.text})
    }));
    res.json(decryptedMessages);
}


async function handleSentMessage(message,connection,wss){
    message = JSON.parse(message.toString());
    const {recipient,text,file} = message;
    let filename=null;
    console.log(text);  // intentionally putting here..
    const encryptedData = encrypt(text);
    const decryptedData = decrypt(encryptedData);

    if (file){
        const parts = file.name.split('.');
        const extension = parts[parts.length-1];
        filename=Date.now() + "." + extension;
        const path = __dirname+ '/uploads/'+filename;
        const bufferData = new Buffer(file.data.split(',')[1],'base64');
        fs.writeFile(path,bufferData,()=>{
            console.log(extension+ ' File Saved to: ' + path);
        })
    }
    const messageDocument = await Message.create({
        sender:connection.userId,
        recipient,
        text:encryptedData.encryptedText,
        iv:encryptedData.iv,
        file: file ? filename : null,
        originalFileName:file? file.name : null,
        delivered:true,
    });
    [...wss.clients]
        .filter(c=>c.userId===recipient)
        .forEach(c=>c.send(JSON.stringify({
            text:decryptedData,
            sender:messageDocument.sender,
            recipient:messageDocument.recipient,
            _id:messageDocument._id,
            createdAt:messageDocument.createdAt,
            file: file?filename:null,
            originalFileName: file ? file.name : null,
            delivered:true,
        })));
}

module.exports = {handleSentMessage,fetchMessagesForSelectedUser};
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const corsOption = {origin:process.env.frontend_url, credentials:true};
const {connectDB} = require('./database/connection');
const authRoutes = require('./routes/authRoutes');
const Message = require('./model/Message');
const PORT = process.env.PORT;
const ws = require('ws');
const app = express();
const jwt = require('jsonwebtoken');
const {User} = require("./model/User");
const jwtSecret = process.env.jwt_secret;

// Middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/user',authRoutes);

// App Initialization
async function initApp(){
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is listening on PORT ${PORT}`);
        })
    } catch(err){
        console.log(err.message);
        process.exit(1);
    }
}
initApp();

// Home Route
app.get('/',(req,res)=>{
    res.send(`QuickChat Backend Services are up & running`);
})

// WebSocket Functionality
const server = app.listen(4040);
const wss = new ws.WebSocketServer({server});
wss.on('connection',(connection,req)=>{
    const cookies = req.headers.cookie;
    if(!cookies){
        console.log('No Cookies Found');
        return;
    }
    const tokenString = cookies.split(';').find(str=>str.startsWith('jwt_token='));
    if(!tokenString){
        console.log('No JWT Token Found');
        return;
    }
    const jwtToken = tokenString.split('=')[1];
    jwt.verify(jwtToken,jwtSecret,{},(err,userData)=>{
        if(err) throw err;
        const {userId,username} = userData;
        connection.userId = userId;
        connection.username = username;
    });

    [...wss.clients].forEach(client=>{
        client.send(JSON.stringify({
            online:[...wss.clients].map(c=>({userId:c.userId,username:c.username}))
        }));
    });


    connection.on('message',async(message)=>{
        message = JSON.parse(message.toString());
        const {recipient,text} = message;
        const msg = await Message.create({
            sender:connection.userId,
            recipient,
            text
        });
        [...wss.clients]
            .filter(c=>c.userId===recipient)
            .forEach(c=>c.send(JSON.stringify({text:msg.text,sender:msg.sender,recipient:msg.recipient,_id:msg._id})));
    });
});

app.get('/api/v1/message/:userId',async(req,res)=>{
    const {userId} = req.params;
    const userData = await getUserdata(req);
    const ourUserId = userData.userId;
    const messages = await Message.find({
        sender:{$in:[userId,ourUserId]},
        recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt:1});
    res.json(messages);
});

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

app.get('/api/v1/people',async(req,res)=>{
    const users = await User.find({},{_id:1,username:1});
    res.json(users);
});
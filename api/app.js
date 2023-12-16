require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const corsOption = {origin:process.env.frontend_url, credentials:true};
const {connectDB} = require('./database/connection');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const {handleMessage} = require('./controller/messageController');
const {handleConnection} = require('./controller/wsConnectionController');
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
app.use('/api/v1/message',messageRoutes);

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
const server = app.listen(process.env.WS_PORT);
const wss = new ws.WebSocketServer({server});
wss.on('connection',async(connection,req)=>{
    await handleConnection(connection,req,wss);

    connection.on('message',async(message)=>{
        await handleMessage(message,connection,wss);
    });
});


app.get('/api/v1/people',async(req,res)=>{
    const users = await User.find({},{_id:1,username:1});
    res.json(users);
});
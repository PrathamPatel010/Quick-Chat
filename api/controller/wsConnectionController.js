require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwt_secret;

async function handleConnection(connection,req,wss){
    // for authorizing the user & extract the user data from jwt token
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

    // for showing all online people
    [...wss.clients].forEach(client=>{
        client.send(JSON.stringify({
            online:[...wss.clients].map(c=>({userId:c.userId,username:c.username}))
        }));
    });
}

module.exports = {handleConnection};
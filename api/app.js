require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const corsOption = {origin:process.env.frontend_url, credentials:true};
const {connectDB} = require('./database/connection');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT;

const app = express();

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
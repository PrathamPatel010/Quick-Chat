const express = require('express');
const colors = require('colors');
const {PORT} = require('./config/serverConfig');
const errorHandler = require('./utils/errorHandler');
const ApiRoutes = require('./routes/index');

const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);
    app.use(errorHandler);
    app.listen(PORT,()=>{
        console.log(`[LOG] : CollegeConnect Backend is listening on port ${PORT}`.green.bold);
    });
    app.get('/',(req, res)=>res.send(`<h1>CollegeConnect Backend is up and running</h1>`));
}

setupAndStartServer();
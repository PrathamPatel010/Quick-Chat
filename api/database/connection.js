require('dotenv').config();

const mongoose = require('mongoose');
const URI = process.env.DB_URI;
async function connectDB(){
    const conn = await mongoose.connect(URI);
    console.log(`Database Connected: ${conn.connection.host}`);
}

module.exports = {connectDB};
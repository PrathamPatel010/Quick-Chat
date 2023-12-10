require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../model/User');
const jwtSecret = process.env.jwt_secret;
async function registerUser(req,res){
    console.log('Register Request Hit!!');
    try{
        const {username,password} = req.body;
        // check if user already exist
        const user = await User.findOne({username});
        if(user){
            return res.json({status:429,message:'User Already Exist! You need to login!!'});
        }

        // if not, hash the password & register the user
        const hashedPassword = await bcrypt.hash(password,10);
        const response = await User.create({username,password:hashedPassword});
        console.log(response);
        res.json({status:200,message:'User Registered Successfully!!'});
    } catch (err){
        console.log(err.message);
    }
}

async function loginUser(req,res){
    console.log('Login Request Hit!!');
    try{

        const {username,password} = req.body;

        // check if user exist or not
        const user = await User.findOne({username});
        if(!user){
            return res.json({status:404,message:'No User Found! You need to register!!'});
        }

        // check password
        const passOk = await bcrypt.compare(password,user.password);
        if(!passOk){
            return res.json({status:401,message:'Wrong Username or Password'});
        }

        jwt.sign({userId:user._id,username},jwtSecret,{},(err,token)=>{
            if(err){
                console.log(err);
                return;
            }
            res.cookie('jwt_token',token,{httpOnly:false,secure:true,sameSite:'none'}).json({status:200,message:'Success!!'});
        })
    } catch(err){
        console.log(err.message);
    }
}

async function logoutUser(req,res){
    try{
        const isAuth = req.cookies.token ? true : false;
        if(!isAuth){
            return res.json({status:404,message:'No Cookies Found!!'});
        }
        res.clearCookie('jwt_token',{httpOnly:false,secure:true,sameSite:'none'}).json({status:200,message:'User Logout Successfully!!'});
    } catch(err){
        console.log(err.message);
    }
}

module.exports = {registerUser,loginUser,logoutUser};

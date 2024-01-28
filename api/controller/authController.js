require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../model/User');
const jwtSecret = process.env.jwt_secret;
const sendMail = require('../services/EmailService/emailService');

async function getUserProfile(req,res){
    try{
        const {jwt_token} = req.cookies;
        if(!jwt_token){
            return res.json({status:404,message:'No Token Found!!'});
        }
        jwt.verify(jwt_token,jwtSecret,{},(err,data)=>{
            if(err){
                throw err;
            } else{
                res.json(data);
            }
        })
    } catch (err){
        console.log(err.message);
    }
}

let tempOTP=0;
let tempUsername='template';
let tempPassword='template';
let tempEmail='template';
async function registerUser(req,res){
    try{
        const {username,password,email} = req.body;
        // check if user already exist
        const user = await User.findOne({username});
        if(user){
            return res.json({status:429,message:'User Already Exist! You need to login!!'});
        }

        const emailPattern = /^\d{14}@mbit\.edu\.in$/;
        if (!emailPattern.test(email)){
            return res.json({status:400, message:'Please enter correct college email'});
        }
        const emailResponse = await sendMail(req,res,email);
        tempOTP=emailResponse.OTP;
        tempEmail=email;
        tempUsername=username;
        tempPassword=password;
        return res.json({status:200,message:'OTP sent to your email ID'});
    } catch (err){
        console.log(err.message);
    }
}

const verifyOTP = async (req,res) => {
    try{
        const OTPGot=req.body.otp;
        if (Number(OTPGot)!==Number(tempOTP)){
            return res.json({status:401,message:'Wrong OTP!!'});
        }
        const hashedPassword = await bcrypt.hash(tempPassword,10);
        const response = await User.create({email: tempEmail,username:tempUsername,password:hashedPassword});
        jwt.sign({userId:response._id,username:response.username},jwtSecret,{},(err,token)=>{
            if(err){
                console.log(err);
                return;
            }
            res.cookie('jwt_token',token,{httpOnly:false,secure:true,sameSite:'none'}).json({status:200,message:'Success!!',id:response._id});
        });
    } catch (err){
        console.log(err.message);
    }
};

async function loginUser(req,res){
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
            res.cookie('jwt_token',token,{httpOnly:false,secure:true,sameSite:'none'}).json({status:200,message:'Success!!',id:user._id});
        })
    } catch(err){
        console.log(err.message);
    }
}

async function logoutUser(req,res){
    try{
        const isAuth = req.cookies.jwt_token ? true : false;
        if(!isAuth){
            return res.json({status:404,message:'No Cookies Found!!'});
        }
        res.clearCookie('jwt_token',{httpOnly:false,secure:true,sameSite:'none'}).json({status:200,message:'User Logout Successfully!!'});
    } catch(err){
        console.log(err.message);
    }
}

module.exports = {registerUser,loginUser,logoutUser,getUserProfile,verifyOTP};

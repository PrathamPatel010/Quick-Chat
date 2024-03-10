const {GMAIL_EMAIL} = require('./config/server-config');
const mailSender = require('./config/email-config');
const sendMail = async(req,res,email) => {
    try{
        const OTP = Math.floor(100000+Math.random()*900000).toString();
        const emailData = {
            from:GMAIL_EMAIL,
            to: email,
            subject: 'Email Verification for QuickChat App',
            html: `
            <p>Hello!! Hope you are doing well.</p>
            <p>Looks like you tried signing up for QuickChat-A Web based Messaging Platform</p> 
            Here's the OTP you need to finish setting up your account.
            <h2>OTP is ${OTP}</h2>
            `
        }
        await mailSender.sendMail(emailData);
        return {message:'OTP sent to your mail!',status:200,OTP};
    } catch (err){
        console.log(err.message);
    }
}

module.exports = sendMail;
require('dotenv').config();
const crypto = require('crypto');
const algorithm = process.env.encryption_algo;
const keyString = process.env.encKey;
const salt = process.env.encSalt;
const key = crypto.scryptSync(keyString, salt, 32);
const iv = crypto.randomBytes(16);

function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm,key,iv);
    let encrypted = cipher.update(text,'utf-8','hex');
    encrypted += cipher.final('hex');
    return {iv:iv.toString('hex'),encryptedText:encrypted};
}

function decrypt(encryptedData){
    const decipher = crypto.createDecipheriv(algorithm,key,Buffer.from(encryptedData.iv,'hex'));
    let decrypted = decipher.update(encryptedData.encryptedText,'hex','utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {encrypt,decrypt};
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text:{
        type:String,
    },
    iv:{
        type:String,
    },
    file:{
        type:String,
    },
    originalFileName:{
        type:String,
    },
    delivered:{
        type:Boolean,
        default:false,
    },
    read:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
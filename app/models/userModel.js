const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    user_type_id:{
        type:Number,
        default:0,
        Comment:'0=user,1=admin,2=gardener',
        trim: true
    }

}, { timestamps: true })

const User = model('User', userSchema);
module.exports = User
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isVerify: {  // Fixed the field name from 'isVerfiy' to 'isVerify'
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,  
    },
    forgotPassword: {
        type: String,
        default: '',
    },
    forgotPasswordExpire: {
        type: Date,
    },
    verifyTokenExpire: {
        type: Date,
    },
    profilePic: {
        type: String,
        default: '',
    },
});

let User: any;
try {
    User = mongoose.model('User');
}
catch {
    User = mongoose.model('User', userSchema);
}
export default User;

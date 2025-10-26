const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng thêm tên người dùng'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Vui lòng thêm email'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', UserSchema);
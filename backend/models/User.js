const mongoose = require('mongoose');

// Định nghĩa Schema (cấu trúc) cho User
const UserSchema = new mongoose.Schema({
    // Trường tên người dùng, kiểu chuỗi, bắt buộc
    name: {
        type: String,
        required: [true, 'Vui lòng thêm tên người dùng'],
        trim: true
    },
    // Trường email, kiểu chuỗi, bắt buộc, phải là duy nhất
    email: {
        type: String,
        required: [true, 'Vui lòng thêm email'],
        unique: true
    },
    // Trường thời gian tạo bản ghi (tự động)
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Model ra ngoài để Controller sử dụng
module.exports = mongoose.model('User', UserSchema);
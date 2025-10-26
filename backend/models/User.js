const mongoose = require('mongoose');

// 1. Định nghĩa Schema cho người dùng (name và email)
const userSchema = new mongoose.Schema({
    // Trường tên, bắt buộc nhập
    name: {
        type: String,
        required: [true, 'Vui lòng thêm tên người dùng']
    },
    // Trường email, bắt buộc nhập và phải là duy nhất
    email: {
        type: String,
        required: [true, 'Vui lòng thêm email'],
        unique: true
    }
}, {
    // Tự động thêm trường createdAt và updatedAt (Đây là cách chuẩn)
    timestamps: true 
});

// 2. Tạo Model từ Schema
const User = mongoose.model('User', userSchema);

// 3. Export Model ra ngoài
module.exports = User;

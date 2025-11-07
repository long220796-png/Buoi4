const mongoose = require('mongoose');

// 1. Định nghĩa Schema cho người dùng (name, email, password, role)
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
    },
    // 💡 TRƯỜNG PASSWORD BẮT BUỘC CHO AUTHENTICATION
    password: { 
        type: String, 
        required: [true, 'Vui lòng thêm mật khẩu']
    },
    // 💡 TRƯỜNG ROLE BẮT BUỘC CHO PHÂN QUYỀN (RBAC)
    role: {
        type: String,
        default: 'user' // Mặc định là 'user', sau này sẽ có 'admin'
    }
}, {
    // Tự động thêm trường createdAt và updatedAt 
    timestamps: true 
});

// 2. Tạo Model từ Schema
const User = mongoose.model('User', userSchema);

// 3. Export Model ra ngoài
module.exports = User;
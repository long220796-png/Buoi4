const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // 💡 Cần import module crypto

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // KHÔNG trả về mật khẩu khi tìm kiếm
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: { // 💡 TRƯỜNG AVATAR CHO TÍNH NĂNG UPLOAD
        type: String,
        default: 'https://placehold.co/100x100/A0BFFF/000000/png?text=AV' 
    },
    // 💡 TRƯỜNG CHO CHỨC NĂNG QUÊN MẬT KHẨU
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true
});

// PHƯƠNG THỨC: Tạo và băm reset token
UserSchema.methods.getResetPasswordToken = function() {
    // Tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Băm token (SHA256) và lưu vào trường resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Đặt thời gian hết hạn (ví dụ: 10 phút)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    return resetToken; // Trả về token KHÔNG băm để gửi qua email
};

// Middleware/Phương thức hiện tại (Không thay đổi)
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
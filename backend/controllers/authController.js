// controllers/authController.js
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. API Đăng ký (POST /signup)
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Kiểm tra email trùng [cite: 40]
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email đã được đăng ký.' });
        }

        user = new User({ name, email, password });

        // Mã hóa Mật khẩu bằng bcrypt [cite: 40]
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'Đăng ký tài khoản thành công.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};

// 2. API Đăng nhập (POST /login)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không chính xác.' });
        }

        // Xác thực email/password [cite: 41]
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không chính xác.' });
        }

        // Trả về JWT token [cite: 41]
        const payload = {
            user: {
                id: user.id,
                role: user.role
            },
        };
        
        jwt.sign(
            payload,
            'YOUR_JWT_SECRET', // Đổi key này thành biến môi trường
            { expiresIn: '1h' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token }); 
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};

// 3. API Đăng xuất (POST /logout)
exports.logout = (req, res) => {
    // Đăng xuất: xóa token phía client [cite: 42] (Server chỉ cần xác nhận)
    res.status(200).json({ msg: 'Đăng xuất thành công.' });
};
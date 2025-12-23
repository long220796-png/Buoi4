const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// 💡 LƯU Ý: Nếu bạn đã tạo file util/sendEmail.js, hãy bỏ comment dòng này
// const sendEmail = require('../utils/sendEmail'); 

// ------------------------------------------------------------------
// HOẠT ĐỘNG 1: ĐĂNG KÝ & ĐĂNG NHẬP
// ------------------------------------------------------------------

// [POST] /api/auth/signup - Đăng ký người dùng mới
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Kiểm tra người dùng đã tồn tại
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Người dùng đã tồn tại.' });
        }

        // 2. Tạo người dùng mới
        user = new User({
            name,
            email,
            password, // Mật khẩu sẽ được băm trong User Model (middleware pre('save'))
            role: 'user' // Mặc định là user
        });

        await user.save();

        // 3. Tạo JWT Payload và Token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            'YOUR_JWT_SECRET', // !!! PHẢI GIỐNG HỆT SECRET KEY TRONG MIDDLEWARE/AUTH.JS
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ 
                    success: true, 
                    token, 
                    msg: 'Đăng ký thành công.',
                    user: { id: user.id, name: user.name, email: user.email, role: user.role }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};

// [POST] /api/auth/login - Đăng nhập
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Tìm người dùng (cần select('+password') để lấy mật khẩu)
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ.' });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ.' });
        }

        // 3. Tạo JWT Token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            'YOUR_JWT_SECRET', // !!! PHẢI GIỐNG HỆT SECRET KEY
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // Trả về token và thông tin user (không có mật khẩu)
                res.json({
                    success: true,
                    token,
                    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// HOẠT ĐỘNG 4: QUÊN MẬT KHẨU & ĐẶT LẠI MẬT KHẨU
// ------------------------------------------------------------------

// [POST] /api/auth/forgot-password - Yêu cầu đặt lại mật khẩu
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Trả về 200 OK ngay cả khi không tìm thấy email để tránh lộ thông tin
            return res.status(200).json({ 
                success: true, 
                msg: 'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi.' 
            });
        }

        // 1. Lấy Reset Token từ User Model
        const resetToken = user.getResetPasswordToken();
        
        // 2. Lưu token băm và thời gian hết hạn vào DB
        await user.save(); 

        // 3. Chuẩn bị URL và Message Email
        // URL này sẽ được client gọi (ví dụ: http://localhost:5000/api/auth/reset-password/TOKEN_KHÔNG_BĂM)
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

        const message = `Bạn nhận được email này vì bạn (hoặc người khác) đã yêu cầu đặt lại mật khẩu. Vui lòng thực hiện yêu cầu PUT đến địa chỉ sau để đặt lại mật khẩu của bạn: \n\n ${resetUrl}`;

        try {
            // 💡 Nếu bạn đã tạo sendEmail, hãy bỏ comment dòng này và thay bằng logic của bạn
            /* await sendEmail({
                email: user.email,
                subject: 'Yêu cầu Đặt lại Mật khẩu',
                message
            });
            */

            res.status(200).json({
                success: true,
                msg: 'Email đặt lại mật khẩu đã được gửi.',
                // 💡 Tạm thời trả về token để dễ dàng test trong Postman
                resetToken: resetToken 
            });

        } catch (err) {
            console.error('Lỗi Gửi Email:', err.message);
            // Xóa token khỏi user nếu gửi email thất bại
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ msg: 'Lỗi khi gửi email đặt lại mật khẩu.' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};

// [PUT] /api/auth/reset-password/:token - Đặt lại mật khẩu
const resetPassword = async (req, res) => {
    const { password } = req.body;
    const resetToken = req.params.token;

    // 1. Băm token từ URL để so sánh với token trong DB
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() } // Kiểm tra token còn hạn
        });

        if (!user) {
            return res.status(400).json({ msg: 'Token không hợp lệ hoặc đã hết hạn.' });
        }

        // 2. Kiểm tra mật khẩu mới
        if (!password || password.length < 6) {
             return res.status(400).json({ msg: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
        }

        // 3. Cập nhật mật khẩu và xóa token
        user.password = password; // Sẽ được băm trong Model
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, msg: 'Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// EXPORT CÁC HÀM CONTROLLER
// ------------------------------------------------------------------

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword
};
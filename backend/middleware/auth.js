const jwt = require('jsonwebtoken');

// Middleware xác thực token JWT
module.exports = function (req, res, next) {
    // 1. Lấy token từ header (thường là 'x-auth-token')
    const token = req.header('x-auth-token');

    // 2. Kiểm tra nếu không có token
    if (!token) {
        return res.status(401).json({ msg: 'Không tìm thấy token, từ chối truy cập. Vui lòng đăng nhập.' });
    }

    // 3. Xác thực token
    try {
        // !!! Cần đảm bảo 'YOUR_JWT_SECRET' trùng với secret key bạn dùng trong authController.js !!!
        const decoded = jwt.verify(token, 'YOUR_JWT_SECRET'); 
        
        // Gán user payload từ token vào req.user 
        // để Controller có thể biết ID người dùng: req.user.id
        req.user = decoded.user; 
        next();
    } catch (err) {
        // Nếu token không hợp lệ (hết hạn, sai chữ ký,...)
        res.status(401).json({ msg: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};
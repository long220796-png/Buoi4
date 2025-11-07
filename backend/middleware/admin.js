// Middleware kiểm tra xem người dùng có phải là Admin hay không

module.exports = (req, res, next) => {
    // req.user được gán bởi middleware/auth.js và chứa { id, role }
    
    // 1. Kiểm tra role của người dùng
    if (req.user.role !== 'admin') {
        // 2. Nếu không phải Admin, từ chối truy cập
        // Dùng status 403 Forbidden (Nghiêm cấm)
        return res.status(403).json({ msg: 'Từ chối truy cập. Bạn không có quyền Admin.' });
    }
    
    // 3. Nếu là Admin, cho phép request đi tiếp
    next();
};
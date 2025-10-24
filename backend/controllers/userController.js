const User = require('../models/User'); // Import User Model

// @desc    Lấy tất cả người dùng (sử dụng MongoDB)
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
    try {
        // Tìm tất cả tài liệu trong collection 'users'
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users,
            total: users.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi lấy dữ liệu người dùng.'
        });
    }
};

// @desc    Tạo người dùng mới (sử dụng MongoDB)
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1. Kiểm tra dữ liệu đầu vào
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Tên và Email là bắt buộc."
            });
        }

        // 2. Tạo tài liệu người dùng mới trong MongoDB
        const newUser = await User.create({
            name,
            email
        });

        // 3. Trả về kết quả thành công
        res.status(201).json({
            success: true,
            message: "Tạo người dùng thành công và lưu vào DB.",
            data: newUser
        });
    } catch (error) {
        // Xử lý lỗi (ví dụ: lỗi trùng email, lỗi kết nối DB)
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi tạo người dùng.'
        });
    }
};

// Export các hàm để Route có thể sử dụng
module.exports = {
    getUsers,
    createUser
};
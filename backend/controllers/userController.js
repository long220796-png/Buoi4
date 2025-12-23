const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ------------------------------------------------------------------
// HOẠT ĐỘNG 2: QUẢN LÝ PROFILE (API /profile - GET, PUT)
// ------------------------------------------------------------------

// [GET] /api/auth/profile - Xem thông tin cá nhân
const viewProfile = async (req, res) => { 
    try {
        // Lấy ID người dùng từ req.user đã được gán bởi middleware/auth.js
        const user = await User.findById(req.user.id).select('-password'); 

        if (!user) {
            return res.status(404).json({ msg: 'Người dùng không tồn tại.' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};

// [PUT] /api/auth/profile - Cập nhật thông tin cá nhân
const updateProfile = async (req, res) => { 
    const { name, email, newPassword } = req.body;
    
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'Người dùng không tồn tại.' });
        }

        // 1. Cập nhật tên
        user.name = name || user.name;
        
        // 2. Cập nhật email (Kiểm tra trùng lặp)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: 'Email này đã được sử dụng bởi tài khoản khác.' });
            }
            user.email = email;
        }

        // 3. Cập nhật mật khẩu (nếu có newPassword)
        if (newPassword) {
            if (newPassword.length < 6) { 
                return res.status(400).json({ msg: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();
        
        res.json({ 
            msg: 'Cập nhật hồ sơ thành công.', 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// 💡 API UPLOAD AVATAR (PUT /api/auth/upload-avatar)
// ------------------------------------------------------------------

// Tạm thời chỉ cập nhật URL placeholder. Sinh viên 3 sẽ tích hợp Cloudinary.
const uploadAvatar = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'Người dùng không tồn tại.' });
        }
        
        // 💡 Giả lập URL sau khi upload thành công lên Cloudinary
        const mock_avatar_url = `https://placehold.co/100x100/A0BFFF/000000/png?text=${user.name.substring(0,2).toUpperCase()}`;

        user.avatar = mock_avatar_url; 
        
        await user.save();
        
        res.json({ 
            msg: 'Cập nhật Avatar thành công (URL giả lập).', 
            avatarUrl: user.avatar 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// 💡 HÀM NÂNG CẤP TÀI KHOẢN THÀNH ADMIN (API /seed-admin)
// ------------------------------------------------------------------

const seedAdmin = async (req, res) => {
    try {
        const userId = req.user.id;
        
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Người dùng không tồn tại.' });
        }
        
        // Nâng cấp role
        user.role = 'admin';
        
        await user.save(); 
        
        res.json({ 
            msg: 'Nâng cấp tài khoản thành Admin thành công.', 
            user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// HOẠT ĐỘNG 3: API ADMIN (YÊU CẦU role: 'admin')
// ------------------------------------------------------------------

// [GET] /api/auth/users - Lấy tất cả người dùng (Chỉ Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 

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

// [DELETE] /api/auth/users/:id - Xóa người dùng (Chỉ Admin)
const deleteUser = async (req, res) => {
    try {
        const userIdToDelete = req.params.id;
        
        // Ngăn Admin tự xóa mình
        if (userIdToDelete === req.user.id) {
            return res.status(400).json({ msg: 'Bạn không thể tự xóa tài khoản Admin của mình.' });
        }
        
        const user = await User.findByIdAndDelete(userIdToDelete);

        if (!user) {
            return res.status(404).json({ msg: 'Người dùng cần xóa không tồn tại.' });
        }

        res.json({ msg: 'Xóa người dùng thành công.', deletedUser: user });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
             return res.status(400).json({ msg: 'ID người dùng không hợp lệ.' });
        }
        res.status(500).send('Lỗi Server.');
    }
};


// ------------------------------------------------------------------
// API CƠ BẢN VÀ EXPORT
// ------------------------------------------------------------------

// Export tất cả các hàm
module.exports = {
    viewProfile,
    updateProfile,
    uploadAvatar, 
    seedAdmin,
    getUsers,
    deleteUser
};
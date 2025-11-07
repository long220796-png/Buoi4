const express = require('express');
const router = express.Router();

// Đường dẫn CỐ ĐỊNH: controllers/authController.js và controllers/userController.js
// Đảm bảo cả hai file này đã được lưu với phiên bản HOÀN CHỈNH.
const authController = require('../controllers/authController'); 
const userController = require('../controllers/userController'); 

// Middleware
const authMiddleware = require('../middleware/auth'); 
// 💡 Nếu bạn chưa tạo file middleware/admin.js, hãy tạm thời comment dòng này:
const adminMiddleware = require('../middleware/admin'); 

// ----------------------------------------------------
// Hoạt động 1: Đăng ký & Đăng nhập
// ----------------------------------------------------
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// ----------------------------------------------------
// Hoạt động 2: Quản lý Profile (Yêu cầu Auth)
// ----------------------------------------------------
router.get('/profile', authMiddleware, userController.viewProfile); 
router.put('/profile', authMiddleware, userController.updateProfile); 

// ----------------------------------------------------
// Hoạt động 3: API Admin (Yêu cầu Auth & Admin)
// ----------------------------------------------------
// 💡 Nếu adminMiddleware bị lỗi hoặc chưa tồn tại, hãy dùng:
// router.get('/users', authMiddleware, userController.getUsers); 
router.get('/users', authMiddleware, adminMiddleware, userController.getUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);
router.put('/seed-admin', authMiddleware, userController.seedAdmin); 

// ----------------------------------------------------
// Hoạt động 4: Quên Mật Khẩu & Đặt lại Mật Khẩu
// ----------------------------------------------------
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

// ----------------------------------------------------
// Hoạt động 5: Upload Avatar (Yêu cầu Auth)
// ----------------------------------------------------
router.put('/upload-avatar', authMiddleware, userController.uploadAvatar);

module.exports = router;
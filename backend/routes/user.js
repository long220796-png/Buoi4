const express = require('express');
const router = express.Router();
// 💡 Lưu ý: Ta không cần import userController hay authController ở đây
// vì các API phức tạp đã được chuyển sang routes/auth.js

// ------------------------------------------------------------------
// API /api/users (Thường chỉ để cho các chức năng Admin)
// ------------------------------------------------------------------

// Đây là một route giả lập. Trong ứng dụng thực tế,
// router này sẽ cần các hàm controller.

// router.post('/', userController.createUser); // -> Hàm này đã bị xóa khỏi userController.js
// router.get('/', userController.getUsers); // -> Hàm này đã được chuyển sang routes/auth.js

// Tạm thời bỏ trống file này để server không bị lỗi do thiếu callback
// vì các chức năng chính đã nằm trong routes/auth.js

module.exports = router;
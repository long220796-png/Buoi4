const express = require('express');
const {
    getUsers,
    createUser
} = require('../controllers/userController'); // Import các hàm xử lý từ Controller

// Sử dụng Router của Express
const router = express.Router();

// Định nghĩa Routes

// Lắng nghe request GET trên đường dẫn gốc ('/')
// Kết quả là: GET /api/users
router.get('/', getUsers);

// Lắng nghe request POST trên đường dẫn gốc ('/')
// Kết quả là: POST /api/users
router.post('/', createUser);

module.exports = router;
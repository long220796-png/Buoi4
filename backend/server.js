const express = require('express');
// Import hàm kết nối DB từ file db.js trong thư mục config
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/user');

// 💡 1. IMPORT ROUTER AUTH MỚI CỦA BẠN
const authRoutes = require('./routes/auth'); 

// KHỞI TẠO KẾT NỐI DB
connectDB();

const app = express();

// Middleware để phân tích cú pháp JSON từ body request (rất quan trọng cho POST)
app.use(express.json());

// Định nghĩa Routes
app.use('/api/users', require('./routes/user'));

// 💡 2. TÍCH HỢP ROUTER AUTHENTICATION (SINH VIÊN 1)
app.use('/api/auth', authRoutes); // Đường dẫn: /api/auth/signup, /api/auth/login, etc.

// Route cơ bản kiểm tra server
app.get('/', (req, res) => {
    res.send(`Server đang chạy trên cổng 5000.`);
});

const PORT = 5000; 

// LẮNG NGHE ở cổng 5000 để giữ server chạy
app.listen(PORT, () => console.log(`Server Express đang chạy và kết nối DB thành công. Cổng: ${PORT}`));
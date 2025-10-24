const express = require('express');
// Import hàm kết nối DB từ file db.js trong thư mục config
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/user');

// 1. KHỞI TẠO KẾT NỐI DB TRƯỚC
// Hàm này sẽ cố gắng kết nối DB. Nếu thất bại, ứng dụng sẽ thoát (exit 1)
connectDB();

const app = express();

// Middleware để phân tích cú pháp JSON từ body request (rất quan trọng cho POST)
app.use(express.json());

// Định nghĩa Routes
app.use('/api/users', require('./routes/user'));

// Route cơ bản kiểm tra server
app.get('/', (req, res) => {
    res.send(`Server đang chạy trên cổng 5000.`);
});

const PORT = 5000; 

// 2. LẮNG NGHE ở cổng 5000 để giữ server chạy
app.listen(PORT, () => console.log(`Server Express đang chạy và kết nối DB thành công. Cổng: ${PORT}`));

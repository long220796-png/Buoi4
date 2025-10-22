// 1. Tải các module cần thiết
const express = require('express');
const dotenv = require('dotenv'); 

// Tải biến môi trường từ file .env vào process.env (nếu có)
dotenv.config();

// 2. Khởi tạo ứng dụng Express
const app = express();

// Middleware: Sử dụng express.json() để parse (phân tích) các yêu cầu JSON gửi đến
app.use(express.json());

// Định nghĩa một route cơ bản để kiểm tra server
app.get('/', (req, res) => {
    res.send('Server đang chạy tốt. Chào mừng đến với API Backend!');
});

// 3. Thiết lập PORT
// Lấy PORT từ biến môi trường (ví dụ: trong file .env), nếu không có thì dùng mặc định là 3000
const PORT = process.env.PORT || 3000;

// 4. Khởi động server và lắng nghe kết nối
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
    console.log(`Mở http://localhost:${PORT} để kiểm tra.`);
});

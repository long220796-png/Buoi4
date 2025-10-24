const mongoose = require('mongoose');

// TẠM THỜI HARDCODE CHUỖI KẾT NỐI ĐỂ KIỂM TRA LỖI BAD AUTH
// Sau khi thành công, chúng ta sẽ xóa dòng này và sử dụng process.env.MONGO_URI
const MONGO_URI_HARDCODE = "mongodb+srv://duongquanlong:LongFinal2025@cluster0.mqmjjlm.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0";

// Hàm kết nối đến MongoDB
const connectDB = async () => {
    try {
        
        // SỬ DỤNG CHUỖI HARDCODE ĐỂ KIỂM TRA MẬT KHẨU
        const conn = await mongoose.connect(MONGO_URI_HARDCODE, { 
            // Các tùy chọn này không cần thiết cho Mongoose 8+
        });

        console.log(`Đã kết nối MongoDB thành công: ${conn.connection.host}`);
    } catch (error) {
        // Xử lý lỗi (Đã loại bỏ lỗi cấu hình, chỉ còn lỗi kết nối/xác thực)
        console.error(`LỖI KẾT NỐI DB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

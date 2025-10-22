const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Kết nối MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#Smileishope123", // đổi theo MySQL của bạn
    database: "movie_website",
});

db.connect((err) => {
    if (err) {
        console.log("❌ Lỗi kết nối MySQL:", err);
    } else {
        console.log("✅ Đã kết nối MySQL thành công!");
    }
});

// ✅ API ĐĂNG KÝ NGƯỜI DÙNG
app.post("/register", async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
    }

    try {
        // Kiểm tra username hoặc email đã tồn tại chưa
        const [existingUser] = await db
            .promise()
            .query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Tên đăng nhập hoặc email đã tồn tại!" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu vào DB
        await db
            .promise()
            .query(
                "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)",
                [fullname, username, email, hashedPassword]
            );

        res.status(200).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi khi đăng ký tài khoản!" });
    }
});

// ✅ API ĐĂNG NHẬP
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }

    try {
        const [user] = await db
            .promise()
            .query("SELECT * FROM users WHERE username = ?", [username]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Mật khẩu không đúng!" });
        }

        // ✅ Đăng nhập thành công
        res.status(200).json({
            message: "Đăng nhập thành công!",
            user: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email,
            },
        });
    } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi khi đăng nhập!" });
    }
});


// ✅ API QUÊN MẬT KHẨU (chuẩn bị sẵn)
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy email này!" });
    }

    // (Tạm thời chỉ báo thành công, sau này thêm gửi email reset password)
    res.status(200).json({ message: "Hệ thống đã gửi hướng dẫn khôi phục mật khẩu!" });
});

// ✅ Chạy server
app.listen(5000, () => {
    console.log("🚀 Server đang chạy tại http://localhost:5000");
});

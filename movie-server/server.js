import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ---------------------- DATABASE ----------------------
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) console.error("❌ Lỗi kết nối DB:", err);
    else console.log("✅ Kết nối MySQL thành công!");
});

// ---------------------- REGISTER ----------------------
app.post("/api/auth/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (result.length > 0)
            return res.status(400).json({ message: "Email đã được sử dụng!" });

        db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err) => {
                if (err) res.status(500).json({ message: "Lỗi server!" });
                else res.json({ message: "Đăng ký thành công!" });
            }
        );
    });
});

// ---------------------- LOGIN ----------------------
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi server!" });
        if (result.length === 0) return res.status(404).json({ message: "Tài khoản không tồn tại!" });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu!" });

        res.json({ message: "Đăng nhập thành công!", user: { id: user.id, username: user.username } });
    });
});

// ---------------------- FORGOT PASSWORD ----------------------
app.post("/api/auth/forgot-password", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Vui lòng nhập email!" });

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi server!" });
        if (result.length === 0) return res.status(404).json({ message: "Email không tồn tại!" });

        const token = crypto.randomBytes(32).toString("hex");
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

        db.query(
            "UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE email = ?",
            [token, expireTime, email],
            (err) => {
                if (err) return res.status(500).json({ message: "Lỗi server!" });

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
                const mailOptions = {
                    from: `MovieZone <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: "Khôi phục mật khẩu MovieZone",
                    text: `Nhấn vào liên kết sau để đặt lại mật khẩu (có hiệu lực 1 giờ): ${resetLink}`,
                };

                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: "Không thể gửi email!" });
                    }
                    res.json({ message: "Đã gửi email khôi phục mật khẩu!" });
                });
            }
        );
    });
});

// ---------------------- RESET PASSWORD ----------------------
app.post("/api/auth/reset-password", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password)
        return res.status(400).json({ message: "Thiếu token hoặc mật khẩu!" });

    db.query(
        "SELECT * FROM users WHERE reset_token = ? AND reset_token_expire > NOW()",
        [token],
        async (err, result) => {
            if (err) return res.status(500).json({ message: "Lỗi server!" });
            if (result.length === 0)
                return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });

            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                "UPDATE users SET password = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?",
                [hashedPassword, result[0].id],
                (err) => {
                    if (err) return res.status(500).json({ message: "Cập nhật thất bại!" });
                    res.json({ message: "Đặt lại mật khẩu thành công!" });
                }
            );
        }
    );
});

app.listen(process.env.PORT, () =>
    console.log(`🚀 Server chạy tại http://localhost:${process.env.PORT}`)
);

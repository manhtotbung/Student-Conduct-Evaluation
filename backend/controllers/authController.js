const bcrypt = require('bcryptjs');
const pool = require('../db');

exports.login = async (req, res, next) => { // Thêm next để chuyển lỗi
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'missing_body' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT username, password_hash, display_name, role_code, student_code, faculty_code, is_active
       FROM auth.user_account WHERE username = $1`,
      [username.trim()]
    );

    if (!rows.length || rows[0].is_active !== true) {
      return res.status(401).json({ error: 'invalid_user_or_inactive' });
    }
    const u = rows[0];

    let passwordMatch = false;
    if (u.password_hash && u.password_hash.startsWith('$2')) { // Bcrypt hash
      passwordMatch = await bcrypt.compare(password, u.password_hash);
    } else { // Plain text or other hash (không khuyến khích)
      passwordMatch = (password === u.password_hash);
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'invalid_password' });
    }

    // Tạo token JWT thay vì 'demo-token' (Nên làm ở bước sau)
    const token = 'demo-token'; // Thay thế bằng jwt.sign(...)

    res.json({
      token: token,
      role: u.role_code,
      display_name: u.display_name,
      username: u.username,
      student_code: u.student_code || null,
      faculty_code: u.faculty_code || null,
    });
  } catch (err) {
     console.error('Login Error:', err);
     next(err); // Chuyển lỗi cho global error handler
  }
};
const pool = require('../db');

exports.getStudents = async (req, res, next) => {
  const { username, term, class_code } = req.query || {};
  if (!username || !term) return res.status(400).json({ error: 'missing_params' });

  try {
    const params = [username.trim(), term];
    let query = `
      SELECT
        s.student_code, s.full_name,
        c.code AS class_code, c.name AS class_name,
        -- Tính tổng điểm từ bảng term_score nếu có, fallback về self_assessment
        COALESCE(ts.total_score, SUM(sa.self_score) FILTER (WHERE sa.id IS NOT NULL), 0)::int AS total_score
      FROM ref.class_advisor ca
      JOIN ref.class   c ON c.id = ca.class_id
      JOIN ref.student s ON s.class_id = c.id
      LEFT JOIN drl.self_assessment sa ON sa.student_id = s.id AND sa.term_code = $2
      LEFT JOIN drl.term_score ts ON ts.student_id = s.id AND ts.term_code = $2
      WHERE ca.advisor_username = $1
    `;

    if (class_code) {
      query += ' AND c.code = $3';
      params.push(class_code.trim());
    }

    query += `
      GROUP BY s.student_code, s.full_name, c.code, c.name, ts.total_score
      ORDER BY c.code, s.student_code
    `;

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Teacher Get Students Error:', err);
    next(err);
  }
};
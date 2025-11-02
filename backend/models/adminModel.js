import pool from "../db.js";

export const getSearchClassStudents = async (class_code) => {
  const query = `
    select s.student_code, s.full_name, c.code 
from ref.student s
inner join ref.class c 
ON s.class_id = c.id
where c.code= $1
  `;
  const { rows } = await pool.query(query, [class_code]);
  return rows;
};

// export const getSearchStudents = async (studentCode, name, classCode, term) => {
//   let conditions = [];
//   let values = [term];
//   let idx = 2;
//   if (studentCode) {
//     conditions.push(`s.student_code ILIKE $${idx}`);
//     values.push(`%${studentCode}%`);
//     idx++;
//   }
//   if (name) {
//     conditions.push(`s.full_name ILIKE $${idx}`);
//     values.push(`%${name}%`);
//     idx++;
//   }
//   if (classCode) {
//     conditions.push(`s.class_code ILIKE $${idx}`);
//     values.push(`%${classCode}%`);
//     idx++;
//   }
//   const whereClause =
//     conditions.length > 0 ? "AND " + conditions.join(" AND ") : "";

//   const query = `   
//     select s.student_code, s.full_name, s.class_code,
//         coalesce((
//             select sum(sa.self_score)
//             from drl.self_assessment sa
//             join ref.student st on sa.student_id = st.id
//             where st.student_code = s.student_code and sa.term_code = $1
//         ), 0) as total_score
//     from ref.student s
//     where 1=1 ${whereClause}
//     order by s.student_code;
//   `;
//   const { rows } = await pool.query(query, values);
//   return rows;
// };

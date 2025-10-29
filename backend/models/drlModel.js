import pool from '../db.js';

//Lấy danh sách tiêu chí
export const getCriteria = async (term) =>{
    const query = `select c.id, c.term_code, c.code, c.title, c.type,c.max_points,
      coalesce((
        select json_agg(
          json_build_object(
            'id', o.id,
            'label', o.label,
            'score', o.score
          )
          order by o.id
        )
        from drl.criterion_option o
        where o.criterion_id = c.id
      ), '[]'::json) as options,
      
      --Tách phần số của code để sắp xếp
      nullif(regexp_replace(split_part(c.code, '.', 1), '\\D', '', 'g'), '')::int as grp_order,
      nullif(regexp_replace(split_part(c.code, '.', 2), '\\D', '', 'g'), '')::int as sub_order
    from drl.criterion c
    where c.term_code = $1
    order by grp_order nulls last, sub_order nulls last, c.id;
    `
    const { rows } = await pool.query(query, [term]);
    return rows;
};

//Lấy id theo mã sinh viên
export const getStudentID = async (student_code) => {
  const code = (student_code ?? '').trim();
  const query = `
    SELECT id
    FROM ref.student
    WHERE lower(student_code) = lower($1)
    LIMIT 1
  `;
  //$! = [code]
/* rows trả về
{
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [ { id: 1, name: 'Nguyen Van A', age: 20 } ],
  fields: [ ... ]
}
*/
  const { rows } = await pool.query(query, [code]);
  return rows[0] || null; // { id } hoặc null
};

//Lấy danh sách tự đánh giá của sinh viên
export const getSelfAssessment_student = async (student_id,term) =>{
  const query = `select sa.criterion_id, sa.option_id, sa.text_value, sa.self_score,sa.is_hsv_verified, sa.hsv_note
    from drl.self_assessment sa
    where sa.student_id = $1 and sa.term_code = $2
    order by sa.criterion_id;
  `;
  const { rows } = await pool.query(query,[student_id, term]);
  return rows || null; 
};
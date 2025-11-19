import pool from "../../db.js";
import {getConfig}  from "../../utils/helpers.js";


//108 Lấy danh sách nhóm tiêu chí
export const getGroupCri = async (term) =>{
  const query =`SELECT id, term_code, code, title FROM drl.criteria_group  WHERE term_code = $1 ORDER BY  id`;
  const {rows} =  await pool.query(query,[term]);
  return rows;
};

//123 Tạo mới nhóm tiêu chí
export const postGroupCri = async()=>{

};
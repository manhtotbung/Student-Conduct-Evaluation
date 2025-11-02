import pool from '../db.js';

//Hiển thị danh sách sinh viên trong lớp 
export const getStudents = async () =>{
    const query = ``

    const {rows}= await pool.query(query,[]);
    return rows
}; 
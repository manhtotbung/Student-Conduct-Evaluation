import {
  getClass,
  getfaculty,
  getStudent,
  postAccept,
} from "../../models/adminModel/faculty_classMModel.js";

// Lấy danh sách khoa
export const getFaculties = async (req, res, next) => {
  const { term } = req.query || {};
  if (!term) return res.status(400).json({ error: "Không có kì học" });

  try {
    const rows = await getfaculty(term);
    res.json(rows);
  } catch (error) {
    console.error("Lỗi ở getfaculty", error);
    res.status(500).send({ message: "Lỗi hệ thống" });
  }
};

// Lấy danh sách lớp
export const getClasses = async (req, res) => {
  const { term, faculty } = req.query || {};
  if (!term) return res.status(400).json({ error: "Không có kì học" });

  try {
    const rows = await getClass(term, faculty);
    res.json(rows);
  } catch (error) {
    console.error("Lỗi ở getClasses", error);
    res.status(500).send({ message: "Lỗi hệ thống" });
  }
};

// Lấy danh sách sinh viên
export const getClassStudents = async (req, res) => {
  const { class_code, term } = req.query || {};
  if (!class_code || !term)
    return res.status(400).json({ error: "Không có kì học" });

  try {
    const rows = await getStudent(class_code, term);
    res.json(rows);
  } catch (error) {
    console.error("Lỗi ở getClassStudents", error);
    res.status(500).send({ message: "Lỗi hệ thống" });
  }
};


//Admin duyet diem
export const postAcceptAdmin = async (req, res) => {
  const { term_code } = req.body;
  const user_id = req.user?.id;

  // Validate input
  if (!term_code)  return res.status(400).json({message: "Không tìm thấy học kì" });
  try {
   const rows = await postAccept(term_code, user_id);

    return res.status(200).json({rows});
  } catch (err) {
    console.error("Lỗi ở postAcceptAdmin", err);
    return res.status(500).json({message: "Lỗi hệ thống" });
  }
};

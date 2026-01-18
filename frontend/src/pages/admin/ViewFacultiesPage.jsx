import React, { useState, useEffect, useCallback } from 'react';
import { Table, Alert, Button, Form, Card } from 'react-bootstrap'; // Import components
import { useTerm } from '../../layout/DashboardLayout';
import { getAdminFaculties, approveAdminAll } from '../../services/drlService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StudentAssessmentModal from '../../components/drl/StudentAssessmentModal';
import useNotify from '../../hooks/useNotify';
import useTermStatus from '../../hooks/useTermStatus';

const ViewFacultiesPage = () => {
  const { term } = useTerm();
  const { notify } = useNotify();
  const { isTermActive } = useTermStatus(term);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // { code, name }
  const [filterStudentCode, setFilterStudentCode] = useState('');
  const [filterFullName, setFilterFullName] = useState('');
  const [filterClassName, setFilterClassName] = useState('');
  const [filterFacultyName, setFilterFacultyName] = useState('');

  const fetchData = useCallback(async () => {
    if (!term) return;

    setLoading(true);
    setError(null);
    setSelectedStudent(null);
    try {
      const data = await getAdminFaculties(term);
      setFaculties(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [term]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async () => {
    if (!isTermActive) {
      notify('Học kỳ đã đóng. Không thể duyệt!', 'warning');
      return;
    }
    
    // Kiểm tra BẮT BUỘC: TẤT CẢ sinh viên phải được khoa duyệt trước
    const notApprovedByFaculty = faculties.filter(f => !f.is_faculty_approved);
    if (notApprovedByFaculty.length > 0) {
      alert(
        `Không thể duyệt!\n\n` +
        `Có ${notApprovedByFaculty.length} sinh viên chưa được khoa duyệt\n\n` +
        `Vui lòng đợi khoa duyệt tất cả sinh viên trước khi duyệt.`
      );
      return;
    }

    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn duyệt điểm cho tất cả sinh viên?\n\n' +
      'Điểm sẽ được lưu vào bảng kết quả cuối cùng.'
    );
    
    if (!confirmed) return;
    
    try {
      await approveAdminAll(term);
      notify('Đã duyệt thành công! Điểm đã được lưu vào bảng kết quả.', 'success');
      fetchData();
    } catch (error) {
      notify('Lỗi khi duyệt: ' + (error.response?.data?.message || error.message || 'Không xác định'), 'danger');
    }
  };

  const handleModalClose = (didSave) => {
    setSelectedStudent(null);
    if (didSave) {
      fetchData(); // Tải lại danh sách để cập nhật điểm mới
    }
  };

  const filteredFaculties = faculties.filter(f => {
    const matchesStudentCode = (f.student_code || '').toLowerCase().includes(filterStudentCode.toLowerCase());
    const matchesFullName = (f.full_name || '').toLowerCase().includes(filterFullName.toLowerCase());
    const matchesClassName = (f.class_name || '').toLowerCase().includes(filterClassName.toLowerCase());
    const matchesFacultyName = (f.faculty_name || '').toLowerCase().includes(filterFacultyName.toLowerCase());
    return matchesStudentCode && matchesFullName && matchesClassName && matchesFacultyName;
  });

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <Alert variant="danger">Lỗi tải danh sách khoa: {error}</Alert>;
    if (faculties.length === 0) {
      return <Alert variant="info">Không tìm thấy khoa nào.</Alert>;
    }

    return (
      <Table striped responsive className="align-middle">
        <thead>
          <tr>
            <th>MSV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Khoa</th>
            <th className='text-center'>Trạng thái Khoa</th>
            <th className='text-center'>Tổng điểm (Khoa)</th>
            <th className='text-center'>Tổng điểm (Trường)</th>
            <th></th>
          </tr>
          <tr>
            <th><Form.Control size="sm" value={filterStudentCode} onChange={(e) => setFilterStudentCode(e.target.value)}></Form.Control></th>
            <th><Form.Control size="sm" value={filterFullName} onChange={(e) => setFilterFullName(e.target.value)}></Form.Control></th>
            <th><Form.Control size="sm" value={filterClassName} onChange={(e) => setFilterClassName(e.target.value)}></Form.Control></th>
            <th><Form.Control size="sm" value={filterFacultyName} onChange={(e) => setFilterFacultyName(e.target.value)}></Form.Control></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculties.map(f => (
            <tr key={f.student_code}>
              <td>{f.student_code}</td>
              <td>{f.full_name}</td>
              <td>{f.class_name}</td>
              <td>{f.faculty_name}</td>
              <td className='text-center'>
                {f.is_faculty_approved ? (
                  <span className="badge bg-success">Đã duyệt</span>
                ) : (
                  <span className="badge bg-warning">Chờ duyệt</span>
                )}
              </td>
              <td className='text-center'>{f.old_score || 0}</td>
              <td className='text-center'>{f.total_score || f.old_score}</td> 
              <td>
                <Button
                  size="sm"
                  variant='success'
                  className="btn-main"
                  onClick={() => setSelectedStudent({ code: f.student_code, note: f.note })}
                  disabled={!f.is_faculty_approved || !isTermActive}
                  title={!isTermActive ? "Học kỳ đã đóng" : (!f.is_faculty_approved ? "Chưa được khoa duyệt" : "")}
                >
                  {!isTermActive ? 'Xem' : 'Xem/Sửa'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <div className='section-title mb-3'>
        <b>TỔNG HỢP SINH VIÊN</b>
      </div>

      <Card>
        <Card.Body>
          {renderContent()}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        <Button
          className="btn-main mt-3"
          variant='success'
          size="sm"
          onClick={handleApprove}
          disabled={loading || faculties.length === 0 || !isTermActive}
          title={!isTermActive ? "Học kỳ đã đóng" : ""}
        >
          Duyệt tất cả
        </Button>
      </div>
      {selectedStudent && (
        <StudentAssessmentModal
          studentCode={selectedStudent.code}
          term={term}
          onClose={handleModalClose}
          page="admin"
          role="admin"
          noted={selectedStudent.note}
        />
      )}
    </>
  );
};

export default ViewFacultiesPage;
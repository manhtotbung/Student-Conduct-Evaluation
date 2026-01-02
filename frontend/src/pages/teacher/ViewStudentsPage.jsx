import { useTerm } from '../../layout/DashboardLayout';
import ClassStudentList from '../../components/drl/ClassStudentList';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

export default function ViewStudentsPage() {
  const { term } = useTerm();
  const [classCode, setClassCode] = useState(null);

  return (
    <>
      <div className='section-title mb-3 px-3'>
        <strong>Danh sách sinh viên lớp {classCode}</strong>
      </div>
      
      <ClassStudentList 
        term={term} 
        setClassCode={setClassCode}
        page="teacher" 
      />
    </>
  );
}

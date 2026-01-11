export const roleVN = (r) => {
  switch (r) {
    case 'student': return 'Sinh viên';
    case 'teacher': return 'Giáo viên';
    case 'faculty': return 'Khoa';
    case 'admin': return 'Trường';
    default: return r;
  }
};
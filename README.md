# Student Conduct Evaluation

Hệ thống quản lý, đánh giá rèn luyện sinh viên (ĐRL) cho trường đại học/cao đẳng. Ứng dụng cho phép sinh viên, ban cán sự lớp, giảng viên, khoa và quản trị viên tương tác, nhập, phê duyệt cũng như tổng hợp kết quả điểm rèn luyện hàng kỳ.

## Tính năng chính
- Đăng nhập/xác thực đa vai trò (sinh viên, giảng viên, cán bộ lớp, quản trị…) bằng JWT.
- Nhập liệu và chấm điểm ĐRL cho từng sinh viên, có đối chiếu minh chứng.
- Quy trình xét duyệt phân cấp: sinh viên tự đánh giá, trưởng lớp tổng hợp, giảng viên/giám khảo xét duyệt, bộ phận khoa, admin tổng hợp.
- Quản lý kỳ học, khóa học, bộ tiêu chí ĐRL cập nhật linh hoạt.
- Minh chứng kèm theo (hỗ trợ file upload).
- Báo cáo, xuất/nhập file Excel tổng hợp điểm rèn luyện.
- Thông báo tự động khóa kỳ chấm điểm qua cron job.

## Kiến trúc hệ thống
- Frontend: ReactJS, Bootstrap, Axios.
    - Thư mục: `frontend/`
    - Thành phần chính: `src/components`, `src/pages`, `src/services` (gọi API), `src/context` (quản lý state).
- Backend: NodeJS (Express), JWT, PostgreSQL, Multer, ExcelJS.
    - Thư mục: `backend/`
    - Quản lý phân tầng Controllers, Models, Middlewares, Routes.
    - Lưu trữ file upload trong `backend/uploads`.
    - Các controller theo vai trò và quy trình: `authController`, `drlController`, `classLeaderController`, `facultyController`, `evidenceController`...

## Cách chạy dự án
### Chuẩn bị
- Cài đặt NodeJS
- Cài đặt PostgreSQL và cấu hình kết nối trong file `.env` (chưa public trong repo)

### Khởi tạo
Ở thư mục gốc, chạy:
```bash
npm install
```
Sau đó, build frontend:
```bash
npm run build
```
Khởi động backend (di chuyển vào `backend/`):
```bash
npm start
```
Hoặc chạy đồng thời qua root script:
```bash
npm start
```

### Đường dẫn truy cập mặc định
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Cấu trúc thư mục
```
Student-Conduct-Evaluation/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── db.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   ├── package.json
├── package.json
└── .gitignore
```

## Các script npm
- `npm run build` - Cài đặt dependency cho cả frontend/backend và build frontend.
- `npm start` - Chạy backend server.

## Ý nghĩa các thư mục chính
- `backend/controllers`, `models`, `middlewares`, `routes`: Theo chuẩn RESTful, chia theo nghiệp vụ và vai trò người dùng.
- `frontend/src/components` - Component giao diện React, chia theo từng vai trò người dùng và chức năng quản lý.
- `frontend/src/services` - Logic gọi API backend.

## Liên hệ & Góp ý
*Vui lòng tạo issue trên GitHub repo nếu có lỗi hoặc đề xuất tính năng mới*  
Maintainer: https://github.com/manhtotbung
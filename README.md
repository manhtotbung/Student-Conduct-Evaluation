# Student Conduct Evaluation

A management system for evaluating student conduct (ĐRL) designed for universities and colleges. The application allows students, class staff, lecturers, faculty, and administrators to interact, submit, approve, and aggregate conduct scores each semester.

## Main Features

- **Role-based authentication** (students, lecturers, class staff, administrators, etc.) via JWT tokens.
- **Data entry and assessment** for each student’s conduct with the ability to upload supporting evidence.
- **Hierarchical review workflow:** students self-assess, class leaders aggregate, lecturers/reviewers validate, faculty and admins oversee and aggregate.
- **Semester, course, and assessment rubric management** with flexible updates.
- **Support for uploading evidential files** with each assessment.
- **Comprehensive reporting & Excel import/export** for conduct scores.
- **Automatic period lock notification** using cron jobs.

## System Architecture

- **Frontend:** ReactJS, Bootstrap, Axios.
    - Directory: `frontend/`
    - Main structure: `src/components`, `src/pages`, `src/services` (API communication), `src/context` (state management).
- **Backend:** NodeJS (Express), JWT, PostgreSQL, Multer, ExcelJS.
    - Directory: `backend/`
    - Layered architecture: Controllers, Models, Middlewares, Routes.
    - File uploads are stored inside `backend/uploads`.
    - Main controllers by roles and process: `authController`, `drlController`, `classLeaderController`, `facultyController`, `evidenceController`, ...

## Getting Started

### Prerequisites

- NodeJS installed
- PostgreSQL installed and connection configured via `.env` file (not public in repo)

### Initialization

From the project root, run:
```bash
npm install
```
Then build the frontend:
```bash
npm run build
```
To start the backend (move to `backend/` folder):
```bash
npm start
```
Or run everything together from the root script:
```bash
npm start
```

### Default Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Directory Structure

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

## Useful npm Scripts

- `npm run build` – Installs all backend/frontend dependencies and builds the frontend.
- `npm start` – Starts the backend server.

## Directory Descriptions

- `backend/controllers`, `models`, `middlewares`, `routes`: RESTful organization, split by user roles and business logic.
- `frontend/src/components`: React UI components, organized by user roles and management features.
- `frontend/src/services`: API logic for backend communication.

## Contact & Feedback

*Please open a GitHub issue if you find a bug or want to suggest new features*  
Maintainer: https://github.com/manhtotbung
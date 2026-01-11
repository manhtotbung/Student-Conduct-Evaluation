export const MENUS = {
  student: [
    {
      key: "self",
      path: "/self-assessment",
      icon: "bi-ui-checks-grid",
      text: "Tự đánh giá",
    },
    {
      key: "self-history",
      path: "/history",
      icon: "bi-archive-fill",
      text: "Lịch sử đánh giá",
    },
  ],
  teacher: [
    {
      key: "view-students",
      path: "/teacher/students",
      icon: "bi-people",
      text: "Quản lý sinh viên",
    },
    {
      key: "manage-class-leader",
      path: "/teacher/class-leader",
      icon: "bi-star",
      text: "Quản lý lớp trưởng",
    },
  ],
  faculty: [
    {
      key: "view-classes",
      path: "/faculty/classes",
      icon: "bi-people",
      text: "Quản lý sinh viên",
    },
  ],
  admin: [
    {
      key: "view-faculties",
      path: "/admin/faculties",
      icon: "bi-building",
      text: "Quản lý sinh viên",
    },
    {
      key: "view-students",
      path: "/admin/search",
      icon: "bi-binoculars",
      text: "Tìm kiếm",
    },
    {
      key: "admin-criteria",
      path: "/admin/criteria",
      icon: "bi-sliders2",
      text: "Quản lý tiêu chí",
    },
    {
      key: "manage-groups",
      path: "/admin/groups/manage",
      icon: "bi bi-tags-fill",
      text: "Quản lý nhóm tiêu chí",
    },

    {
      key: "manage-terms",
      path: "/admin/terms",
      icon: "bi-calendar-event-fill",
      text: "Quản lý học kỳ",
    },
  ],
};

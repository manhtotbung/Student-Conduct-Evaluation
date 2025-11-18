import { NavLink } from 'react-router-dom';
import { Card, ListGroup, Container, Navbar, Offcanvas } from 'react-bootstrap'; // Đổi tên Navbar thành BsNavbar để tránh xung đột
import { MENUS } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const menuItems = MENUS[user?.role] || [];
  return (
    // Dùng BsNavbar thay cho nav.navbar
    <>
    


    <Navbar key={1} expand={false} className="bg-body-tertiary mb-3"  data-bs-theme="dark">
          <Container fluid>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="start"
            >
              <Card>
                {/* Dùng Card.Header thay cho div.card-header */}
                <Card.Header className="fw-semibold"><i className="bi bi-gear me-2"></i>TÍNH NĂNG</Card.Header>

                {/* Dùng ListGroup thay cho div.list-group */}
                <ListGroup variant="flush">
                  {menuItems.map(m => (
                    <ListGroup.Item
                      key={m.key}
                      // Dùng NavLink và as={Link} để giữ nguyên routing logic
                      as={NavLink}
                      to={m.path}
                      action // Thêm prop action để có hiệu ứng hover/active
                      // Tùy chỉnh class active, thay 'menu-active' nếu cần
                      variant='success'
                      className="menu"
                    >
                      <i className={`bi ${m.icon} me-2`}></i>{m.text}
                    </ListGroup.Item>
                  ))}

                  {/* Nút Đăng xuất */}
                  <ListGroup.Item
                    as="a" // Dùng as="a" hoặc as={Button}
                    href="#logout"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                    action // Thêm action
                    className="text-danger" // Giữ màu đỏ
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                  </ListGroup.Item>
                </ListGroup>
              </Card>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        
    
    </>
  );
};

export default Header;
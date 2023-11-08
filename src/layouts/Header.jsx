import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
const Header = (props) => {
  const { user, onLogout } = props;
  return (
    <Navbar expand="md" className={styles.navBox}>
      <Container className={styles.container}>
        <Navbar.Brand as={Link} to="/" className={styles.logo}>
          LearnHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.collapse}>
          <Nav className={styles.nav}>
            <Link to="/courses" className={styles.link}>
              Courses
            </Link>
            <Link to="/teach" className={styles.link}>
              Teach on LearnHub
            </Link>
            {user ? (
              <button onClick={onLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
                <Link to="/signup" className={styles.link}>
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

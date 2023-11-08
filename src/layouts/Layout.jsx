import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  const { user, onLogout } = props;
  return (
    <div className={styles.app}>
      <Header user={user} onLogout={onLogout} />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

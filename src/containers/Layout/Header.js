import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Header = () => {
  return (
    <header className={styles.header}>
      <MainNavigation />
    </header>
  );
};

export default Header;

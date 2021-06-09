import React, { useContext } from "react";
import styles from "./MainNavigation.module.css";

import { Link, NavLink } from "react-router-dom";
import Button from "../../components/Button";
import AuthContext from "../../store/auth-context";

const MainNavigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        React Auth (logo)
      </Link>
      <nav className={styles.nav}>
        <ul>
          {!ctx.isLoggedIn && (
            <li>
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                to="/login"
              >
                Log In
              </NavLink>
            </li>
          )}

          {!ctx.isLoggedIn && (
            <li>
              <NavLink
                className={`${styles.link} ${styles.navButton}`}
                to="/sign-up"
              >
                Sign Up
              </NavLink>
            </li>
          )}

          {ctx.isLoggedIn && (
            <li>
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          )}

          {ctx.isLoggedIn && (
            <li>
              <Button onClick={ctx.onLogout}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

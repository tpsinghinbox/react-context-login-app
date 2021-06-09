import { Fragment } from "react";
import styles from "./Layout.module.css";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={styles["router-demo-main"]}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;

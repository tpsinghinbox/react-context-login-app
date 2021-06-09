import React, { useContext } from "react";
import Button from "../../components/Button";

import Card from "../../components/Card";
import classes from "./Home.module.css";
// import AuthContext from '../../context/auth-context';

const Home = (props) => {
  // const ctx = useContext();

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;

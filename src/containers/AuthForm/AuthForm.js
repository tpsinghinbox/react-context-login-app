import { useEffect, useState } from "react";
import ExistingAccountLogin from "../ExistingAccountLogin";
import NewAccountLogin from "../NewAccountLogin";

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log("useEffect", props.isLogin);
    setIsLogin(props.isLogin);
  }, [props.isLogin]);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  console.log(isLogin);
  return (
    <>
      {isLogin && <ExistingAccountLogin onChangeMode={switchModeHandler} />}
      {!isLogin && <NewAccountLogin onChangeMode={switchModeHandler} />}
    </>
  );
};

export default AuthForm;

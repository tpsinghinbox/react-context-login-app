import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "../AuthForm/AuthForm.module.css";

import { useHistory } from "react-router-dom";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Form from "../../components/Form";

import useValidateInput from "../../hooks/use-validate-input";
import AuthContext from "../../store/auth-context";

const ExistingAccountLogin = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: handleEmailChangeHandler,
    inputBlurHandler: validateEmailHandler,
    errorMessage: emailInputErrorMessage,
    handleServerError: emailValidServerError,
  } = useValidateInput(
    (value) => value.trim().includes("@"),
    "Entered email is not valid"
  );

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: handlePasswordChangeHandler,
    inputBlurHandler: validatePasswordHandler,
    errorMessage: passwordInputErrorMessage,
    handleServerError: passwordValidServerError,
  } = useValidateInput(
    (value) => value.trim().length > 0,
    "Entered password does not meet the necessary requirements"
  );

  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid);
  }, [emailIsValid, passwordIsValid]);

  const ctx = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        let errorMessage = "Authentication failed";
        if (data && data.error) {
          if (data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        } else {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          ctx.onLogin(data.idToken, expirationTime.toISOString());
          history.replace("/");
        }
      })
      .catch((error) => {
        if (
          error.message === "INVALID_PASSWORD" ||
          error.message.indexOf("TOO_MANY_ATTEMPTS_TRY_LATER") !== -1
        ) {
          passwordValidServerError(error.message);
        } else if (error.message === "EMAIL_NOT_FOUND") {
          emailValidServerError(error.message);
        }
      });
  };

  return (
    <Card className={classes.login}>
      <h2 className={classes.header}>Sign in to your account</h2>
      <Form
        onSubmit={onSubmitHandler}
        formIsValid={formIsValid}
        disableSubmitButton={!formIsValid || isLoading}
        submitButtonLabel="Login"
      >
        <Input
          id="email"
          label="Email"
          type="email"
          value={enteredEmail}
          isValid={emailIsValid}
          onChange={handleEmailChangeHandler}
          onBlur={validateEmailHandler}
          hasError={emailInputHasError}
          errorMessage={emailInputErrorMessage}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={enteredPassword}
          isValid={passwordIsValid}
          onChange={handlePasswordChangeHandler}
          onBlur={validatePasswordHandler}
          hasError={passwordInputHasError}
          errorMessage={passwordInputErrorMessage}
        />
      </Form>
      <div className={classes.actions}>
        <Link className={classes["link-button"]} to="/sign-up">
          Create new account
        </Link>
      </div>
    </Card>
  );
};

export default ExistingAccountLogin;

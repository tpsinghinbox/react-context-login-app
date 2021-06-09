import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../AuthForm/AuthForm.module.css";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Form from "../../components/Form";

import useValidateInput from "../../hooks/use-validate-input";
import AuthContext from "../../store/auth-context";

const NewAccountLogin = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useContext(AuthContext);

  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: handleFirstNameChangeHandler,
    inputBlurHandler: validateFirstNameHandler,
    errorMessage: firstNameInputErrorMessage,
  } = useValidateInput(
    (value) => value.trim().length > 0 && /^[a-zA-Z]{4,}$/.test(value.trim()),
    "Entered first name is not valid"
  );

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: handleLastNameChangeHandler,
    inputBlurHandler: validateLastNameHandler,
    errorMessage: lastNameInputErrorMessage,
  } = useValidateInput(
    (value) => value.trim().length > 0 && /^[a-zA-Z]{0,}$/.test(value.trim()),
    "Entered last name is not valid"
  );

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
    (value) => value.trim().length > 6,
    "Entered password does not meet the necessary requirements"
  );

  useEffect(() => {
    setFormIsValid(
      emailIsValid && passwordIsValid && firstNameIsValid && lastNameIsValid
    );
  }, [emailIsValid, passwordIsValid, firstNameIsValid, lastNameIsValid]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      !firstNameIsValid && validateFirstNameHandler();
      !lastNameIsValid && validateLastNameHandler();
      !emailIsValid && validateEmailHandler();
      !passwordIsValid && validatePasswordHandler();
    } else {
      setIsLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8QsI1wePQo2spo1UIQo5vWTAwJEqT8SI",
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
          }
        })
        .catch((error) => {
          if (
            error.message === "INVALID_PASSWORD" ||
            error.message.indexOf("TOO_MANY_ATTEMPTS_TRY_LATER") !== -1
          ) {
            passwordValidServerError(error.message);
          } else if (error.message === "EMAIL_EXISTS") {
            emailValidServerError(error.message);
          }
        });
    }
  };

  return (
    <Card className={classes.login}>
      <h2 className={classes.header}>Sign up</h2>
      <Form
        onSubmit={onSubmitHandler}
        formIsValid={formIsValid}
        submitButtonLabel="Create Account"
        disableSubmitButton={!formIsValid || isLoading}
      >
        <div className={classes["input-group"]}>
          <Input
            id="firstName"
            label="First Name"
            type="text"
            value={enteredFirstName}
            isValid={firstNameIsValid}
            onChange={handleFirstNameChangeHandler}
            onBlur={validateFirstNameHandler}
            hasError={firstNameInputHasError}
            errorMessage={firstNameInputErrorMessage}
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            value={enteredLastName}
            isValid={lastNameIsValid}
            onChange={handleLastNameChangeHandler}
            onBlur={validateLastNameHandler}
            hasError={lastNameInputHasError}
            errorMessage={lastNameInputErrorMessage}
          />
        </div>
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
        <Link className={classes["link-button"]} to="/login">
          Login with existing account
        </Link>
      </div>
    </Card>
  );
};

export default NewAccountLogin;

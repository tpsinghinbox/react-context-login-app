import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import Form from "../../components/Form/Form";
import Input from "../../components/Input";

import styles from "./UserProfile.module.css";

import useValidateInput from "../../hooks/use-validate-input";
import AuthContext from "../../store/auth-context";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(AuthContext);
  const history = useHistory();

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8QsI1wePQo2spo1UIQo5vWTAwJEqT8SI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
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
        passwordValidServerError(error.message);
      });
  };

  return (
    <Card className={styles.profile}>
      <h2>Your User Profile</h2>
      <Form
        onSubmit={onSubmitHandler}
        submitButtonLabel="Change password"
        disableSubmitButton={isLoading}
      >
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
    </Card>
  );
};

export default UserProfile;

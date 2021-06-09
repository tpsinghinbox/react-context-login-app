import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      ...state,
      value: action.value,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      ...state,
      isTouched: true,
    };
  }
  if (action.type === "INPUT_RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = valueIsValid === false && inputState.isTouched;

  const valueChangeHandler = (event) => {
    inputDispatch({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const inputBlurHandler = () => {
    inputDispatch({ type: "INPUT_BLUR" });
  };

  const resetInput = () => {
    inputDispatch({ type: "INPUT_RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;

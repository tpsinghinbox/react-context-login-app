import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
  isValid: false,
  hasError: false,
  errorMessage: "",
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    const inputState = {
      ...state,
      value: action.value,
      isValid: action.validateValue(action.value),
    };
    if (inputState.isTouched) {
      inputState.hasError = !action.validateValue(action.value);
    }
    return inputState;
  }
  if (action.type === "INPUT_BLUR") {
    return {
      ...state,
      isTouched: true,
      hasError: !state.isValid,
    };
  }
  if (action.type === "INPUT_RESET") {
    return {
      ...state,
      value: "",
      isTouched: false,
    };
  }
  if (action.type === "INPUT_ERROR") {
    return {
      ...state,
      isValid: false,
      hasError: true,
      errorMessage: action.errorMessage,
    };
  }
  return initialInputState;
};

const useValidateInput = (validateValue, errorMessage = "") => {
  const [inputState, inputDispatch] = useReducer(inputStateReducer, {
    ...initialInputState,
    errorMessage: errorMessage,
  });

  const valueChangeHandler = (event) => {
    inputDispatch({
      type: "INPUT_CHANGE",
      value: event.target.value,
      validateValue,
    });
  };

  const inputBlurHandler = () => {
    inputDispatch({ type: "INPUT_BLUR" });
  };

  const resetInput = () => {
    inputDispatch({ type: "INPUT_RESET" });
  };

  const handleServerError = (errorMsg) => {
    inputDispatch({ type: "INPUT_ERROR", errorMessage: errorMsg });
  };

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    hasError: inputState.hasError,
    errorMessage: inputState.errorMessage,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
    handleServerError,
  };
};

export default useValidateInput;

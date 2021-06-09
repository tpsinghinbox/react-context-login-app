import React, { useRef, useImperativeHandle } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  & label,
  & input {
    display: block;
  }

  & label {
    font-weight: bold;
    flex: 1;
    color: #464646;
    margin-bottom: 0.5rem;
  }

  & input {
    width: 100%;
    font: inherit;
    padding: 0.35rem 0.35rem;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
  }

  & input:focus {
    outline: none;
    border-color: #666;
    background: #ffffe6;
  }

  &.invalid input {
    border-color: red;
    background: #fbdada;
  }

  .input__input-error {
    margin-top: 0.5rem;
    margin-left: 0.2rem;
    color: #ff4d4d;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.3;
  }
`;

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return { focus: activate };
  });

  return (
    <StyledInput className={props.hasError && "invalid"}>
      <div className="input__input-field">
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
      {props.hasError && (
        <div className="input__input-error">{props.errorMessage}</div>
      )}
    </StyledInput>
  );
});

export default Input;

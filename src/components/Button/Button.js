import classes from "./Button.module.css";

export const LinkButton = (props) => {
  return (
    <button
      className={classes["link-button"]}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
};

const Button = (props) => {
  return (
    <button
      className={`${classes.button} ${props.disabled ? classes.disabled : ""}`}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
};

export default Button;

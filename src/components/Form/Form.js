import classes from "./Form.module.css";
import Button from "../Button";

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children}
      <div className={classes.actions}>
        <Button disabled={false || props.disableSubmitButton} type="submit">
          {props.submitButtonLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;

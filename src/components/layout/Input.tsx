import { ChangeEventHandler } from "react";
import styles from "styles/layout/Input.module.scss";

interface InputProps {
  label?: string;
  id: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: any;
  required?: boolean;
  defaultChecked?: boolean;
  onChange: ChangeEventHandler;
  unit?: string;
}

const Input = (props: InputProps) => {
  if (props.type === "radio") {
    return (
      <span className={styles.labelWrapper}>
        <input {...props} className={styles.input} />
        <label className={styles.label} htmlFor={props.id}>
          {props.label}
        </label>
      </span>
    );
  } else {
    return (
      <div className={styles.inputWrapper}>
        <input className={styles.input} {...props}></input>
        <span className={styles.unit}> {props.unit}</span>
      </div>
    );
  }
};

export default Input;

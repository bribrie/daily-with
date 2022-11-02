import { ReactNode } from "react";
import styles from "styles/layout/create/CreateInput.module.scss";

interface CreateInputProps {
  labelId?: string;
  type: string;
  labelValue?: string;
  unit?: string;
  children: ReactNode;
}

const CreateInput = ({
  type,
  children,
  labelId,
  labelValue,
  unit,
}: CreateInputProps) => {
  //input타입이 radio일 때
  if (type === "radio") {
    return (
      <span className={styles.labelWrapper}>
        {children}
        <label className={styles.label} htmlFor={labelId}>
          {labelValue}
        </label>
      </span>
    );
  }
  // 다른 input타입들
  else {
    return (
      <div className={styles.inputWrapper}>
        {children}
        {unit ? <span className={styles.unit}> {unit}</span> : null}
      </div>
    );
  }
};

export default CreateInput;

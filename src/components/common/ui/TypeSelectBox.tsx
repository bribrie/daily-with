import { RefObject } from "react";
import styles from "styles/common/ui/TypeSelectBox.module.scss";

interface SelectProps {
  typeRef: RefObject<HTMLSelectElement>;
  typeDefaultValue: string | null;
}

const TypeSelectBox = ({ typeRef, typeDefaultValue }: SelectProps) => {
  return (
    <select
      className={styles.selectBox}
      ref={typeRef}
      defaultValue={typeDefaultValue ? typeDefaultValue : "헬스"}
    >
      <option>헬스</option>
      <option>PT</option>
      <option>필라테스</option>
    </select>
  );
};

export default TypeSelectBox;

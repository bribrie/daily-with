import styles from "styles/common/ui/LabelBox.module.scss";

interface LabelProps {
  list: string[];
}

const LabelBox = ({ list }: LabelProps) => {
  return (
    <>
      {list.map((el, idx) => (
        <div
          key={idx}
          className={`${styles.day} 
        ${el === "월" && styles.mon} 
        ${el === "화" && styles.tue} 
        ${el === "수" && styles.wed}
        ${el === "목" && styles.thu}
        ${el === "금" && styles.fri}
        ${el === "토" && styles.sat}
        ${el === "일" && styles.sun}
        ${el === "매일" && styles.everyday}
        `}
        >
          {el}
        </div>
      ))}
    </>
  );
};

export default LabelBox;

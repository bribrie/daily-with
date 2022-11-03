import { MouseEvent } from "react";
import styles from "styles/ui/DayBox.module.scss";

interface Dayprops {
  handleDaySelect: (e: MouseEvent) => void;
}

const DayBox = ({ handleDaySelect }: Dayprops) => {
  const day = ["월", "화", "수", "목", "금", "토", "일", "매일"];

  return (
    <div className={styles.dateWrapper}>
      {day.map((el, idx) => (
        <div
          key={idx}
          className={styles.day}
          onClick={(e) => {
            handleDaySelect(e);
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default DayBox;

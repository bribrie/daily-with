import { TargetItemProps } from "containers/sales/monthlyTarget/MonthlyTargetItemContainer";
import { useState, MouseEventHandler } from "react";
import styles from "styles/sales/monthlyTarget/MonthlyTargetItem.module.scss";

interface Props extends TargetItemProps {
  handleDelete: MouseEventHandler;
}

const MonthlyTargetItem = ({
  id,
  month,
  type,
  newTarget,
  reRegisterTarget,
  totalSales,
  changeEditMode,
  handleDelete,
}: Props) => {
  const [hideButton, setHideButton] = useState(true); //수정, 삭제 버튼 보여주는 상태

  return (
    <>
      <div
        className={styles.listWrapper}
        onMouseEnter={() => {
          setHideButton(false);
        }}
        onMouseLeave={() => {
          setHideButton(true);
        }}
      >
        <div className={styles.month}>{month}</div>
        <div className={styles.type}>{type}</div>
        <div className={styles.new}>{newTarget}명</div>
        <div className={styles.reRegister}>{reRegisterTarget} 명</div>
        <div className={styles.totalSales}>{totalSales} 원</div>
        {hideButton ? null : (
          <div className={styles.btnWrapper}>
            <div
              className={styles.twoButton}
              onClick={() => changeEditMode(id)}
            >
              수정
            </div>
            <div className={styles.twoButton} onClick={handleDelete}>
              삭제
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MonthlyTargetItem;

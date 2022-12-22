import Modal from "components/common/modal/Modal";
import { TargetItemProps } from "containers/sales/monthlyTarget/MonthlyTargetItemContainer";
import { useState, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "styles/sales/monthlyTarget/MonthlyTargetItem.module.scss";

interface Props extends TargetItemProps {
  isModalOpen: boolean;
  handleModalOpen: (id: string) => void;
  handleDelete: MouseEventHandler;
}

const MonthlyTargetItem = ({
  targetItem,
  handleDelete,
  isModalOpen,
  handleModalOpen,
}: Props) => {
  const [hideButton, setHideButton] = useState(true); //수정, 삭제 버튼 보여주는 상태

  return (
    <>
      {isModalOpen ? (
        <Modal message="정말 삭제하시겠습니까?" onConfirm={handleDelete} />
      ) : null}
      <div
        className={styles.listWrapper}
        onMouseEnter={() => {
          setHideButton(false);
        }}
        onMouseLeave={() => {
          setHideButton(true);
        }}
      >
        <div className={styles.month}>{targetItem.month}</div>
        <div className={styles.type}>{targetItem.type}</div>
        <div className={styles.new}>{targetItem.newTarget}명</div>
        <div className={styles.reRegister}>
          {targetItem.reRegisterTarget} 명
        </div>
        <div className={styles.totalSales}>{targetItem.totalSales} 원</div>
        {hideButton ? null : (
          <div className={styles.btnWrapper}>
            <div className={styles.twoButton}>
              <Link to={`${targetItem.id}`}>수정</Link>
            </div>
            <div
              className={styles.twoButton}
              onClick={() => {
                handleModalOpen(targetItem.id);
              }}
            >
              삭제
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MonthlyTargetItem;

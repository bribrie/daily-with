import { MouseEventHandler, useState } from "react";
import { ItemProps } from "containers/sales/visitTracker/VisitItemContainer";
import { Link } from "react-router-dom";
import Modal from "components/common/modal/Modal";
import styles from "styles/sales/visitTracker/VisitForm.module.scss";

interface Props extends ItemProps {
  isModalOpen: boolean;
  handleModalOpen: MouseEventHandler;
  handleDelete: () => void;
}

const VisitItem = ({
  visitList,
  isModalOpen,
  handleModalOpen,
  handleDelete,
}: Props) => {
  const [hideButton, setHideButton] = useState(true); //수정.삭제 버튼 숨김

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
        <div className={styles.date}>{visitList.date}</div>
        <div className={styles.type}>{visitList.type}</div>
        <div className={styles.offline}>{visitList.offline}명</div>
        <div className={styles.online}>{visitList.online}명</div>
        <div className={styles.friend}>{visitList.friend}명</div>
        <div className={styles.telIn}>{visitList.telIn}명</div>
        <div className={styles.naverIn}>{visitList.naverIn}명</div>
        <div className={styles.kakaoIn}>{visitList.kakaoIn}명</div>
        <div className={styles.totalVisit}>{visitList.totalVisit}명</div>
        <div className={styles.registerVisit}>{visitList.registerVisit}명</div>
        {hideButton ? null : (
          <div className={styles.twoButtonWrapper}>
            <div className={styles.twoButton}>
              <Link to={`${visitList.id}`}>수정</Link>
            </div>
            <div className={styles.twoButton} onClick={handleModalOpen}>
              삭제
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisitItem;

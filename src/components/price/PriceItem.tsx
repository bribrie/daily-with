import { useState, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Modal from "components/common/modal/Modal";
import styles from "styles/price/PriceItem.module.scss";

interface ItemProps {
  id: string | undefined;
  type: string;
  period: string;
  title: string;
  price: string;
  delay: string;
  event: boolean;
  isModalOpen: boolean;
  handleModalOpen: (id: string) => void;
  handleDelete: MouseEventHandler;
}

const PriceItem = ({
  id,
  type,
  period,
  title,
  price,
  delay,
  event,
  isModalOpen,
  handleModalOpen,
  handleDelete,
}: ItemProps) => {
  //보통은 가격 보여주고, 해당 이용권에 마우스 올리면 수정하기/삭제하기 버튼 보여줌
  const [hide, setHide] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal message="정말 삭제하시겠습니까?" onConfirm={handleDelete} />
      )}
      <div
        className={styles.container}
        onMouseEnter={() => setHide(true)}
        onMouseLeave={() => setHide(false)}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div>
              {type} • {period}
              {delay !== "0" && ` • ${delay}일`}
              {event && " • 이벤트"}
            </div>
          </div>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.priceWrapper}>
          {!hide ? (
            <>
              <div className={styles.price}>{price} 원</div>
            </>
          ) : (
            <>
              <div className={styles.editDeleteBtn}>
                <Link to={`${id}`}>
                  <div>수정하기</div>
                </Link>
                <div onClick={() => handleModalOpen(id as string)}>
                  삭제하기
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceItem;

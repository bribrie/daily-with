import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { SalesItemProps } from "containers/sales/dailySales/DailySalesItemContainer";
import Modal from "components/common/modal/Modal";
import styles from "styles/sales/dailySales/DailySalesItem.module.scss";

interface Props extends Omit<SalesItemProps, "filterValue"> {
  deleteSalesListItem: MouseEventHandler;
  isModalOpen: boolean;
  handleModalOpen: (id: string) => void;
}

const DailySalesItem = ({
  itemType,
  savedSalesList,
  deleteAddedItem,
  deleteSalesListItem,
  isModalOpen,
  handleModalOpen,
}: Props) => {
  const [hideButton, setHideButton] = useState(true);

  return (
    <>
      {isModalOpen ? (
        <Modal
          message="정말 삭제하시겠습니까?"
          onConfirm={deleteSalesListItem}
        />
      ) : null}
      <div
        className={styles.wrapper}
        onMouseEnter={() => {
          setHideButton(false);
        }}
        onMouseLeave={() => {
          setHideButton(true);
        }}
      >
        <div className={styles.date}>{savedSalesList.date}</div>
        <div className={styles.type}>{savedSalesList.type}</div>
        <div className={styles.newRegister}>{savedSalesList.newRegister}명</div>
        <div className={styles.reRegister}>{savedSalesList.reRegister}명</div>
        <div className={styles.totalSales}>{savedSalesList.totalSales}원</div>

        {itemType === "added" && deleteAddedItem ? (
          //서버에 저장된 데이터가 아니면 삭제만 가능
          <div className={styles.buttonWrapper}>
            <button
              onClick={() => deleteAddedItem(savedSalesList.id as number)}
            >
              삭제
            </button>
          </div>
        ) : null}

        {itemType.includes("sales") ? (
          //저장된 데이터면 수정, 삭제 모두 가능
          <div
            className={styles.twoButtonWrapper}
            onMouseEnter={() => {
              setHideButton(false);
            }}
            onMouseLeave={() => {
              setHideButton(true);
            }}
          >
            {hideButton ? null : (
              <>
                <button className={styles.twoButton}>
                  <Link to={`${savedSalesList.id}`}>수정</Link>
                </button>
                <button
                  className={styles.twoButton}
                  onClick={() => handleModalOpen(savedSalesList.id as string)}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DailySalesItem;

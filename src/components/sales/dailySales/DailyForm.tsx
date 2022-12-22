import { ChangeEventHandler, RefObject } from "react";
import { INPUT_TODAY_FORMAT } from "utilites/Date";
import { MouseEventHandler } from "react";
import { AddSalesItemListType } from "redux/sales/salesTypes";
import { FormProps } from "containers/sales/dailySales/DailyFormContainer";
import DailySalesHeader from "./DailySalesHeader";
import TypeSelectBox from "components/common/ui/TypeSelectBox";
import DailySalesItemContainer from "containers/sales/dailySales/DailySalesItemContainer";
import styles from "styles/sales/dailySales/DailyForm.module.scss";

interface Props extends Omit<FormProps, "resetItemCount" | "filterValue"> {
  addedItemList: AddSalesItemListType[];
  dateRef: RefObject<HTMLInputElement>;
  typeRef: RefObject<HTMLSelectElement>;
  newRegisterRef: RefObject<HTMLInputElement>;
  reRegisterRef: RefObject<HTMLInputElement>;
  totalSales: string;
  handleTotalSales: ChangeEventHandler;
  handleSubmit: MouseEventHandler;
  addSalesItem: MouseEventHandler;
  deleteAddedItem: (id: number) => void;
  handleEditSubmit: MouseEventHandler;
  count: number;
}

const DailyForm = ({
  type,
  editData,
  addedItemList,
  dateRef,
  typeRef,
  newRegisterRef,
  reRegisterRef,
  totalSales,
  handleTotalSales,
  handleSubmit,
  addSalesItem,
  deleteAddedItem,
  count,
  handleEditSubmit,
}: Props) => {
  return (
    <>
      {type === "edit" && <DailySalesHeader />}
      <form className={styles.wrapper}>
        <div className={styles.date}>
          {type === "today" ? (
            <input
              type="date"
              ref={dateRef}
              defaultValue={INPUT_TODAY_FORMAT}
              disabled
            />
          ) : (
            <input
              type="date"
              ref={dateRef}
              defaultValue={editData && editData.date}
              required
            />
          )}
        </div>
        <div className={styles.type}>
          <TypeSelectBox
            typeRef={typeRef}
            typeDefaultValue={editData ? editData.type : null}
          />
        </div>
        <div className={styles.newRegister}>
          <input
            type="number"
            ref={newRegisterRef}
            defaultValue={editData ? editData.newRegister : 0}
            min={0}
            required
          />
        </div>
        <div className={styles.reRegister}>
          <input
            type="number"
            ref={reRegisterRef}
            defaultValue={editData ? editData.reRegister : 0}
            min={0}
            required
          />
        </div>
        <div className={styles.totalSales}>
          <input
            type="text"
            value={totalSales}
            onChange={handleTotalSales}
            required
          />
        </div>
        {editData ? null : (
          <div className={styles.buttonWrapper}>
            <button type="button" onClick={addSalesItem}>
              추가
            </button>
          </div>
        )}
      </form>
      {count >= 1 ? (
        <>
          {addedItemList.map((data) => (
            <DailySalesItemContainer
              key={data.id}
              itemType="added"
              savedSalesList={data}
              deleteAddedItem={deleteAddedItem}
            />
          ))}
        </>
      ) : null}
      <div className={styles.addAsyncButton}>
        <button
          type="submit"
          onClick={editData ? handleEditSubmit : handleSubmit}
        >
          저장
        </button>
      </div>
    </>
  );
};

export default DailyForm;

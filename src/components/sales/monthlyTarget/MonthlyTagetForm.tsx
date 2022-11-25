import { ChangeEventHandler, FormEventHandler, RefObject } from "react";
import { TargetListType } from "redux/types";
import { MONTHLY_TARGET_DATE } from "utilites/Date";
import styles from "styles/sales/monthlyTarget/MonthlyTargetForm.module.scss";

interface FormProps {
  monthRef: RefObject<HTMLInputElement>;
  typeRef: RefObject<HTMLInputElement>;
  newRef: RefObject<HTMLInputElement>;
  reRegisterRef: RefObject<HTMLInputElement>;
  totalSales: string;
  handleTotalSales: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  editItem: undefined | TargetListType;
  handleEditSubmit: FormEventHandler;
}

export const MonthlyTargetForm = ({
  monthRef,
  typeRef,
  newRef,
  reRegisterRef,
  totalSales,
  handleTotalSales,
  handleSubmit,
  editItem,
  handleEditSubmit,
}: FormProps) => {
  return (
    <form
      className={styles.listWrapper}
      onSubmit={editItem ? handleEditSubmit : handleSubmit}
    >
      <div className={styles.month}>
        <input
          type="text"
          ref={monthRef}
          defaultValue={
            editItem ? `${editItem.month}` : `${MONTHLY_TARGET_DATE}`
          }
        />
      </div>
      <div className={styles.type}>
        <input
          type="text"
          ref={typeRef}
          defaultValue={editItem ? editItem.type : ""}
          placeholder="종목"
          required
        />
      </div>
      <div className={styles.new}>
        <input
          type="number"
          ref={newRef}
          defaultValue={editItem ? editItem.newTarget : 0}
          placeholder="신규 회원 목표 수"
          min={0}
          required
        />
      </div>
      <div className={styles.reRegister}>
        <input
          type="number"
          ref={reRegisterRef}
          defaultValue={editItem ? editItem.reRegisterTarget : 0}
          placeholder="재등록 회원 목표 수"
          min={0}
          required
        />
      </div>
      <div className={styles.totalSales}>
        <input
          type="text"
          value={totalSales}
          required
          onChange={handleTotalSales}
        />
      </div>
      {editItem ? (
        <div className={styles.buttonWrapper}>
          <button>저장</button>
        </div>
      ) : (
        <div className={styles.buttonWrapper}>
          <button>등록</button>
        </div>
      )}
    </form>
  );
};

export default MonthlyTargetForm;

import { ChangeEventHandler, FormEventHandler, RefObject } from "react";
import { TargetFormProps } from "containers/sales/monthlyTarget/MonthlyTargetFormContainer";
import { MONTHLY_TARGET_DATE } from "utilites/Date";
import MonthlyTargetHeader from "./MonthlyTargetHeader";
import styles from "styles/sales/monthlyTarget/MonthlyTargetForm.module.scss";

interface FormProps extends TargetFormProps {
  monthRef: RefObject<HTMLInputElement>;
  typeRef: RefObject<HTMLInputElement>;
  newRef: RefObject<HTMLInputElement>;
  reRegisterRef: RefObject<HTMLInputElement>;
  totalSales: string;
  handleTotalSales: ChangeEventHandler;
  handleSubmit: FormEventHandler;
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
    <>
      {editItem ? <MonthlyTargetHeader /> : null}
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
        {!editItem ? (
          <div className={styles.buttonWrapper}>
            <button>등록</button>
          </div>
        ) : null}
      </form>
      {editItem ? (
        <div className={styles.editButtonWrapper}>
          <button type="submit" onClick={handleEditSubmit}>
            수정 완료
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MonthlyTargetForm;

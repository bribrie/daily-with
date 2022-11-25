import { MouseEventHandler } from "react";
import { TargetListType } from "redux/types";
import MonthlyTargetFormContainer from "containers/sales/monthlyTarget/MonthlyTargetFormContainer";
import MonthlyTargetItemContainer from "containers/sales/monthlyTarget/MonthlyTargetItemContainer";
import styles from "styles/sales/monthlyTarget/MonthlyTargetList.module.scss";

interface ListProps {
  targetList: TargetListType[];
  itemCountList: number;
  showAddTargetForm: MouseEventHandler;
  resetItemCountList: () => void;
  isEdit: boolean;
  editId: string;
  changeEditMode: (id: string) => void;
  resetEditMode: () => void;
}

const MonthlyTargetList = ({
  targetList,
  itemCountList,
  showAddTargetForm,
  resetItemCountList,
  isEdit,
  editId,
  changeEditMode,
  resetEditMode,
}: ListProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>목표 매출 설정</div>
          <div className={styles.contentWrapper}>
            <div className={styles.listHeader}>
              <div className={styles.month}>기간</div>
              <div className={styles.type}>종목</div>
              <div className={styles.new}>신규 목표</div>
              <div className={styles.reRegister}>재등록 목표</div>
              <div className={styles.totalSales}>목표 총 매출</div>
            </div>

            {targetList.length === 0 && itemCountList === 0 ? (
              <div className={styles.info}>등록된 데이터가 없습니다.</div>
            ) : (
              <>
                {isEdit ? (
                  <>
                    <MonthlyTargetFormContainer
                      editId={editId}
                      resetItemCountList={resetItemCountList}
                      resetEditMode={resetEditMode}
                    />
                  </>
                ) : (
                  <>
                    {targetList.map((item) => (
                      <MonthlyTargetItemContainer
                        key={item.id}
                        id={item.id}
                        month={item.month}
                        type={item.type}
                        newTarget={item.newTarget}
                        reRegisterTarget={item.reRegisterTarget}
                        totalSales={item.totalSales}
                        changeEditMode={changeEditMode}
                      />
                    ))}
                  </>
                )}
              </>
            )}

            {itemCountList >= 1 && (
              <MonthlyTargetFormContainer
                resetItemCountList={resetItemCountList}
                resetEditMode={resetEditMode}
              />
            )}
          </div>
          <div className={styles.buttonWrapper}>
            <button onClick={showAddTargetForm} disabled={isEdit}>
              이번 달 목표 매출 추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyTargetList;

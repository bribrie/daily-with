import { ChangeEventHandler, MouseEventHandler } from "react";
import { TargetListType } from "redux/sales/salesTypes";
import MonthlyTargetFormContainer from "containers/sales/monthlyTarget/MonthlyTargetFormContainer";
import MonthlyTargetItemContainer from "containers/sales/monthlyTarget/MonthlyTargetItemContainer";
import FilterBar from "components/common/ui/FilterBar";
import MonthlyTargetHeader from "./MonthlyTargetHeader";
import styles from "styles/sales/monthlyTarget/MonthlyTargetList.module.scss";

interface ListProps {
  targetList: TargetListType[];
  itemCount: number;
  showAddForm: MouseEventHandler;
  resetItemCount: () => void;
  filterData: string[];
  handleFilterBar: ChangeEventHandler;
}

const MonthlyTargetList = ({
  targetList,
  itemCount,
  showAddForm,
  resetItemCount,
  filterData,
  handleFilterBar,
}: ListProps) => {
  return (
    <>
      <FilterBar filterData={filterData} selectedData={handleFilterBar} />
      <div className={styles.contentWrapper}>
        <MonthlyTargetHeader />
        {targetList.length === 0 && itemCount <= 0 ? (
          <div className={styles.info}>등록된 데이터가 없습니다.</div>
        ) : (
          <>
            {targetList.map((item) => (
              <MonthlyTargetItemContainer key={item.id} targetItem={item} />
            ))}
          </>
        )}
        {itemCount >= 1 ? (
          <MonthlyTargetFormContainer resetItemCountList={resetItemCount} />
        ) : (
          <div className={styles.buttonWrapper}>
            <button onClick={showAddForm}>이번 달 목표 매출 추가</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MonthlyTargetList;

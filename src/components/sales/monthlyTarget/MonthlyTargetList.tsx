import { ChangeEventHandler, MouseEventHandler } from "react";
import { TargetListType } from "redux/sales/salesTypes";
import MonthlyTargetFormContainer from "containers/sales/monthlyTarget/MonthlyTargetFormContainer";
import MonthlyTargetItemContainer from "containers/sales/monthlyTarget/MonthlyTargetItemContainer";
import FilterBar from "components/common/ui/FilterBar";
import MonthlyTargetHeader from "./MonthlyTargetHeader";
import styles from "styles/sales/monthlyTarget/MonthlyTargetList.module.scss";

interface ListProps {
  targetList: TargetListType[];
  itemCountList: number;
  showAddTargetForm: MouseEventHandler;
  resetItemCountList: () => void;
  filterData: string[];
  handleFilterBar: ChangeEventHandler;
}

const MonthlyTargetList = ({
  targetList,
  itemCountList,
  showAddTargetForm,
  resetItemCountList,
  filterData,
  handleFilterBar,
}: ListProps) => {
  return (
    <>
      <FilterBar filterData={filterData} selectedData={handleFilterBar} />
      <MonthlyTargetHeader />
      <div className={styles.contentWrapper}>
        {targetList.length === 0 ? (
          <div className={styles.info}>등록된 데이터가 없습니다.</div>
        ) : (
          <>
            {targetList.map((item) => (
              <MonthlyTargetItemContainer key={item.id} targetItem={item} />
            ))}
          </>
        )}
        {itemCountList >= 1 ? (
          <MonthlyTargetFormContainer resetItemCountList={resetItemCountList} />
        ) : null}
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={showAddTargetForm}>이번 달 목표 매출 추가</button>
      </div>
    </>
  );
};

export default MonthlyTargetList;
